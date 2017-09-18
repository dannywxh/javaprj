package com.skynet.watchdog.log.pojo;

import java.lang.reflect.Field;

import org.cox.dao.Cnd;
import org.cox.dao.impl.NutDao;
import org.cox.lang.Lang;
import org.cox.lang.Strings;

import com.skynet.watchdog.log.Behavior;
import com.skynet.watchdog.utils.HanYuPinYin;
import com.skynet.watchdog.utils.Util;

@Behavior
public class WatchCode {

	/********************************* 异常 *************************************/
    /**
     * 异常
     */
    @Behavior(name = "异常")
    public final static String WATCH_CODE_EXP = "002";
    /**
     * 空指针异常
     */
    @Behavior(name = "空指针异常")
    public final static String WATCH_CODE_EXP_NULL = "002001";
    /**
     * 未找到CLASS异常
     */
    @Behavior(name = "未找到CLASS异常")
    public final static String WATCH_CODE_EXP_NOTFOUND = "002002";
    /**
     * 未找到方法异常
     */
    @Behavior(name = "未找到方法异常")
    public final static String WATCH_CODE_EXP_NOTMETHOD = "002003";
    /**
     * 运行异常
     */
    @Behavior(name = "运行异常")
    public final static String WATCH_CODE_EXP_RUN = "002004";
    /**
     * SQL异常
     */
    @Behavior(name = "SQL异常")
    public final static String WATCH_CODE_EXP_SQL = "002005";
    /**
     * IO异常
     */
    @Behavior(name = "IO异常")
    public final static String WATCH_CODE_EXP_IO = "002006";
    /**
     * 方法参数异常
     */
    @Behavior(name = "方法参数异常")
    public final static String WATCH_CODE_EXP_ARGUS = "002007";
    /**
     * 访问权限异常
     */
    @Behavior(name = "访问权限异常")
    public final static String WATCH_CODE_EXP_ACCESS = "002008";
    /**
     * 强制转换异常
     */
    @Behavior(name = "强制转换异常")
    public final static String WATCH_CODE_EXP_CAST = "002009";
    /**
     * 数字转换异常
     */
    @Behavior(name = "数字转换异常")
    public final static String WATCH_CODE_EXP_NUMFORMAT = "002010";
    /**
     * 数组越界异常
     */
    @Behavior(name = "数组越界异常")
    public final static String WATCH_CODE_EXP_OUT = "002011";
    /**
     * 数学运算异常
     */
    @Behavior(name = "数学运算异常")
    public final static String WATCH_CODE_EXP_MATH = "002012";
    /**
     * 堆栈溢出错误
     */
    @Behavior(name = "堆栈溢出错误")
    public final static String WATCH_CODE_EXP_STACK = "002013";
    /**
     * 内存溢出错误
     */
    @Behavior(name = "内存溢出错误")
    public final static String WATCH_CODE_EXP_MEMORY = "002014";
    /**
     * 未知错误
     */
    @Behavior(name = "未知错误")
    public final static String WATCH_CODE_EXP_UNKOWN = "002015";
    /**
     * 其余异常
     */
    @Behavior(name = "其余异常")
    public final static String WATCH_CODE_EXP_OTHER = "002016";

	public static String getExceptionCode(Throwable e) {
		String errorLx = e.getClass().getName().toLowerCase();
		String code = WATCH_CODE_EXP_OTHER;
		// 空指针异常
		if (errorLx.indexOf("nullpointer") > -1) {
			code = WATCH_CODE_EXP_NULL;
		}
		// 无法找到类异常
		if (errorLx.indexOf("classnotfound") > -1) {
			code = WATCH_CODE_EXP_NOTFOUND;
		}
		// 无法找到方法异常
		if (errorLx.indexOf("nosuchmethod") > -1) {
			code = WATCH_CODE_EXP_NOTMETHOD;
		}
		// 运行异常
		if (errorLx.indexOf("runtimeexception") > -1) {
			code = WATCH_CODE_EXP_RUN;
		}
		// sql异常
		if (errorLx.indexOf("sqlexception") > -1) {
			code = WATCH_CODE_EXP_SQL;
		}
		// IO异常
		if (errorLx.indexOf("ioexception") > -1) {
			code = WATCH_CODE_EXP_IO;
		}
		// 方法参数异常
		if (errorLx.indexOf("illegalargument") > -1) {
			code = WATCH_CODE_EXP_ARGUS;
		}
		// 访问权限异常
		if (errorLx.indexOf("illegalaccess") > -1) {
			code = WATCH_CODE_EXP_ACCESS;
		}
		// 强制转换异常
		if (errorLx.indexOf("calsscast") > -1) {
			code = WATCH_CODE_EXP_CAST;
		}
		// 数字转换异常
		if (errorLx.indexOf("numberformat") > -1) {
			code = WATCH_CODE_EXP_NUMFORMAT;
		}
		// 数组越界异常
		if (errorLx.indexOf("outofbounds") > -1) {
			code = WATCH_CODE_EXP_OUT;
		}
		// 数学运算异常
		if (errorLx.indexOf("arithmetice") > -1) {
			code = WATCH_CODE_EXP_MATH;
		}
		// 堆栈溢出
		if (errorLx.indexOf("stackoverflowerror") > -1) {
			code = WATCH_CODE_EXP_STACK;
		}
		// 内存溢出
		if (errorLx.indexOf("outofmemoryerror") > -1) {
			code = WATCH_CODE_EXP_MEMORY;
		}
		// 未知错误
		if (errorLx.indexOf("unkownerror") > -1) {
			code = WATCH_CODE_EXP_UNKOWN;
		}
		return code;
	}
	
