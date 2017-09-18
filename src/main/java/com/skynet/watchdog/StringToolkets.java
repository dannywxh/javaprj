/**
 * 
 */
package com.skynet.watchdog;


import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Reader;
import java.sql.Blob;
import java.sql.Clob;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialClob;
import javax.sql.rowset.serial.SerialException;

import org.cox.lang.Strings;
import org.cox.log.Log;
import org.cox.log.Logs;

/**
 * @author tanfaquan
 *
 */
public class StringToolkets {
	private static Log	logger	= Logs.get();
	
	/**json特殊字符处理
	 * @param s
	 * @return
	 */
	public static String string2Json(String s) {       
        StringBuffer sb = new StringBuffer ();       
        for (int i=0; i<s.length(); i++) {       
            char c = s.charAt(i);       
            switch (c) {       
                case '\"':       
                    sb.append("\\\"");       
                    break;       
                case '\\':       
                    sb.append("\\\\");       
                    break;       
                case '/':       
                    sb.append("\\/");       
                    break;       
                case '\b':       
                    sb.append("\\b");       
                    break;       
                case '\f':       
                    sb.append("\\f");       
                    break;       
                case '\n':       
                    sb.append("\\n");       
                    break;       
                case '\r':       
                    sb.append("\\r");       
                    break;       
                case '\t':       
                    sb.append("\\t");       
                    break;       
                default:       
                    sb.append(c);       
            }  
       }  
       return sb.toString();       
  }    

	 /**参数替换
		 * @param template
		 * @param data
		 * @return
		 */
		public static String replaceArgs(String template, Map<String, String> data){
		        // sb用来存储替换过的内容，它会把多次处理过的字符串按源字符串�? 存储起来�?
		        StringBuffer sb = new StringBuffer();
		        try{
		            Pattern pattern = Pattern.compile("\\$\\{(.+?)\\}");
		            Matcher matcher = pattern.matcher(template);
		            while(matcher.find()){
		                String name = matcher.group(1);// 键名
		                String value = data.get(name);// 键�??
		                if(value == null){
		                    value = "{"+name+"}";
		                }else{
		                    value = value.replaceAll("\\$", "\\\\\\$");
		                }
		                matcher.appendReplacement(sb, value);
		            }
		            matcher.appendTail(sb);
		        }catch(Exception e){
		            e.printStackTrace();
		        }
		        return sb.toString(); 
		}
		
		 /**
	     * 判断字符串是否为�?
	     * 
	     * @param str
	     * @return true:�? false:非空
	     */
	    public static boolean isEmpty(String str)
	    {

	        if (str == null || "".equals(str.trim()))
	        {
	            return true;
	        }
	        return false;
	    }

	    public static Clob getClobFormString(String clobData){
			Clob rtClob = null;
			if (clobData != null)
			{
				try {
					rtClob = new SerialClob(clobData.toCharArray());
				} catch (SerialException e) {
					// TODO 自动生成�? catch �?
					e.printStackTrace();
				} catch (SQLException e) {
					// TODO 自动生成�? catch �?
					e.printStackTrace();
				}
			}
			return rtClob;
		}
		
		/**将Clob转换为String
		 * @param clob
		 * @return
		 * @throws SQLException
		 * @throws IOException
		 */
		public static String getStringFromClob(Clob clob) 
		{
			String rtString = null;
			if (clob != null)
			{
				StringBuffer stringBuffer = new StringBuffer();
				Reader clobStream = null;
					try
					{
						try {
							clobStream = clob.getCharacterStream();
						} catch (SQLException e) {
							// TODO 自动生成�? catch �?
							e.printStackTrace();
						}
						char[] b = new char[1024];// 每次获取1024字节
						int i = 0;
						try {
							while ((i = clobStream.read(b)) != -1)
							{
								stringBuffer.append(b, 0, i);
							}
						} catch (IOException e) {
							// TODO 自动生成�? catch �?
							e.printStackTrace();
						}
						rtString = stringBuffer.toString();
					}
					finally
					{
						if (clobStream != null)
						{
							try {
								clobStream.close();
							} catch (IOException e) {
								// TODO 自动生成�? catch �?
								e.printStackTrace();
							}
						}
					}
				}
				
			return rtString;
		}
		
		/**
		 * 将File转换为Blob
		 * 
		 * @param file
		 *            File对象
		 * @return Blob对象
		 */
		public static Blob Blob(File file)
		{
			Blob rtBlob = null;
			if (file != null&&file.length()>0)
			{
				try
				{
					rtBlob = Blob(new FileInputStream(file));
				}
				catch (Exception e)
				{
					e.printStackTrace();
				}
			}
			return rtBlob;
		}
		
