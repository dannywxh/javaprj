package com.skynet.watchdog.log.pojo;

import java.util.HashMap;
import java.util.Map;

import org.cox.json.Json;
import org.cox.json.JsonFormat;
import org.cox.lang.Strings;
import org.cox.lang.hardware.Networks;
import org.cox.mvc.ActionContext;
import org.cox.mvc.Mvcs;

import com.skynet.watchdog.sys.bean.BeanLoginUser;
import com.skynet.watchdog.utils.SkynetUtils;

public class BaseSelfException extends Throwable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 419141544741305738L;

	public BeanExceptionLog log;

	public BaseSelfException() {
		
		super();

	}

	public BeanExceptionLog getLog() {
		return log;
	}

	public void setLog(BeanExceptionLog log) {
		
		// 记录日志的IP
		log.setLogger(Networks.ipv4());

		ActionContext ac = Mvcs.getActionContext();

		// 操作的URL
		String url = ac.getRequest().getRequestURL().toString();

		// 操作的URL参数
		String param = "";
		if (Strings.isEmpty(ac.getRequest().getQueryString())) {
			param = Json.toJson(ac.getRequest().getParameterMap());
		} else {
			Map<String, String> map = new HashMap<String, String>();
			String[] strParams = param.split("&");
			for (String str : strParams) {
				map.put(str.substring(0, str.indexOf("=")),
						str.substring(str.indexOf("=") + 1));
			}
			param = Json.toJson(ac.getRequest().getParameterMap());
		}

		// 发生异常的路径
		String path = ac.getRequest().getServletPath();
		// 发生异常方法的参数
		String arg = Json.toJson(ac.getMethodArgs(), JsonFormat.normal());

		// 设置异常日志信息
		log.setUrl(url);
		log.setParam(param);
		log.setPath(path);
		log.setArg(arg);

		// 获取登录用户信息
		BeanLoginUser user = SkynetUtils.getLoginUser();
		if (null == user) {
			user = SkynetUtils.getLoginUser(ac.getRequest().getSession());
		}

		if (null != user) {
			log.setUserid(user.getId());
			log.setUserip(user.getLoginip());
		}

		this.log = log;
	}
}