	public static String getExceptionCodeDesc(Throwable e) {
		String errorLx = e.getClass().getName().toLowerCase();
		String codeDec = "其余异常";
		// 空指针异常
		if (errorLx.indexOf("nullpointer") > -1) {
			codeDec = "空指针异常";
		}
		// 无法找到类异常
		if (errorLx.indexOf("classnotfound") > -1) {
			codeDec = "无法找到类异常";
		}
		// 无法找到方法异常
		if (errorLx.indexOf("nosuchmethod") > -1) {
			codeDec = "无法找到方法异常";
		}
		// 运行异常
		if (errorLx.indexOf("runtimeexception") > -1) {
			codeDec = "运行异常";
		}
		// sql异常
		if (errorLx.indexOf("sqlexception") > -1) {
			codeDec = "sql异常";
		}
		// IO异常
		if (errorLx.indexOf("ioexception") > -1) {
			codeDec = "IO异常";
		}
		// 方法参数异常
		if (errorLx.indexOf("illegalargument") > -1) {
			codeDec = "方法参数异常";
		}
		// 访问权限异常
		if (errorLx.indexOf("illegalaccess") > -1) {
			codeDec = "访问权限异常";
		}
		// 强制转换异常
		if (errorLx.indexOf("calsscast") > -1) {
			codeDec = "强制转换异常";
		}
		// 数字转换异常
		if (errorLx.indexOf("numberformat") > -1) {
			codeDec = "数字转换异常";
		}
		// 数组越界异常
		if (errorLx.indexOf("outofbounds") > -1) {
			codeDec = "数组越界异常";
		}
		// 数学运算异常
		if (errorLx.indexOf("arithmetice") > -1) {
			codeDec = "数学运算异常";
		}
		// 堆栈溢出
		if (errorLx.indexOf("stackoverflowerror") > -1) {
			codeDec = "堆栈溢出";
		}
		// 内存溢出
		if (errorLx.indexOf("outofmemoryerror") > -1) {
			codeDec = "内存溢出";
		}
		// 未知错误
		if (errorLx.indexOf("unkownerror") > -1) {
			codeDec = "未知错误";
		}
		return codeDec;
	}
	
    public static void scanCode() {

    	NutDao dao = Util.getNuzDao();
    	
        if (!Lang.isEmpty(WatchCode.class) && WatchCode.class.isAnnotationPresent(Behavior.class))
        {

            Field[] fields = WatchCode.class.getFields();
            int i = 0, max = fields.length;
            for (; i < max; i++) 
            {
                Field field = fields[i];
                if (!Lang.isEmpty(field) && field.isAnnotationPresent(Behavior.class))
                {
                    Behavior note = field.getAnnotation(Behavior.class);
                    try
                    {
                        String code = (String) field.get(null);
                        String name = note.name();
                        if (!Strings.isBlank(code) && !Strings.isBlank(name))
                        {

                        	// 判断code是否存在
                        	CodeBean r = dao.fetch(CodeBean.class, Cnd.wrap("LX = 'WATCH_CODE_EXP' AND YXX = '1' AND DM = '" + code + "'"));
                        	
                        	if (null == r) {
                        		CodeBean codebean = new CodeBean();
                        		codebean.setDm(code);
                        		codebean.setMc(name);
                        		codebean.setJc(name);
                        		String pym = HanYuPinYin.getPinYinHeadChar(name.trim()).toUpperCase();
                        		codebean.setPym(pym);
                        		codebean.setLx("WATCH_CODE_EXP");
                        		codebean.setFdm(code.substring(0, code.length() - 3));
                        		codebean.setLy("系统扫描");
                        		dao.insert(codebean);
                        	} else {
                        		r.setMc(name);
                        		r.setJc(name);
                        		String pym = HanYuPinYin.getPinYinHeadChar(name.trim()).toUpperCase();
                        		r.setPym(pym);
                        		dao.update(r);
                        	}
                        }
                    }
                    catch (Exception e)
                    {
                        continue;
                    }
                }
            }
        }
    }
}
