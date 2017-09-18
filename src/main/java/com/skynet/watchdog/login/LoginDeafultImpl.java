package com.skynet.watchdog.login;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.cox.dao.Chain;
import org.cox.dao.Cnd;
import org.cox.dao.Dao;
import org.cox.dao.Sqls;
import org.cox.dao.entity.Record;
import org.cox.dao.impl.FileSqlManager;
import org.cox.dao.impl.NutDao;
import org.cox.dao.sql.Sql;
import org.cox.ioc.loader.annotation.IocBean;
import org.cox.lang.Lang;
import org.cox.lang.Strings;
import org.cox.mvc.Mvcs;

import com.skynet.watchdog.config.AuthorityConfig;
import com.skynet.watchdog.config.ConfigManager;
import com.skynet.watchdog.session.LoginManager;
import com.skynet.watchdog.session.SessionManager;
import com.skynet.watchdog.utils.Util;

@IocBean
public class LoginDeafultImpl implements Login
{

    private AuthorityConfig authorityConfig;

    private LoginManager loginManager;

    private SessionManager sessionManager;

    public LoginDeafultImpl()
    {
        authorityConfig = ConfigManager.getInstance().getAuthorityConfig();
        loginManager = LoginManager.getInstance();
        sessionManager = SessionManager.getInstance();
    }

    private Sql getSql(Dao dao, String name)
    {
        ((NutDao) dao).setSqlManager(new FileSqlManager(authorityConfig.Sqlpath));
        Sql sql = Sqls.create(dao.sqls().get(name));
        return sql;
    }

    @SuppressWarnings("unchecked")
    private List<Record> doQueryForRecords(Dao dao, Sql sql)
    {
        sql.setCallback(Sqls.callback.records());
        dao.execute(sql);
        return (List<Record>) sql.getResult();
    }

    /**
     * 获得sid
     * 
     * @param req 当前响应对象
     */
    private String getCacehId(HttpServletRequest request)
    {
        String cacheid = "";
        Cookie cookies[] = request.getCookies();
        Cookie sCookie = null;
        if (cookies != null && cookies.length > 0)
        {
            for (int i = 0; i < cookies.length; i++)
            {
                sCookie = cookies[i];
                if (sCookie.getName().equals("sid"))
                {
                    cacheid = sCookie.getValue();
                }
            }
        }
        return cacheid;
    }

    /**
     * 更改登录状态 （单ip用户登录）
     * 
     * @param req 当前响应对象
     * @param ip 当前请求ip
     * @param ip 当前请求用户
     */
    private void changeLoginStatus(HttpServletRequest request, String ip, Record user)
    {
        String uid = user.getString("id");
        String sid = request.getSession().getId();
        String cacheid = getCacehId(request);
        BeanLoginStatus lgs = loginManager.getLoginStatus(uid);
        if (lgs != null && !sid.equals(lgs.getSessionId()) && lgs.getStatus() == 1)
        {
            Map<String, Object> session = sessionManager.getSession(cacheid);
            session.put("loginFlag", "false");
            sessionManager.saveSession(cacheid, session);
        }
        request.getSession().setAttribute("loginFlag", "true");
        loginManager.saveLoginStatus(uid, new BeanLoginStatus(uid, ip, sid, cacheid, System.currentTimeMillis(), 1));
    }

    /**
     * 更改登录状态 （单用户登录）
     * 
     * @param req 当前响应对象
     * @param loginUser 当前请求登录用户
     */
    @Override
    public boolean isSingleStatus(HttpServletRequest request)
    {
        boolean flag = true;
        try
        {
            HttpSession session = request.getSession();
            Record logedUser = (Record) session.getAttribute(authorityConfig.AttributeName);
            if (logedUser != null && !Strings.isBlank(logedUser.getString("id")))
            {
                flag = false;
            }
        }
        catch (Exception e)
        {
            flag = true;
        }
        return flag;
    }

