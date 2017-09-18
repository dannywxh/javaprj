package com.skynet.watchdog.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.MessageDigest;

import javax.servlet.http.HttpServletRequest;

import org.cox.dao.Dao;
import org.cox.dao.impl.NutDao;
import org.cox.ioc.impl.NutIoc;
import org.cox.ioc.loader.combo.ComboIocLoader;
import org.cox.lang.Strings;
import org.cox.log.Log;
import org.cox.log.Logs;
import org.cox.mvc.Mvcs;

public class Util
{
	private static Log	logger	= Logs.get();
    private static NutIoc ioc;

    private volatile static Util util;

    /**
     * 获得一个ConfigManager的实例
     */
    public static Util getInstance()
    {
        if (util == null)
        {
            synchronized (Util.class)
            {
                if (util == null)
                {
                    util = new Util();
                }
            }
        }

        return util;
    }

    /**
     * 查找配置文件
     * 
     * @param rootClass
     * 搜索跟路径中的起始类
     * @param propFile
     * 要寻找的属性文件名
     */
    public static InputStream Search(Class<?> rootClass, String propFile)
    {
        try
        {
            // 得到类的类装载器
            ClassLoader loader = rootClass.getClassLoader();

            InputStream is = null;
            // 先从当前类所处路径的根目录中寻找属性文件
            is = loader.getResourceAsStream(propFile);
            if (is != null)
            {
                return is;
            }

            // 没有找到，就从该类所处的包目录中查找属性文件
            Package pack = rootClass.getPackage();
            if (pack != null)
            {
                String packName = pack.getName();
                String path = "";
                if (packName.indexOf(".") < 0)
                {
                    path = packName + "/";
                }
                else
                {
                    int start = 0, end = 0;
                    end = packName.indexOf(".");
                    while (end != -1)
                    {
                        path = path + packName.substring(start, end) + "/";
                        start = end + 1;
                        end = packName.indexOf(".", start);
                    }
                    path = path + packName.substring(start) + "/";
                }
                is = loader.getResourceAsStream(path + propFile);
                if (is != null)
                {
                    return is;
                }
            }

            // 如果没有找到，再从当前系统的用户目录中进行查找
            File file = new File(System.getProperty("user.dir"), propFile);
            if (file.exists())
            {
                return new FileInputStream(file);
            }

            // 如果还是没有找到，则从系统所有的类路径中查找
            String[] cps = System.getProperty("java.class.path").split(System.getProperty("path.separator"));
            for (int i = 0; i < cps.length; i++)
            {
                file = new File(cps[i], propFile);
                if (file.exists())
                {
                    break;
                }
                file = null;
            }
            if (file != null)
            {
                return new FileInputStream(file);
            }
        }
        catch (Exception e)
        {
            // logger.error("读取配置文件出现异常", e);
        }
        return null;
    }

    private static char[] base64EncodeChars = new char[] { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
            'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1',
            '2', '3', '4', '5', '6', '7', '8', '9', '.', '_' };

    private static byte[] base64DecodeChars = new byte[] { -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, 62, -1, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4,
            5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, 63, -1, 26,
            27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51 };

    /**
     * 数据编码
     */
    public static String encode(byte[] data)
    {
        StringBuffer sb = new StringBuffer();
        int len = data.length;
        int i = 0;
        int b1, b2, b3;
        while (i < len)
        {
            b1 = data[i++] & 0xff;
            if (i == len)
            {
                sb.append(base64EncodeChars[b1 >>> 2]);
                sb.append(base64EncodeChars[(b1 & 0x3) << 4]);
                sb.append("==");
                break;
            }
            b2 = data[i++] & 0xff;
            if (i == len)
            {
                sb.append(base64EncodeChars[b1 >>> 2]);
                sb.append(base64EncodeChars[((b1 & 0x03) << 4) | ((b2 & 0xf0) >>> 4)]);
                sb.append(base64EncodeChars[(b2 & 0x0f) << 2]);
                sb.append("=");
                break;
            }
            b3 = data[i++] & 0xff;
            sb.append(base64EncodeChars[b1 >>> 2]);
            sb.append(base64EncodeChars[((b1 & 0x03) << 4) | ((b2 & 0xf0) >>> 4)]);
            sb.append(base64EncodeChars[((b2 & 0x0f) << 2) | ((b3 & 0xc0) >>> 6)]);
            sb.append(base64EncodeChars[b3 & 0x3f]);
        }
        return sb.toString();
    }

