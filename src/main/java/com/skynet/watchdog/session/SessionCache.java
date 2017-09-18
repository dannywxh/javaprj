package com.skynet.watchdog.session;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class SessionCache implements Serializable
{

    private static final long serialVersionUID = 1L;

    private Map<String,Object>	session;

	private long				lastAccess;

	public SessionCache()
	{
		session = new HashMap<String,Object>();
		lastAccess = System.currentTimeMillis();
	}

	public SessionCache(Map<String,Object> session)
	{
		this.session = session;
		lastAccess = System.currentTimeMillis();
	}

	/**
	 * @return the session
	 */
	public Map<String,Object> getSession()
	{
		return session;
	}

	/**
	 * @param session
	 *            the session to set
	 */
	public void setSession(Map<String,Object> session)
	{
		this.session = session;
	}

	/**
	 * @return the lastAccess
	 */
	public long getLastAccess()
	{
		return lastAccess;
	}

	/**
	 * @param lastAccess
	 *            the lastAccess to set
	 */
	public void setLastAccess(long lastAccess)
	{
		this.lastAccess = lastAccess;
	}
}
