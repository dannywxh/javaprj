package com.skynet.watchdog.authority;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.cox.dao.Cnd;
import org.cox.dao.Sqls;
import org.cox.dao.entity.Record;
import org.cox.dao.impl.FileSqlManager;
import org.cox.dao.impl.NutDao;
import org.cox.dao.sql.Sql;
import org.cox.dao.sql.SqlCallback;
import org.cox.json.Json;
import org.cox.lang.Lang;
import org.cox.lang.Strings;

import com.skynet.watchdog.config.AuthorityConfig;
import com.skynet.watchdog.config.ConfigManager;
import com.skynet.watchdog.sys.bean.BeanAuthority;
import com.skynet.watchdog.sys.bean.BeanLoginUser;
import com.skynet.watchdog.sys.bean.BeanResource;
import com.skynet.watchdog.sys.bean.BeanRole;
import com.skynet.watchdog.sys.bean.BeanUserContext;
import com.skynet.watchdog.utils.Util;

public class AuthorityDefaultImpl implements Authority
{

    private AuthorityConfig authorityConfig;

    private NutDao dao;

    public AuthorityDefaultImpl()
    {
        authorityConfig = ConfigManager.getInstance().getAuthorityConfig();
        Util.getInstance();
        dao = null;
    }

    private Record getUser(HttpServletRequest req)
    {
        Record rd = null;
        try
        {
            rd = (Record) req.getSession().getAttribute(authorityConfig.AttributeName);
        }
        catch (Exception e)
        {
        	e.printStackTrace();
        }
        return rd;
    }

    private Sql getSql(String name)
    {
        if (dao == null)
        {
            dao = Util.getNuzDao();
        }
        dao.setSqlManager(new FileSqlManager(authorityConfig.Sqlpath));
        Sql sql = Sqls.create(dao.sqls().get(name));
        return sql;
    }

    @SuppressWarnings({ "unused", "unchecked" })
    private List<Record> queryForRecords(Sql sql)
    {
        sql.setCallback(Sqls.callback.records());
        dao.execute(sql);
        return (List<Record>) sql.getResult();
    }

    @SuppressWarnings("unchecked")
    private <T> List<T> queryForBeans(Class<T> classT, Sql sql)
    {
        sql.setEntity(dao.getEntity(classT));
        sql.setCallback(Sqls.callback.entities());
        dao.execute(sql);
        return (List<T>) sql.getResult();
    }

    private int countResult(Sql sql)
    {
        sql.setCallback(new SqlCallback()
        {
            @Override
            public Object invoke(Connection conn, ResultSet rs, Sql sql) throws SQLException
            {
                int cnt = 0;
                while (rs.next())
                {
                    cnt++;
                }
                return cnt;
            }
        });
        dao.execute(sql);
        return (int) sql.getResult();
    }

    /**
     * 获得用户资源权限
     * 
     * @param req 当前响应对象
     */
    @Override
    public List<BeanResource> getUserResources(HttpServletRequest req)
    {
        Record user = getUser(req);
        Sql sql = getSql("find_user_resource");
        sql.setCondition(Cnd.wrap(" AND US.ID  = '" + user.getString("id") + "'"));
        return queryForBeans(BeanResource.class, sql);
    }

    /**
     * 获得用户行为权限
     * 
     * @param req 当前响应对象
     */
    @Override
    public List<BeanAuthority> getUserPowers(HttpServletRequest req)
    {
        Record user = getUser(req);
        Sql sql = getSql("find_user_power");
        sql.setCondition(Cnd.wrap(" AND US.ID  = '" + user.getString("id") + "'"));
        return queryForBeans(BeanAuthority.class, sql);
    }

    /**
     * 获得用户角色
     * 
     * @param req 当前响应对象
     */
    @Override
    public List<BeanRole> getUserRoles(HttpServletRequest req)
    {
        Record user = getUser(req);
        Sql sql = getSql("find_user_roles");
        sql.setCondition(Cnd.wrap(" AND US.ID  = '" + user.getString("id") + "'"));
        return queryForBeans(BeanRole.class, sql);
    }

