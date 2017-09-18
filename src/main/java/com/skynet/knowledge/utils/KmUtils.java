package com.skynet.knowledge.utils;

import javax.servlet.http.HttpSession;

import org.cox.mvc.Mvcs;

import com.skynet.knowledge.bean.User;

public class KmUtils {
	public static User getLoginUser() {

	    HttpSession session = Mvcs.getHttpSession();
	    User user = (User) session.getAttribute("user");
	    
	    //Object user = session.getAttribute("user");

		return user;
	}
}
