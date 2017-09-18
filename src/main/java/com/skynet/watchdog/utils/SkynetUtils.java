package com.skynet.watchdog.utils;

import javax.servlet.http.HttpSession;

import org.cox.dao.entity.Record;
import org.cox.mvc.Mvcs;

import com.skynet.watchdog.sys.bean.BeanLoginUser;

public class SkynetUtils {

	public static BeanLoginUser getLoginUser() {

	    HttpSession session = Mvcs.getHttpSession();
	    Record us = (Record) session.getAttribute("user");
	    BeanLoginUser user = null;
	    if (null != us) {
	    	user = us.toPojo(BeanLoginUser.class);
	    }

		return user;
	}
	
	public static BeanLoginUser getLoginUser(HttpSession session) {

	    Record us = (Record) session.getAttribute("user");
	    BeanLoginUser user = null;
	    if (null != us) {
	    	user = us.toPojo(BeanLoginUser.class);
	    }

		return user;
	}

}
