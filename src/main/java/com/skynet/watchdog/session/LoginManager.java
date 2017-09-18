package com.skynet.watchdog.session;

import java.util.HashMap;
import java.util.Map;

import org.cox.lang.Lang;
import org.cox.lang.Strings;

import com.skynet.watchdog.config.ConfigManager;
import com.skynet.watchdog.config.LoginStatusConfig;
import com.skynet.watchdog.login.BeanLoginStatus;
import com.skynet.watchdog.memcached.MemcachedClient;
import com.skynet.watchdog.memcached.SockIOPool;

public class LoginManager
{

    private static volatile LoginManager loginManager;

    private SockIOPool sockIOPool;

    private LoginStatusConfig config;

    private Map<String, Object> localCache;
    
    private boolean connFlag = false;

    private LoginManager()
    {
        localCache = new HashMap<String, Object>();
        config = ConfigManager.getInstance().getLoginStatusConfig();
        if (!Lang.isEmpty(config))
        {
            String[] servers = config.Servers.split(",");
            sockIOPool = SockIOPool.getInstance(config.CacheName);
            sockIOPool.setServers(servers);
            sockIOPool.setInitConn(config.InitConnection);
            sockIOPool.setMinConn(config.MinConnection);
            sockIOPool.setMaxConn(config.MaxConnection);
            sockIOPool.setFailover(true);
            sockIOPool.setMaintSleep(30);
            sockIOPool.setNagle(false);
            sockIOPool.setSocketTO(3000);
            sockIOPool.setAliveCheck(true);
            try
            {
                sockIOPool.initialize();
                connFlag = sockIOPool.isInitialized();
            }
            catch (Exception e)
            {
                connFlag = false;
            }
        }
    }

    public static LoginManager getInstance()
    {
        if (loginManager == null)
        {
            synchronized (LoginManager.class)
            {
                if (loginManager == null)
                {
                    loginManager = new LoginManager();
                }
            }
        }
        return loginManager;
    }

    public BeanLoginStatus getLoginStatus(String id)
    {
        if (Strings.isBlank(id))
            return null;
        MemcachedClient memCachedClient = getMemCachedClient();
        if (memCachedClient == null)
        {
            return (BeanLoginStatus) localCache.get(id);
        }
        else
        {
            return (BeanLoginStatus) memCachedClient.get(id);
        }
    }

    public void saveLoginStatus(String id, BeanLoginStatus lgs)
    {
        if (Strings.isBlank(id) || Lang.isEmpty(lgs))
            return;
        MemcachedClient memCachedClient = getMemCachedClient();
        if (memCachedClient == null)
        {
            localCache.put(id, lgs);
        }
        else
        {

            memCachedClient.set(id, lgs);
        }
    }

    public void removeLoginStatus(String id)
    {
        if (Strings.isBlank(id))
            return;
        MemcachedClient memCachedClient = getMemCachedClient();
        if (memCachedClient == null)
        {
            localCache.remove(id);
        }
        else
        {
            memCachedClient.delete(id);
        }
    }

    private MemcachedClient getMemCachedClient()
    {

        MemcachedClient memCachedClient = null;
        if (!Lang.isEmpty(config)&&connFlag==true)
        {
            try
            {
                memCachedClient = new MemcachedClient(config.CacheName);
                memCachedClient.setCompressEnable(false);
                memCachedClient.setCompressThreshold(0);
            }
            catch (Exception e)
            {
                memCachedClient = null;
            }
        }
        return memCachedClient;
    }

    @Override
    protected void finalize()
    {
        if (sockIOPool != null)
        {
            sockIOPool.shutDown();
        }
    }

}