		/**
		 * 将InputStream转换为Blob
		 * 
		 * @param stream
		 *            InputStream对象
		 * @return Blob对象
		 */
		public static Blob Blob(InputStream stream)
		{
			Blob rtBlob = null;
			if (stream != null)
			{
				try
				{
					rtBlob = new SerialBlob(Bytes(stream));
				}
				catch (Exception e)
				{
					e.printStackTrace();
				}finally{
					//关闭文件�?
					try {
						stream.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
			return rtBlob;
		}
		
		/**
		 * 将InputStream转化成bytes数组
		 * 
		 * @param stream
		 *            InputStream对象
		 * @return byte数组
		 */
		public static byte[] Bytes(InputStream stream)
		{
			byte[] rtBytes = null;
			if (stream != null)
			{
				try
				{
					ByteArrayOutputStream bytestream = new ByteArrayOutputStream();
					int ch;
					while ((ch = stream.read()) != -1)
					{
						bytestream.write(ch);
					}
					rtBytes = bytestream.toByteArray();
					bytestream.close();
				}
				catch (Exception e)
				{
					e.printStackTrace();
				}

			}
			return rtBytes;
		}
		
		public static void stringToFile(String str,File file) throws IOException{
			ByteArrayInputStream ins = new ByteArrayInputStream(str.getBytes());
			OutputStream os = new FileOutputStream(file);
			int bytesRead = 0;
			byte[] buffer = new byte[8192];
			while ((bytesRead = ins.read(buffer, 0, 8192)) != -1) {
				os.write(buffer, 0, bytesRead);
			}
			os.close();
			ins.close();
		}
		
		
		/**增加或减少天�? 
		 * @param date
		 * @param num
		 * @return
		 */
		public static Date addDay(Date date, int num) {
		  Calendar startDT = Calendar.getInstance();
		  startDT.setTime(date);
		  startDT.add(Calendar.DAY_OF_MONTH, num);
		  return startDT.getTime();
		}
		
		public static HashMap<String, String> listToMap(List<String> list){
			HashMap<String, String> map = new HashMap<String, String>();
			for (String string : list) {
				map.put(string, string);
			}
			return map;
			
		}
		
		 /** 
		  * 使用字符串的matches方法 
	      * @param s 
	      * @return 
	      */  
	     public static int isNumber1(String s){  
	         String regex = "^[1-9][0-9]*\\.[0-9]+$|^[1-9][0-9]*$|^0+\\.[0-9]+$";  
	         char c = s.charAt(0);  
	         boolean bool;  
	         if(c=='+'|c=='-'){  
	             bool = s.substring(1).matches(regex);  
	         }else{  
	             bool = s.matches(regex);  
	         }  
	         if(bool){  
	             return 1;  
	         }else{  
	             return 0;  
	         }  
	     }  
	       
	     /** 
	      * 使用Pattern和Matcher类的方法 
	      * @param s 
	      * @return 
	      */  
	     public static int isNumber2(String s){  
	         String regex = "^[1-9][0-9]*\\.[0-9]+$|^[1-9][0-9]*$|^0+\\.[0-9]+$";  
	         Pattern pattern = Pattern.compile(regex);  
	         char c = s.charAt(0);  
	         if(c=='+'||c=='-'){  
	             s = s.substring(1);  
	         }  
	         Matcher matcher = pattern.matcher(s);  
	         boolean bool = matcher.matches();  
	         if(bool){  
	             return 1;  
	         }else{  
	             return 0;  
	         }  
	     }  
	     
	     /**相当于oracle nvl
	 	 * @param str
	 	 * @param v
	 	 * @return
	 	 */
	 	public static String nvl(String str,String v){
	 		if(null==str) return v;
	 		if(str.isEmpty()) return v;
	 		return str;
	 		
	 	}
	 	
	 	/**
		 * 返回文件的后�?名称
		 * @param filename
		 * @return
		 */
		public static String fetchHzm(String filename)
		{
			try
			{
				if(filename!=null&&!filename.isEmpty())
				{
					int pos=filename.lastIndexOf(".");
					if(pos>0)
					{
						return filename.substring(pos, filename.length());
					}
				}
				return "";
			}catch(Exception e)
			{
				e.printStackTrace();
			    return "";
			}
		}
		
		
       	/**车牌号格式验�?
       	 * @param hphm
       	 * @return
       	 */
       	public static boolean isCarHphm(String hphm){
       	   String vehicleNoStyle = "^(云|贵|�?|豫|湘|黑|辽|皖|鲁|新|赣|浙|苏|鄂|桂|甘|陕|蒙|晋|吉|闽|青|川|粤|宁|渝|沪|津|京|藏|琼|成|空|警|陆|)[A-Z]{1}[A-Z0-9]{4}([A-Z0-9]{1}|学|�?)$";
       	   Pattern pattern = Pattern.compile(vehicleNoStyle);
       	   Matcher matcher = pattern.matcher(hphm);
       	   return matcher.matches();
       	}
       	
       	
		/**
		 * @param str
		 * @return
		 */
		public static Date stringToDate(String str)
		{			
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			Date date = null;
			try {
				date = (Date) dateFormat.parse(str.replace("T", " "));
			} catch (ParseException e) {
				logger.error(e);
			}
			return date;
		}
		
		/**
		 * @param date
		 * @return
		 */
		public static String dateToString(Date date) {
			String result = "";
			if (date != null) {
					SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
					result = dateFormat.format(date);
					String[] arr = result.split(" ");
					result=arr[0]+"T"+arr[1];
			}		
			return result;
		}
		
		/**
		 * 处理长度
		 * @param value
		 * @return
		 */
		public static String getLengthString(String value,int maxLength,String strReplace)
		{
			if(value==null)
			{
				return "&nbsp";
			}
			try
			{
				if(Strings.charLength(value)<maxLength)
				{
					return  value;
				}else
				{
				  return value.substring(0,maxLength-1)+strReplace;
				}
			}catch(Exception e)
			{
				return value;
			}
		}
		
		public static void main(String[] args) {
			System.err.println(dateToString(new Date()));
			System.err.println(stringToDate("2016-01-01T08:08"));
			System.err.println(new Date().after(stringToDate("2016-01-01T08:08")));
			
			System.err.println("国家".length());
		}
       	
      }
