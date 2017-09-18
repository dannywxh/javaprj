package com.skynet.watchdog.log;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.cox.aop.InterceptorChain;
import org.cox.dao.Condition;
import org.cox.dao.Dao;
import org.cox.ioc.annotation.InjectName;
import org.cox.ioc.loader.annotation.Inject;
import org.cox.ioc.loader.annotation.IocBean;
import org.cox.json.Json;
import org.cox.json.JsonFormat;
import org.cox.lang.Files;
import org.cox.lang.Lang;
import org.cox.lang.Strings;
import org.cox.lang.hardware.Networks;
import org.cox.mvc.ActionContext;
import org.cox.mvc.Mvcs;

import com.skynet.watchdog.log.pojo.BeanExceptionLog;
import com.skynet.watchdog.log.pojo.WatchCode;
import com.skynet.watchdog.sys.bean.BeanLoginUser;
import com.skynet.watchdog.utils.SkynetUtils;

@InjectName
@IocBean(name = "logException")
public class LogExceptionLocal implements LogException {
	@Inject
	private Dao dao;

	@Override
	public boolean saveLog(Throwable e) {

		return saveLogBean(e);
	}

	@Override
	public boolean saveLog(Throwable e, InterceptorChain chain) {
		// TODO 自动生成的方法存根
		return false;
	}

	@Override
	public boolean saveLog(Class<? extends Throwable> e) {
		
		return false;
	}

	@Override
	public boolean saveLog(Class<? extends Throwable> e, InterceptorChain chain) {
		// TODO 自动生成的方法存根
		return false;
	}

	@Override
	public boolean saveLog(BeanExceptionLog log) {
		if (Objects.isNull(log) || Strings.isEmpty(log.getCode())) {
			return false;
		}
		log.setLogger(Networks.ipv4()); // 记录日志的IP
		try {
			dao.insert(log);
		} catch (Exception e) {
			return saveLogFile(log);
		}
		return true;
	}

	@Override
	public <E extends BeanExceptionLog> List<E> getLog(Class<E> type,
			BeanExceptionLog log, Date star, Date end) {
		// TODO 自动生成的方法存根
		return null;
	}

	@Override
	public <E extends BeanExceptionLog> List<E> getLog(Class<E> type,
			Condition cnd) {
		// TODO 自动生成的方法存根
		return null;
	}

	@Override
	public boolean importFileLog(File file) {
		// TODO 自动生成的方法存根
		return false;
	}

	@Override
	public boolean exportFileLog(BeanExceptionLog log, Date star, Date end) {
		// TODO 自动生成的方法存根
		return false;
	}

	@Override
	public boolean exportFileLog(Condition cnd) {
		// TODO 自动生成的方法存根
		return false;
	}
	
	private boolean saveLogBean(Throwable e) {
		e.printStackTrace();
		if (Objects.isNull(e)) {
			return false;
		}

		BeanExceptionLog log = new BeanExceptionLog();

		// 记录日志的IP
		log.setLogger(Networks.ipv4());

		ActionContext ac = Mvcs.getActionContext();
		// 操作的URL
		String url = ac.getRequest().getRequestURL().toString();

		// 操作的URL参数
		String param = "";
		if (Strings.isEmpty(ac.getRequest().getQueryString())) {
			if (!Lang.isEmpty(ac.getRequest().getParameterMap())) {
				param = Json.toJson(ac.getRequest().getParameterMap(), JsonFormat.normal());
			} else {
				param = "";
			}
		} else {
			Map<String, String> map = new HashMap<String, String>();
			String[] strParams = param.split("&");
			for (String str : strParams) {
				if(!Strings.isEmpty(str)){
					map.put(str.substring(0, str.indexOf("=")),str.substring(str.indexOf("=") + 1));
				}			
			}
			if (!Lang.isEmpty(map)) {
				param = Json.toJson(map, JsonFormat.normal());
			} else {
				param = "";
			}
			
		}

		// 发生异常的路径
		String path = ac.getRequest().getServletPath();
		// 发生异常方法的参数
		String arg = Json.toJson(ac.getMethodArgs(), JsonFormat.normal());
		boolean flag = true;
		for (Object obj : ac.getMethodArgs()) {
			if (!Lang.isEmpty(obj)) {
				flag = false;
			}
		}
		if (flag) {
			arg = "";
		}

		// 获取异常信息
		StackTraceElement[] exps = e.getStackTrace();
		int depth = exps.length;
		String info = "";

		info = e.getClass().getName() + ":" + e.getMessage();
		for (int i = 0; i < depth; i++) {
			if (Lang.isEmpty(exps[i]))
				continue;
			StackTraceElement exp = exps[i];

			if (exp.getClassName().matches("^com.skynet.+|org.cox.+")) {
				info += "\r\n" + "\tat " + exp.toString();
			}
		}
		// 异常代码
		String code = WatchCode.getExceptionCode(e);
		// 备注
		String mark = WatchCode.getExceptionCodeDesc(e);

		// 设置异常日志信息
		log.setUrl(url);
		log.setParam(param);
		log.setPath(path);
		log.setArg(arg);
		log.setInfo(info);
		log.setCode(code);
		log.setMark(mark);

		// 获取登录用户信息
		BeanLoginUser user = SkynetUtils.getLoginUser();
		if (null == user) {
			user = SkynetUtils.getLoginUser(ac.getRequest().getSession());
		}

		if (null != user) {
			log.setUserid(user.getId());
			log.setUserip(user.getLoginip());
		}

		// 保存日志信息
		try {

			dao.insert(log);
			saveLogFile(log);

		} catch (Exception e2) {
			return saveLogFile(log);
		}

		return true;
	}
	