    /**
     * 普通登录
     * 
     * @param req 当前响应对象
     */
    @Override
    public boolean logIn(HttpServletRequest request)
    {
        String account = request.getParameter("account").toUpperCase();
        String password = Util.SHAEncrypt(request.getParameter("password"));
        String ip = Util.getRemoteAddr(request); 
        if (!Strings.isBlank(account) && !Strings.isBlank(password))
        {
        	//password="9507B1062D2C08FE711B9FE529480BE0B03024F9";
            Dao dao = Mvcs.getIoc().get(Dao.class, "dao");
            Sql sql = getSql(dao, "query_users_login");
            sql.params().set("account", account);
            sql.params().set("password", password);
            List<Record> users = doQueryForRecords(dao, sql);
            if (users != null && users.size() > 0)
            {
                Record user = users.get(0);
                if (user != null && !Strings.isBlank(user.getString("id")))
                {    
                	if(!ip.equals(user.getString("bdip"))&&!"admin".equals(user.getString("account"))){           		
                		 return false;
                	}
                    changeLoginStatus(request, ip, user);
                    logOut(request);
                    user.put("loginip", ip);
                    request.getSession(true).setAttribute(authorityConfig.AttributeName, user);
                    dao.update("SYS_USER", Chain.make("zhdlip", ip).add("zhdlsj", new Date()), Cnd.where("id", "=", user.getString("id")));
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        return false;
    }

    /**
     * 普通登录
     * 
     * @param req 当前响应对象
     */
    @Override
    public boolean logInByIp(HttpServletRequest request)
    {    
    	 	String ip = Util.getRemoteAddr(request);   
    	 	Dao dao =Mvcs.ctx().getDefaultIoc().get(Dao.class, "dao"); 	
            Sql sql = getSql(dao, "query_users_Iplogin");
            sql.params().set("ip", ip);
            List<Record> users = doQueryForRecords(dao, sql);
            if (users != null && users.size() == 1)
            {
                Record user = users.get(0);
                if (user != null && !Strings.isBlank(user.getString("id")))
                {                
//                    changeLoginStatus(request, ip, user);
                    logOut(request);
                    user.put("loginip", ip);
                    request.getSession(true).setAttribute(authorityConfig.AttributeName, user);
                    request.getSession().setAttribute("loginFlag", "true");
                    final String cid=UUID.randomUUID().toString();
                    loginManager.saveLoginStatus(user.getString("id"), new BeanLoginStatus(user.getString("id"), ip, request.getSession().getId(),cid , System.currentTimeMillis(), 1));
                    dao.update("SYS_USER", Chain.make("zhdlip", ip).add("zhdlsj", new Date()), Cnd.where("id", "=", user.getString("id")));
                    return true;
                }
                else
                {
                    return false;
                }
            }
            return false;
    }
    /**
     * 超管以某用户身份登录
     * 
     * @param req 当前响应对象
     * @param id 将要登录的用户
     */
    @Override
    public boolean logInbyId(HttpServletRequest request, String id)
    {
        if (!Strings.isBlank(id))
        {
            Dao dao = Mvcs.getIoc().get(Dao.class, "dao");
            Sql sql = getSql(dao, "query_users_Idlogin");
            sql.params().set("id", id);
            List<Record> users = doQueryForRecords(dao, sql);
            if (users != null && users.size() > 0)
            {
                Record user = users.get(0);
                if (user != null && !Strings.isBlank(user.getString("id")))
                {
                    String ip = Util.getRemoteAddr(request);
                    logOut(request);
                    user.put("loginip", ip);
                    request.getSession(true).setAttribute(authorityConfig.AttributeName, user);
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        return false;
    }

    /**
     * 登录出
     * 
     * @param req 当前响应对象
     */
    @Override
    public void logOut(HttpServletRequest request)
    {
        if (request.getSession() != null)
        {
            try
            {
                Record user = (Record) request.getSession().getAttribute(authorityConfig.AttributeName);
                if (user != null && !Strings.isBlank(user.getString("id")))
                {
                    String ip = Util.getRemoteAddr(request);
                    String id = user.getString("id");
                    String sid = request.getSession().getId();
                    String cacheid = getCacehId(request);
                    loginManager.saveLoginStatus(id,new BeanLoginStatus(user.getString("id"), ip, sid, cacheid, System.currentTimeMillis(), 0));
                }
            }
            catch (Exception e)
            {
            }
            request.getSession().invalidate();
        }
    }

    @Override
    public void kickLogOut(String id)
    {
        if (!Strings.isBlank(id))
        {
            BeanLoginStatus lgs = loginManager.getLoginStatus(id);
            if (!Lang.isEmpty(lgs)) {
            	sessionManager.removeSession(lgs.getCacheId());
            }
            
        }
    }

}
