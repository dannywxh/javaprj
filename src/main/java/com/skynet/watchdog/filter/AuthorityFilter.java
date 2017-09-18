package com.skynet.watchdog.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.cox.dao.entity.Record;
import org.cox.lang.Strings;
import org.cox.mvc.Mvcs;

import com.skynet.watchdog.authority.Authority;
import com.skynet.watchdog.authority.AuthorityDefaultImpl;
import com.skynet.watchdog.config.AuthorityConfig;
import com.skynet.watchdog.config.ConfigManager;
import com.skynet.watchdog.login.LoginDeafultImpl;
import com.skynet.watchdog.utils.Util;

/**
 * 后台权限过滤器
 * 
 * @author zxz
 * @version 2014-07-14
 */
public class AuthorityFilter implements Filter
{
    private AuthorityConfig authorityConfig;

    private Authority power;

    // 不需要拦截的资源列表
    private volatile static List<String> listUnFilter;

    // 需要拦截的资源类型列表
    private volatile static List<String> listFilter;

    public AuthorityFilter()
    {
        power = new AuthorityDefaultImpl();
        authorityConfig = ConfigManager.getInstance().getAuthorityConfig();
    }

    /**
     * 获取不需要拦截的资源
     * 
     * @return 资源列表
     */
    private boolean checkUnFilter(String url)
    {
        boolean flag = false;
        if (!Strings.isBlank(url))
        {
            String lastStr = url.substring(url.length() - 1, url.length());
            if ("/".equals(lastStr))
            {
                url = url.substring(0, url.length() - 1);
            }
        }
        if (!Strings.isBlank(url))
        {
            if (authorityConfig.Filtrate != null && authorityConfig.Filtrate.filtrates != null)
            {
                listUnFilter = authorityConfig.Filtrate.filtrates;
                for (String filtr : listUnFilter)
                {
                    if (filtr.lastIndexOf("*.") >= 0 || filtr.lastIndexOf("*/") >= 0)
                    {
                        if (filtr.lastIndexOf("*.") >= 0)
                        {
                            filtr = filtr.substring(filtr.lastIndexOf("*.") + 1, filtr.length());
                        }
                        if (filtr.lastIndexOf("*/") >= 0)
                        {
                            filtr = filtr.substring(filtr.lastIndexOf("*/") + 1, filtr.length());
                        }
                        if (url.indexOf(filtr) != -1)
                        {
                            flag = true;
                            break;
                        }
                    }
                    else if (filtr.lastIndexOf(".*") >= 0 || filtr.lastIndexOf("/*") >= 0)
                    {
                        if (filtr.lastIndexOf(".*") >= 0)
                        {
                            filtr = filtr.substring(0, filtr.lastIndexOf(".*") + 1);
                        }
                        if (filtr.lastIndexOf("/*") >= 0)
                        {
                            filtr = filtr.substring(0, filtr.lastIndexOf("/*") + 1);
                        }
                        if (url.indexOf(filtr) != -1)
                        {
                            flag = true;
                            break;
                        }
                    }
                    else
                    {
                        if (url.equals(filtr))
                        {
                            flag = true;
                            break;
                        }
                    }
                }
            }
        }
        else
        {
            flag = true;
        }
        return flag;
    }

