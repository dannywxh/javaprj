package com.skynet.watchdog.login;

import java.io.Serializable;


public class BeanLoginStatus implements Serializable
{
    
    private static final long serialVersionUID = 1L;

    private String userid;
    
    private String loginIp;
    
    private String sessionId;
    
    private String cacheId;
    
    private long dlsjs;
    
    private int status;

    public BeanLoginStatus()
    {
    }
    
    public BeanLoginStatus(String userid, String loginIp, String sessionId, String cacheId, long dlsjs, int status)
    {
        this.userid = userid;
        this.loginIp = loginIp;
        this.sessionId = sessionId;
        this.dlsjs = dlsjs;
        this.status = status;
        this.cacheId = cacheId;
    }

    public String getUserid()
    {
        return userid;
    }

    public void setUserid(String userid)
    {
        this.userid = userid;
    }

    public String getLoginIp()
    {
        return loginIp;
    }

    public void setLoginIp(String loginIp)
    {
        this.loginIp = loginIp;
    }

    public String getSessionId()
    {
        return sessionId;
    }

    public void setSessionId(String sessionId)
    {
        this.sessionId = sessionId;
    }

    public long getDlsjs()
    {
        return dlsjs;
    }

    public void setDlsjs(long dlsjs)
    {
        this.dlsjs = dlsjs;
    }

    public int getStatus()
    {
        return status;
    }

    public void setStatus(int status)
    {
        this.status = status;
    }

    public String getCacheId()
    {
        return cacheId;
    }

    public void setCacheId(String cacheId)
    {
        this.cacheId = cacheId;
    }
}
