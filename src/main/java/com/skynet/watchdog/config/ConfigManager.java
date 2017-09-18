package com.skynet.watchdog.config;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import com.skynet.watchdog.utils.Util;

/**
 * 配置读取管理器
 * 
 * @author zxz
 * @version 2014-07-14
 */
public class ConfigManager
{
    /**
     * 配置内部静态类
     */
	@XmlRootElement
	public static class Config
	{
		/**
		 * session配置对象
		 */
		@XmlElement(name = "sessionconfig")
		public SessionConfig	sessionConfig = new SessionConfig();
		/**
		 * session配置对象
		 */
		@XmlElement(name = "loginstatusconfig")
		public LoginStatusConfig	loginStatusConfig= new LoginStatusConfig();

		/**
		 * 权限配置对象
		 */
		@XmlElement(name = "authorityconfig")
		public AuthorityConfig	authorityConfig= new AuthorityConfig();
		
		/**
		 * 权限配置对象
		 */
		@XmlElement(name = "resourceconfig")
		public ResourceConfig	resourceConfig= new ResourceConfig();
	}

	private volatile static ConfigManager	manager;
	private Config							config;

	/**
	 * 构造方法
	 */
	private ConfigManager()
	{
		JAXBContext context = null;
		Unmarshaller unmarshaller = null;

		try
		{
		    //根据配置类，创建上下文信息对象
			context = JAXBContext.newInstance(Config.class);
			//根据上下文，绑定xml读取器
			unmarshaller = context.createUnmarshaller();
			//读取配置文件创建config对象
			config = (Config) unmarshaller.unmarshal(Util.Search(this.getClass(), "watchdog.xml"));
		}
		catch (Exception e)
		{
			//LoggerFactory.getLogger(ConfigManager.class).error("权限配置文件路径不正确！", e);
		}
	}

    /**
     * 获得一个ConfigManager的实例
     */
	public static ConfigManager getInstance()
	{
		if (manager == null)
		{
			synchronized (ConfigManager.class)
			{
				if (manager == null)
				{
					manager = new ConfigManager();
				}
			}
		}

		return manager;
	}

    /**
     * 获得一个Session配置对象
     */
	public SessionConfig getSessionConfig()
	{
		return config.sessionConfig;
	}
	
	/**
	 * 获得一个Session配置对象
	 */
	public LoginStatusConfig getLoginStatusConfig()
	{
	    return config.loginStatusConfig;
	}

    /**
     * 获得一个权限配置对象
     */
	public AuthorityConfig getAuthorityConfig()
	{
		return config.authorityConfig;
	}

	/**
	 * 获得一个资源配置对象
	 */
    public ResourceConfig getResourceConfig()
    {
        return config.resourceConfig;
    }

}