    /**
     * 获取需要拦截的资源类型列表
     * 
     * @return 资源来行列表
     */
    private boolean checkFilter(String url, String contextPath)
    {
        boolean flag = false;
        if (authorityConfig.Intercept != null && authorityConfig.Intercept.intercepts != null)
        {
            listFilter = authorityConfig.Intercept.intercepts;
            for (String intercept : listFilter)
            {
                if ("/*".equals(intercept) || (contextPath + "/*").equals(intercept) || "*".equals(intercept))
                {
                    // 全部拦截
                    flag = true;
                    break;
                }
                else if (url.indexOf(intercept) != -1)
                {
                    // 额外拦截
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    }

    /**
     * 处理URL
     * 
     * @param url
     * URL
     * @return 处理后的URL
     */
    private String parseURL(String url, String contextPath)
    {
    	if(contextPath.equals(url)||contextPath.equals(url+"/")) return authorityConfig.DefaultPage;
        // 校验是否为目录
        Matcher matcher = Pattern.compile("(/\\w+)$|(/\\w+/)$").matcher(url);
        if (matcher.find())
        {
            if (Strings.isBlank(url))
            {
                url = authorityConfig.DefaultPage;// 登录页面
            }
        }
        // 除去项目名称部分
        url = url.replaceFirst(contextPath + "/", "");
        return url;
    }

    /**
     * 校验用回是否有对资源及参数中资源的访问权限
     * 
     * @param userId 用户id
     * @param url 请求url
     * @param request HttpServletRequest对象
     * @return 是否有访问权限
     */
    private boolean checkAuthority(String userId, String url, HttpServletRequest request)
    {
        url = "/" + url;
        return power.isHadResources(request, url, request.getParameterMap());
    }

    /**
     * 获得权限拦截，提示需要的的脚本和css
     */
    private String getBaseElement(String contentPath)
    {
        return authorityConfig.PowerElement.replace("#BasePath", contentPath);
    }

    /**
     * 权限提示
     */
    private String
            getErrorScript(HttpServletRequest request, String type, String contextPath, String msg, String script)
    {
        String html = "";
        if ("Y".equals(String.valueOf(request.getParameter("gnmk_defaultPage")).toUpperCase()))
        {
        }
        else
        {
            String powerTips = "function powerTips(){ " + "try{ " + "skynetDialog.warning('" + msg + "', function(){"
                    + script + "}); " + "}catch (e) { " + "alert('" + msg + "'); " + script + "} " + "}";
            if ("N".equals(type))
            {
                html = "<html>" + "<head>" + getBaseElement(contextPath) + "<script type=\"text/javascript\">"
                        + "$(document).ready(function(){" + "powerTips();" + "});" + powerTips + "</script>"
                        + "</head>" + "</html>";
            }
            else
            {
                html = "<script>" + powerTips + "powerTips();" + "</script>";
            }
        }
        return html;
    }

    /**
     * 权限过滤器
     */
    @Override
    public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain filterChain) throws IOException,
            ServletException
    {
        HttpServletRequest request = (HttpServletRequest) arg0;
        HttpServletResponse response = (HttpServletResponse) arg1;
        HttpSession session = request.getSession();
        response.setContentType("text/html;charset=UTF-8");
        String contextPath = request.getContextPath();
        String currentURL = parseURL(request.getRequestURI(), contextPath);
        String requesType = Strings.isBlank(request.getHeader("x-requested-with")) ? "N" : "A";
        String hostAddr = "http://" + Util.getServerIp(request) + ":" + Util.getServerPort(request) + contextPath;
        Record user = (Record) session.getAttribute("user");
        if(user==null&&!"login.jsp".equals(currentURL)){
        	LoginDeafultImpl loginDeafultImpl = Mvcs.ctx().getDefaultIoc().get(LoginDeafultImpl.class, "loginDeafultImpl");
         	loginDeafultImpl.logInByIp(request);
         	session=request.getSession(true);
         	user = (Record)  session.getAttribute("user");
        }      
        // -----------------------------------------------------------------
        // 强制拦截校验
        // -----------------------------------------------------------------
        if (checkFilter(currentURL, request.getContextPath()))
        {
            if (session != null&&!"login.jsp".equals(currentURL))session.invalidate();
            response.sendRedirect(hostAddr + "/" + authorityConfig.DefaultPage);
            return;
        }
        if (!checkUnFilter(currentURL)&&power.isResources("/" + currentURL))
        {
        	
            // -----------------------------------------------------------------
            // 判断是否在他处登录
            // -----------------------------------------------------------------
            if (session.getAttribute("loginFlag") != null && "false".equals(session.getAttribute("loginFlag").toString()))
            {
                session.invalidate();
                session = null;
                PrintWriter out = response.getWriter();
                out.print(getErrorScript(request, requesType, contextPath, "该账户在别处登录!", "window.top.location.href='"
                        + hostAddr + "/" + authorityConfig.LoginPage + "'"));
                return;
            }
            // -----------------------------------------------------------------
            // 用户登录校验
            // -----------------------------------------------------------------
         
            if (user == null)
            {
                    PrintWriter out = response.getWriter();
                    out.write(getErrorScript(request, requesType, contextPath, "您没有登录或登录已过期!请<a href=\"" + hostAddr + "/"
                            + authorityConfig.LoginPage + "\" target=\"_blank\"><b> 点击此处 <b></a>重新登录！", "skynetDialog.close();"));
                    return;  		
            }
            // -----------------------------------------------------------------
            // 资源访问权限校验
            // -----------------------------------------------------------------
            if (!checkAuthority(user.getString("id"), currentURL, request))
            {
                try
                {
                    PrintWriter out = response.getWriter();
                    out.print(getErrorScript(request, requesType, contextPath, "您没有该操作的权限！", ""));// window.top.history
                    return;
                }
                catch (Exception e)
                {
                    e.printStackTrace();
                }
                return;
            }
        }
        filterChain.doFilter(arg0, arg1);
    }

    @Override
    public void init(FilterConfig fcfg) throws ServletException
    {

    }

    @Override
    public void destroy()
    {

    }
}
