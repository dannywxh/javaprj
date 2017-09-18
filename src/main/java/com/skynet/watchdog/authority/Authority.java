package com.skynet.watchdog.authority;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.skynet.watchdog.sys.bean.BeanAuthority;
import com.skynet.watchdog.sys.bean.BeanResource;
import com.skynet.watchdog.sys.bean.BeanRole;
import com.skynet.watchdog.sys.bean.BeanUserContext;

public interface Authority
{
    /**
     * 获得用户拥有的所有资源
     */
    public List<BeanResource> getUserResources(HttpServletRequest req);

    /**
     * 获得用户拥有的所有权限
     */
    public List<BeanAuthority> getUserPowers(HttpServletRequest req);

    /**
     * 获得用户拥有的所有的角色
     */
    public List<BeanRole> getUserRoles(HttpServletRequest req);

    /**
     * 获得当前登录人的 资源 角色 权限 行政区划 组织机构 用户基本信息 相关上下文
     */
    public BeanUserContext getLoginUserInfo(HttpServletRequest req);

    /**
     * 验证资源是否有效
     */
    public boolean isResources(String url);

    /**
     * 验证权限是否有效
     */
    public boolean isPower(String code);

    /**
     * 验证用户是否拥有指定url和参数 的资源
     */
    public boolean isHadResources(HttpServletRequest req, String url, Map<String, String[]> paramMap);

    /**
     * 验证用户是否拥有指定的权限
     */
    public boolean isHadPower(HttpServletRequest req, String code);

    /**
     * 验证指定用户是否拥有指定的资源
     */
    public boolean checkResources(HttpServletRequest req, String userid, String url, String params);
}