    /**
     * 获得用户上下文信息
     * 
     * @param req 当前响应对象
     */
    @Override
    public BeanUserContext getLoginUserInfo(HttpServletRequest req)
    {
        Record rd = (Record) req.getSession().getAttribute(authorityConfig.AttributeName);
        if (Lang.isEmpty(rd))
            return null;
        String userid = rd.getString("id");
        if (Strings.isBlank(userid))
            return null;
        BeanLoginUser user = dao.fetch(BeanLoginUser.class, rd.getString("id"));
        BeanUserContext context = new BeanUserContext();
        context.setUser(user);
        context.setResources(getUserResources(req));
        context.setPower(getUserPowers(req));
        context.setRole(getUserRoles(req));
        context.setJgdm(user.getJgdm());
        return context;
    }

    /**
     * 是否是有效资源
     * 
     * @param url 需要验证的URL地址
     */
    @Override
    public boolean isResources(String url)
    {
        boolean flag = false;
        NutDao dao = Util.getNuzDao();
        if (dao != null)
        {
            int cnt = dao.count(BeanResource.class, Cnd.wrap(" WHERE URL = '" + url + "' AND YXX = 1 "));
            if (cnt > 0)
            {
                flag = true;
            }
        }
        return flag;
    }

    /**
     * 是否是有效资源
     * 
     * @param url 需要验证的URL地址
     */
    @Override
    public boolean isPower(String code)
    {
        boolean flag = false;
        NutDao dao = Util.getNuzDao();
        if (dao != null)
        {
            int cnt = dao.count(BeanAuthority.class, Cnd.wrap(" WHERE CODE = '" + code + "' AND YXX = 1 "));
            if (cnt > 0)
            {
                flag = true;
            }
        }
        return flag;
    }

