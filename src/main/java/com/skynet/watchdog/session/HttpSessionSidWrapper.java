package com.skynet.watchdog.session;

import java.util.Enumeration;
import java.util.Map;

import javax.servlet.http.HttpSession;

@SuppressWarnings({ "rawtypes","unchecked" })
public class HttpSessionSidWrapper extends HttpSessionWrapper
{

    private String sid = "";

    private Map map = null;

    public HttpSessionSidWrapper(String sid, HttpSession session)
    {
        super(session);
        this.sid = sid;
        map = SessionManager.getInstance().getSession(sid);
    }

    @Override
    public Object getAttribute(String arg0)
    {
        return map.get(arg0);
    }

    @Override
    public Enumeration getAttributeNames()
    {
        return (new Enumerator(map.keySet(), true));
    }

    @Override
    public void invalidate()
    {
        map.clear();
        SessionManager.getInstance().removeSession(sid);
    }

    @Override
    public void removeAttribute(String arg0)
    {
        map.remove(arg0);
        SessionManager.getInstance().saveSession(sid, map);
    }

    @Override
    public void setAttribute(String arg0, Object arg1)
    {
        map.put(arg0, arg1);
        SessionManager.getInstance().saveSession(sid, map);
    }

}
