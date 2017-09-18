package com.skynet.watchdog.login;

import javax.servlet.http.HttpServletRequest;

public interface Login
{
    /**
     * 普通登录
     */
    boolean logIn(HttpServletRequest request);
    /**
     * 普通登录
     */
    boolean logInByIp(HttpServletRequest request);
    /**
     *ID登录
     */
    boolean logInbyId(HttpServletRequest request,String id);
    /**
     *当前操作者是否已存在登录用户
     */
    boolean isSingleStatus(HttpServletRequest request);
    /**
     *登出
     */
    void logOut(HttpServletRequest request);
    /**
     *踢出登录用户
     */
    void kickLogOut(String id);
}
