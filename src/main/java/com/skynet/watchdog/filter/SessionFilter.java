package com.skynet.watchdog.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.skynet.watchdog.session.HttpServletRequestWrapper;

public class SessionFilter extends HttpServlet implements Filter
{
    private static final long serialVersionUID = -365105405910803550L;

    private String sessionId = "sid";

    private String cookieDomain = "";

    private String cookiePath = "/";

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException
    {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        Cookie cookies[] = request.getCookies();
        Cookie sCookie = null;

        String sid = "";
        if (cookies != null && cookies.length > 0)
        {
            for (int i = 0; i < cookies.length; i++)
            {
                sCookie = cookies[i];
                if (sCookie.getName().equals(sessionId))
                {
                    sid = sCookie.getValue();
                }
            }
        }

        if (sid == null || sid.length() == 0)
        {
            sid = java.util.UUID.randomUUID().toString();
            Cookie mycookies = new Cookie(sessionId, sid);
            mycookies.setMaxAge(-1);
            if (cookieDomain != null && cookieDomain.length() > 0)
            {
                mycookies.setDomain(cookieDomain);
            }
            mycookies.setPath(cookiePath);
            response.addCookie(mycookies);
        }

        filterChain.doFilter(new HttpServletRequestWrapper(sid, request), servletResponse);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException, RuntimeException
    {
        sessionId = filterConfig.getInitParameter("sessionId");
        cookieDomain = filterConfig.getInitParameter("cookieDomain");
        if (cookieDomain == null)
        {
            cookieDomain = "";
        }

        cookiePath = filterConfig.getInitParameter("cookiePath");
        if (cookiePath == null || cookiePath.length() == 0)
        {
            cookiePath = "/";
        }
    }

}
