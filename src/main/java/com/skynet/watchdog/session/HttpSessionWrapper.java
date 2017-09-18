package com.skynet.watchdog.session;

import java.util.Enumeration;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionContext;

@SuppressWarnings({ "unchecked", "deprecation", "rawtypes" })
public class HttpSessionWrapper implements HttpSession
{

    private HttpSession session;

    public HttpSessionWrapper(HttpSession session)
    {
        this.session = session;
    }

    @Override
    public Object getAttribute(String arg0)
    {
        return session.getAttribute(arg0);
    }

    @Override
    public Enumeration getAttributeNames()
    {
        return session.getAttributeNames();
    }

    @Override
    public long getCreationTime()
    {
        return session.getCreationTime();
    }

    @Override
    public String getId()
    {
        return session.getId();
    }

    @Override
    public long getLastAccessedTime()
    {
        return session.getLastAccessedTime();
    }

    @Override
    public int getMaxInactiveInterval()
    {
        return session.getMaxInactiveInterval();
    }

    @Override
    public ServletContext getServletContext()
    {
        return session.getServletContext();
    }

    @Override
    public HttpSessionContext getSessionContext()
    {
        return session.getSessionContext();
    }

    @Override
    public Object getValue(String arg0)
    {
        return session.getValue(arg0);
    }

    @Override
    public String[] getValueNames()
    {
        return session.getValueNames();
    }

    @Override
    public void invalidate()
    {
        session.invalidate();
    }

    @Override
    public boolean isNew()
    {
        return session.isNew();
    }

    @Override
    public void putValue(String arg0, Object arg1)
    {
        session.putValue(arg0, arg1);
    }

    @Override
    public void removeAttribute(String arg0)
    {
        session.removeAttribute(arg0);
    }

    @Override
    public void removeValue(String arg0)
    {
        session.removeValue(arg0);
    }

    @Override
    public void setAttribute(String arg0, Object arg1)
    {
        session.setAttribute(arg0, arg1);
    }

    @Override
    public void setMaxInactiveInterval(int arg0)
    {
        session.setMaxInactiveInterval(arg0);
    }

}
