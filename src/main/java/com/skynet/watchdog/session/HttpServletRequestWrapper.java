package com.skynet.watchdog.session;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class HttpServletRequestWrapper extends javax.servlet.http.HttpServletRequestWrapper
{

	String	sid	= "";

	public HttpServletRequestWrapper(String sid, HttpServletRequest arg0)
	{
		super(arg0);
		this.sid = sid;
	}

	@Override
	public HttpSession getSession(boolean create)
	{
		return new HttpSessionSidWrapper(sid, super.getSession(create));
	}

	@Override
	public HttpSession getSession()
	{
		return new HttpSessionSidWrapper(sid, super.getSession());
	}

}
