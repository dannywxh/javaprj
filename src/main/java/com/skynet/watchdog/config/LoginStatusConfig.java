package com.skynet.watchdog.config;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * memcached Session缓存池配置对象
 * 
 * @author zxz
 * @version 2014-07-15
 */
@XmlRootElement(name = "loginstatusconfig")
public class LoginStatusConfig
{
    /**
     * 缓存池名
     */
    @XmlElement(name = "cachename")
    public String CacheName = "watchdog_loginStatus";
    /**
     * 服务器名 （以逗号分隔，带接口）
     */
    @XmlElement(name = "servers")
    public String Servers = "10.166.7.154:11211";

    /**
     * 初始连接数
     */
    @XmlElement(name = "initconnection")
    public int InitConnection = 10;

    /**
     * 最大连接数
     */
    @XmlElement(name = "maxconnection")
    public int MaxConnection = 500;

    /**
     * 最小连接数
     */
    @XmlElement(name = "minconnection")
    public int MinConnection = 5;

    public LoginStatusConfig()
    {

    }

    /**
     * 创建一个新的实例 SessionConfig.
     * 
     * @param servers
     * @param initConnection
     * @param maxConnection
     * @param minConnection
     * @param sessionTimeOut
     */
    public LoginStatusConfig(String servers, int initConnection, int maxConnection, int minConnection)
    {
        this();
        Servers = servers;
        InitConnection = initConnection;
        MaxConnection = maxConnection;
        MinConnection = minConnection;
    }

}
