package com.skynet.watchdog.config;

import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 权限配置对象
 * 
 * @author zxz
 * @version 2014-07-15
 */
@XmlRootElement(name = "authorityconfig")
public class AuthorityConfig
{
	/**
	 * 拦截列表
	 */
	public static class Intercept
	{
		@XmlElement(name = "item")
		public List<String>	intercepts;
	}

	/**
	 * 过滤列表
	 */
	public static class Filtrate
	{
		@XmlElement(name = "item")
		public List<String>	filtrates;
	}
	
    /**
     * PKI访问端配置
     */
    public static class Cluster
    {
        @XmlAttribute(name = "serverip")
        public String   ServerIP    = "";

        @XmlAttribute(name = "webport")
        public int      WebPort     = 8080;

        @XmlAttribute(name = "sslport")
        public int      SSLPort     = 8443;

        @XmlAttribute(name = "ipnode")
        public String   ipnode      = "";
    }

	/**
	 * 服务器配置
	 */
	public static class Server
	{
		@XmlAttribute(name = "serverip")
		public String	ServerIP	= "";

		@XmlAttribute(name = "webport")
		public int		WebPort		= 8080;

		@XmlAttribute(name = "sslport")
		public int		SSLPort		= 8443;
	}

    /**
     * 拦截列表
     */
	@XmlElement(name = "intercept")
	public Intercept	Intercept;

    /**
     * 过滤列表
     */
	@XmlElement(name = "filtrate")
	public Filtrate		Filtrate;

    /**
     * 服务器配置
     */
	@XmlElement(name = "server")
	public Server		Server;

	/**
	 * 会话参数
	 */
	@XmlElement(name = "attributename")
	public String		AttributeName;

	/**
	 * 登录页面
	 */
	@XmlElement(name = "loginpage")
	public String		LoginPage;
	
	/**
	 * 默认欢迎页面
	 */
	@XmlElement(name = "defaultpage")
	public String		DefaultPage;
	
	/**
	 * 权限相关sql
	 */
	@XmlElement(name = "sqlpath")
	public String		Sqlpath;
	
	
	/**
     * PKI访问端配置
     */
	@XmlElement(name = "cluster")
	public Cluster      Cluster;
	
	/**
	 * 权限页面元素
	 */
	@XmlElement(name = "powerelement")
	public String      PowerElement;

	public AuthorityConfig()
	{

	}
	
	public AuthorityConfig(Intercept intercept, Filtrate filtrate,Server server,Cluster cluster, String loginPage, String defaultPage,String sqlpath,String powerElement)
	{
		super();
		Intercept = intercept;
		Filtrate = filtrate;
		LoginPage = loginPage;
		DefaultPage = defaultPage;
		Server = server;
		Cluster = cluster;
		Sqlpath = sqlpath;
		PowerElement = powerElement;
	}

}