    /**
     * 用户是否拥有资源权限
     * 
     * @param req 当前响应对象
     * @param url 需要验证的URL地址
     * @param paramMap 需要验证的参数对象 通常是 request.getParameterMap() 也可单独指定
     */
    @Override
    public boolean isHadResources(HttpServletRequest req, String url, Map<String, String[]> paramMap)
    {
        boolean flag = false;
        if (!Strings.isEmpty(url) && isResources(url))
        {
            Record user = getUser(req);
            Sql sql = getSql("find_user_resource");
            sql.setCondition(Cnd.wrap(" AND US.ID  = '" + user.getString("id") + "' AND RE.URL = '" + url + "'"));
            List<BeanResource> listResources = queryForBeans(BeanResource.class, sql);
            if (listResources == null || listResources.size() <= 0)
            {
                // 无资源权限
                return flag;
            }
            else
            {
                // 有资源url
                for (BeanResource item : listResources)
                {
                    if (item != null && Strings.isBlank(item.getParam()))
                    {
                        // 无资源参数时
                        flag = true;
                        return flag;
                    }
                    if (item != null && !Strings.isBlank(item.getParam()))
                    {
                        // 有资源参数时
                        String[] paramArry = item.getParam().split("&");
                        Map<String, String> powerMap = new HashMap<String, String>();
                        int cnt = 0;
                        int tmp = 0;
                        for (int i = 0; i < paramArry.length; i++)
                        {
                            powerMap.put(paramArry[i].split("=")[0], paramArry[i].split("=")[1]);
                        }
                        cnt = powerMap.size();
                        Iterator<String> it = powerMap.keySet().iterator();
                        String key = "";
                        String param = "";
                        while (it.hasNext())
                        {
                            key = it.next();
                            if (paramMap.containsKey(key))
                            {
                                param = "";
                                for (String keyw : paramMap.get(key))
                                {
                                    param += "," + keyw;
                                }
                                param = param.replaceFirst(",", "");
                                if (param.equals(powerMap.get(key)))
                                    tmp++;
                            }
                        }
                        if (tmp == cnt)
                        {
                            flag = true;
                            return flag;
                        }
                        else
                        {
                            flag = false;
                            continue;
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
     * 用户是否拥有权限
     * 
     * @param req 当前响应对象
     * @param code 需要验证的权限编码
     */
    @Override
    public boolean isHadPower(HttpServletRequest req, String code)
    {
        boolean flag = false;
        if (!Strings.isBlank(code) && isPower(code))
        {
            Record user = getUser(req);
            Sql sql = getSql("find_user_power");
            sql.setCondition(Cnd.wrap(" AND US.ID  = '" + user.getString("id") + "' AND AU.CODE = '" + code + "'"));
            if (countResult(sql) >= 1)
            {
                flag = true;
            }
            else
            {
                flag = false;
            }
        }
        else
        {
            flag = true;
        }
        return flag;
    }

    /**
     * 验证指定用户是否拥有指定的资源
     */
    @Override
    public boolean checkResources(HttpServletRequest req, String userid, String url, String params)
    {
        boolean flag = false;
        if (Strings.isBlank(url))
            return flag;
        Map<String, String[]> paramater = new HashMap<String, String[]>();
        if (Strings.isBlank(userid))
        {
            Record user = getUser(req);
            userid = user.getString("id");
        }
        if (!Strings.isBlank(params))
            paramater = Json.fromJsonAsMap(String[].class, params);
        if (url.indexOf("?") > -1)
        {
            String paramStr = url.substring(url.indexOf("?") + 1, url.length());
            url = url.substring(0, url.indexOf("?"));
            if (!Strings.isBlank(paramStr))
            {
                String[] paramArray = paramStr.split("&");
                for (String key : paramArray)
                {
                    if (key.indexOf("=") > -1)
                    {
                        String pkey = key.substring(0, key.indexOf("="));
                        String pval = key.substring(key.indexOf("="), key.length());
                        String[] val = { pval };
                        if (paramater.containsKey(pkey))
                        {
                            paramater.put(pkey, Lang.merge(paramater.get(pkey), val));
                        }
                        else
                        {
                            paramater.put(pkey, val);
                        }
                    }
                }
            }
        }
        if (!Strings.isBlank(url) && isResources(url))
        {
            Sql sql = getSql("find_user_resource");
            sql.setCondition(Cnd.wrap(" AND US.ID  = '" + userid + "' AND RE.URL = '" + url + "'"));
            List<BeanResource> listResources = queryForBeans(BeanResource.class, sql);
            if (listResources == null || listResources.size() <= 0)
            {
                // 无资源
                return flag;
            }
            else
            {
                // 有资源url
                for (BeanResource item : listResources)
                {
                    if (item != null && Strings.isBlank(item.getParam()))
                    {
                        // 无资源参数时
                        flag = true;
                        return flag;
                    }
                    if (item != null && !Strings.isBlank(item.getParam()))
                    {
                        // 有资源参数时
                        String[] paramArry = item.getParam().split("&");
                        Map<String, String> powerMap = new HashMap<String, String>();
                        int cnt = 0;
                        int tmp = 0;
                        for (int i = 0; i < paramArry.length; i++)
                        {
                            powerMap.put(paramArry[i].split("=")[0], paramArry[i].split("=")[1]);
                        }
                        cnt = powerMap.size();
                        Iterator<String> it = powerMap.keySet().iterator();
                        String key = "";
                        String param = "";
                        while (it.hasNext())
                        {
                            key = it.next();
                            if (paramater.containsKey(key))
                            {
                                param = "";
                                for (String keyw : paramater.get(key))
                                {
                                    param += "," + keyw;
                                }
                                param = param.replaceFirst(",", "");
                                if (param.equals(powerMap.get(key)))
                                    tmp++;
                            }
                        }
                        if (tmp == cnt)
                        {
                            flag = true;
                            return flag;
                        }
                        else
                        {
                            flag = false;
                            continue;
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
}