    /**
     * 数据解码
     */
    public static byte[] decode(String string) throws UnsupportedEncodingException
    {
        StringBuffer sb = new StringBuffer();
        byte[] data = string.getBytes("US-ASCII");
        int len = data.length;
        int i = 0;
        int b1, b2, b3, b4;
        while (i < len)
        {
            do
            {
                b1 = base64DecodeChars[data[i++]];
            }
            while (i < len && b1 == -1);
            if (b1 == -1)
            {
                break;
            }
            do
            {
                b2 = base64DecodeChars[data[i++]];
            }
            while (i < len && b2 == -1);
            if (b2 == -1)
            {
                break;
            }
            sb.append((char) ((b1 << 2) | ((b2 & 0x30) >>> 4)));
            do
            {
                b3 = data[i++];
                if (b3 == 61)
                {
                    return sb.toString().getBytes("iso8859-1");
                }
                b3 = base64DecodeChars[b3];
            }
            while (i < len && b3 == -1);
            if (b3 == -1)
            {
                break;
            }
            sb.append((char) (((b2 & 0x0f) << 4) | ((b3 & 0x3c) >>> 2)));
            do
            {
                b4 = data[i++];
                if (b4 == 61)
                {
                    return sb.toString().getBytes("iso8859-1");
                }
                b4 = base64DecodeChars[b4];
            }
            while (i < len && b4 == -1);
            if (b4 == -1)
            {
                break;
            }
            sb.append((char) (((b3 & 0x03) << 6) | b4));
        }
        return sb.toString().getBytes("iso8859-1");
    }

    /**
     * MD5识别码
     */
    public static String MD5Encrypt(String string)
    {
        String rtString = "";
        try
        {
            byte[] input = string.getBytes();
            MessageDigest alg = java.security.MessageDigest.getInstance("MD5");
            alg.update(input);
            byte[] digest = alg.digest();
            rtString = byte2hex(digest);
        }
        catch (Exception e)
        {
            //
        }
        return rtString;
    }

    /**
     * SHA识别码
     */
    public static String SHAEncrypt(String string)
    {
        String rtString = "";

        try
        {
            byte[] input = string.getBytes();
            MessageDigest alg = java.security.MessageDigest.getInstance("SHA");
            alg.update(input);
            byte[] digest = alg.digest();
            rtString = byte2hex(digest);
        }
        catch (Exception e)
        {
            //
        }
        return rtString;
    }

    // 识别码转字符串方法
    private static String byte2hex(byte[] b)
    {
        String hs = "";
        String stmp = "";
        for (int n = 0; n < b.length; n++)
        {
            stmp = (java.lang.Integer.toHexString(b[n] & 0XFF));
            if (stmp.length() == 1)
            {
                hs = hs + "0" + stmp;
            }
            else
            {
                hs = hs + stmp;
            }
        }
        return hs.toUpperCase();
    }

    // 获得数据库链接
    public static NutDao getNuzDao()
    {
        NutDao dao =null;
        if (ioc == null)
        {
            ioc = (NutIoc) Mvcs.getIoc();
            if (ioc == null)
            {
                try
                {
                    ComboIocLoader loader = new ComboIocLoader("*org.cox.ioc.loader.json.JsonLoader",
                            "config/ioc/dao.conf.js");
                    ioc = new NutIoc(loader);
                }
                catch (ClassNotFoundException e)
                {
                    e.printStackTrace();
                    return null;
                }
            }

        }
        if (ioc != null)
        {
            if (dao == null)
            {
                dao = (NutDao) ioc.get(Dao.class, "dao");
            }
            return dao;
        }
        return null;
    }

    public static boolean isWindowsOs()
    {
        boolean isWindowsOs = false;
        String osName = System.getProperty("os.name");
        if (osName.toLowerCase().indexOf("windows") > -1)
        {
            isWindowsOs = true;
        }
        return isWindowsOs;
    }

    /**
     * 获得服务IP
     * 集群环境下 通过 request.getHeader("Host") 获得数据
     * 否则则取本地IP
     */
    public static String getServerIp(HttpServletRequest request)
    {
        String ip = request.getHeader("Host").split(":")[0];
        if (Strings.isBlank(ip))
        {
            ip = request.getLocalAddr();
        }
        return ip;
    }

    /**
     * 获得服务端口
     * 集群环境下 通过 request.getHeader("Host-Port") 获得数据
     * 否则则取本地访问端口
     */
    public static int getServerPort(HttpServletRequest request)
    {
        int port = 0;
        String serverPort = request.getHeader("Host-Port");
        if (Strings.isBlank(serverPort))
        {
            port = request.getLocalPort();
        }
        else
        {
            port = Integer.valueOf(serverPort);
        }
        return port;
    }

    /**
     * 获得访问ip
     */
    public static String getRemoteAddr(HttpServletRequest request)
    {
        String ip = request.getHeader("X-Real-IP");
        if (Strings.isBlank(ip)||"0:0:0:0:0:0:0:1".equals(ip))
        {
            ip = request.getRemoteAddr();
        }
        if ("127.0.0.1".equals(ip) || "0:0:0:0:0:0:0:1".equals(ip)){
        	try {
            	ip = InetAddress.getLocalHost().getHostAddress();
        }
            catch (UnknownHostException unknownhostexception) {
            	logger.info(unknownhostexception);
            	
        }
        }
        
        return ip;
    }
    
    /**
     * 字符串是否是数字
     * @param a
     * @return
     */
    public static boolean isNumber(String a) {
        return a.matches("^(\\d)+$");
    }
    
    /**
     * 获取最大值
     * @param a
     * @return
     */
    public static int getMax(int[] a) {
        int max = 0;
        if (a==null) {
            return 0;
        }
        if (a.length==1) {
            max=a[0];
        }else {
            max=a[0]>a[1]?a[0]:a[1];
            for (int i = 2; i < a.length; i++) {
                max=max>a[i]?max:a[i];  
            }
        }       
        return max;
    }
}