	private boolean saveLogFile(BeanExceptionLog log) {

		ActionContext ac = Mvcs.getActionContext();

		// 保存文件至
		try {

			File logFile = Files
					.createDirIfNoExists(ac.getServletContext().getRealPath("")
							+ File.separator + "logs" + File.separator);
			// 获取最新的文件，
			File docRecent = null;
			if (logFile.isDirectory()) {

				for (File filesub : logFile.listFiles()) {

					if (null == docRecent) {
						docRecent = filesub;
					} else if (docRecent.lastModified()
							- filesub.lastModified() < 0) {
						docRecent = filesub;
					}
				}
			}

			// 如果有文件，并且最新文件超过100M重新生成文件;如果没有文件生成文件
			if (null == docRecent) {
				docRecent = Files.createFileIfNoExists(ac.getServletContext()
						.getRealPath("")
						+ File.separator
						+ "logs"
						+ File.separator
						+ "log_"
						+ new SimpleDateFormat("yyyyMMddHHmmssSSS")
								.format(new Date()) + ".log");
			} else {
				if (docRecent.exists() && docRecent.isFile()) {
					if (docRecent.length() / 1024 > 100 * 1024 * 1024) {
						docRecent = Files.createFileIfNoExists(ac
								.getServletContext().getRealPath("")
								+ File.separator
								+ "logs"
								+ File.separator
								+ "log_"
								+ new SimpleDateFormat("yyyyMMddHHmmssSSS")
										.format(new Date()) + ".log");
					}
				}
			}

			// 编辑日志内容写入文件内容
			StringBuffer sbcontent = new StringBuffer();
			sbcontent.append("[异常日志信息]- "
					+ new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
					.format(new Date()) + "\r\n");
			sbcontent.append("{\r\n");
			sbcontent.append("\tcode:" + log.getCode() + ",\r\n");
			sbcontent.append("\tmark:" + log.getMark() + ",\r\n");
			sbcontent.append("\tpath:" + log.getPath() + ",\r\n");
			sbcontent.append("\targ:" + log.getArg() + ",\r\n");
			sbcontent.append("\turl:" + log.getUrl() + ",\r\n");
			sbcontent.append("\tparam:" + log.getParam() + ",\r\n");
			sbcontent.append("\tinfo:" + log.getInfo() + ",\r\n");
			sbcontent.append("\tid:null,\r\n");
			sbcontent.append("\tlogger:" + log.getLogger() + ",\r\n");
			sbcontent.append("\tczsj:"
					+ new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
					.format(new Date()) + ",\r\n");
			sbcontent.append("\tuserid:" + log.getUserid()
					+ ",\r\n");
			sbcontent.append("\tuserip:" + log.getUserip()
					+ ",\r\n");
			sbcontent.append("\ttz1:" + log.getTz1()
					+ ",\r\n");
			sbcontent.append("}\r\n");

			Files.appendWrite(docRecent, sbcontent.toString(), "UTF-8");

		} catch (IOException e1) {
			// TODO 自动生成的 catch 块
			return false;
		}
		
		return true;
	}
}
