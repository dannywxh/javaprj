package com.skynet.watchdog.session;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import org.cox.dao.entity.Record;
import org.cox.lang.Lang;
import org.cox.lang.Strings;

import com.skynet.watchdog.config.AuthorityConfig;
import com.skynet.watchdog.config.ConfigManager;
import com.skynet.watchdog.config.SessionConfig;
import com.skynet.watchdog.memcached.MemcachedClient;
import com.skynet.watchdog.memcached.SockIOPool;

public class SessionManager
{
    private static volatile SessionManager sessionManager;

    private SockIOPool sockIOPool;

    private SessionConfig sessionConfig;

    private AuthorityConfig authorityConfig;

    private LoginManager loginManager;

    private Map<String, Object> localCache;
    
    private boolean connFlag = false;

    private SessionManager()
    {
        localCache = new HashMap<String, Object>();
        loginManager = LoginManager.getInstance();
        sessionConfig = ConfigManager.getInstance().getSessionConfig();
        authorityConfig = ConfigManager.getInstance().getAuthorityConfig();
        if (!Lang.isEmpty(sessionConfig))
        {
            String[] servers = sessionConfig.Servers.split(",");
            sockIOPool = SockIOPool.getInstance(sessionConfig.CacheName);
            sockIOPool.setServers(servers);
            sockIOPool.setInitConn(sessionConfig.InitConnection);
            sockIOPool.setMinConn(sessionConfig.MinConnection);
            sockIOPool.setMaxConn(sessionConfig.MaxConnection);
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

    public static SessionManager getInstance()
    {
        if (sessionManager == null)
        {
            synchronized (SessionManager.class)
            {
                if (sessionManager == null)
                {
                    sessionManager = new SessionManager();
                }
            }
        }
        return sessionManager;
    }

    public Map<String, Object> getSession(String id)
    {
        if (Strings.isBlank(id) || "liveUser".equals(id))
            return null;
        MemcachedClient memCachedClient = getMemCachedClient();
        SessionCache session = null;
        if (memCachedClient == null)
        {
            session = (SessionCache) localCache.get(id);
            if(Lang.isEmpty(session)){
                session = new SessionCache();
                localCache.put(id, session);
            }
            else if (session != null
                    && (System.currentTimeMillis() - session.getLastAccess()) > sessionConfig.SessionTimeOut * 60 * 1000)
            {
                localCache.remove(id);
            }
            else if (session != null)
            {
                session.setLastAccess(System.currentTimeMillis());
                localCache.put(id, session);
            }
        }
        else
        {
            session = (SessionCache) memCachedClient.get(id);
            if(Lang.isEmpty(session)){
                session = new SessionCache();
                memCachedClient.set(id, session);
            }
            else if (session != null
                    && (System.currentTimeMillis() - session.getLastAccess()) > sessionConfig.SessionTimeOut * 60 * 1000)
            {
                memCachedClient.delete(id);
            }
            else if(session != null)
            {
                session.setLastAccess(System.currentTimeMillis());
                memCachedClient.set(id, session);
            }
        }
        return session.getSession();
    }

    public void saveSession(String id, Map<String, Object> session)
    {
        if (Strings.isBlank(id) || Lang.isEmpty(session) || "liveUser".equals(id))
            return;
        MemcachedClient memCachedClient = getMemCachedClient();
        if (memCachedClient == null)
        {
            localCache.put(id, new SessionCache(session));
        }
        else
        {
            memCachedClient.set(id, new SessionCache(session));
        }
    }

    public void removeSession(String id)
    {
        if (Strings.isBlank(id) || "liveUser".equals(id))
            return;
        MemcachedClient memCachedClient = getMemCachedClient();
        SessionCache session = null;
        if (memCachedClient == null)
        {
            session = (SessionCache) localCache.get(id);
            localCache.remove(id);
        }
        else
        {
            session = (SessionCache) memCachedClient.get(id);
            memCachedClient.delete(id);
        }
        if (!Lang.isEmpty(session))
        {
            try
            {
                Record user = (Record) session.getSession().get(authorityConfig.AttributeName);
                if (user != null && !Strings.isBlank(user.getString("id")))
                {
                    loginManager.removeLoginStatus(id);
                }
            }
            catch (Exception e)
            {
            }
        }
    }

    public void setLiveUsers(long number)
    {
        MemcachedClient memCachedClient = getMemCachedClient();
        if (memCachedClient == null)
        {
            localCache.put("liveUser", new LiveUsersCache(number));
        }
        else
        {
            memCachedClient.set("liveUser", new LiveUsersCache(number));
        }
    }

    @SuppressWarnings("unchecked")
    public long getLiveUsers()
    {
        MemcachedClient memCachedClient = getMemCachedClient();
        Set<String> userkeySet = new HashSet<String>();
        long checkTime = 0;
        long passTime = 1 * 60 * 1000;
        LiveUsersCache liveCache = null;
        if (memCachedClient == null)
        {
            if (Lang.isEmpty(localCache))
                return 0;
            liveCache = (LiveUsersCache) localCache.get("liveUser");
            if (!Lang.isEmpty(liveCache))
            {
                checkTime = System.currentTimeMillis() - liveCache.getLastAccess();
            }
            if (checkTime > passTime || Lang.isEmpty(liveCache))
            {
                Set<String> keys = localCache.keySet();

                Iterator<String> it = keys.iterator();
                while (it.hasNext())
                {
                    String key = it.next();
                    if ("liveUser".equals(key))
                        continue;
                    SessionCache session = (SessionCache) localCache.get(key);
                    if (!Lang.isEmpty(session)
                            && (System.currentTimeMillis() - session.getLastAccess()) <= sessionConfig.SessionTimeOut * 60 * 1000)
                    {
                        Record user = (Record) session.getSession().get(authorityConfig.AttributeName);
                        userkeySet.add(user.getString("id"));
                    }
                }
                if (Lang.isEmpty(liveCache))
                {
                    liveCache = new LiveUsersCache(userkeySet.size());
                    localCache.put("liveUser", liveCache);
                }
                else
                {
                    liveCache.setLastAccess(System.currentTimeMillis());
                    liveCache.setUsers(userkeySet.size());
                }
            }
            return liveCache.getUsers();
        }
        else
        {
            passTime = 5 * 60 * 1000;
            liveCache = (LiveUsersCache) memCachedClient.get("liveUser");
            if (!Lang.isEmpty(liveCache))
            {
                checkTime = System.currentTimeMillis() - liveCache.getLastAccess();
            }
            if (checkTime > passTime || Lang.isEmpty(liveCache))
            {
                Map<String, Map<String, String>> servers = memCachedClient.statsItems();
                Iterator<Map<String, String>> serversCacheIt = servers.values().iterator();
                while (serversCacheIt.hasNext())
                {
                    Iterator<String> itemKeys = serversCacheIt.next().keySet().iterator();
                    while (itemKeys.hasNext())
                    {
                        String itemCode = itemKeys.next().split(":")[1];
                        Iterator<Map<String, String>> itemIt = memCachedClient
                                .statsCacheDump(Integer.valueOf(itemCode), 0).values().iterator();
                        while (itemIt.hasNext())
                        {
                            Map<String, String> items = itemIt.next();
                            Iterator<String> it = items.keySet().iterator();
                            while (it.hasNext())
                            {
                                String key = it.next();
                                if (key.length() == 36)
                                {
                                    try
                                    {
                                        SessionCache session = (SessionCache) memCachedClient.get(key);
                                        if (!Lang.isEmpty(session)
                                                && (System.currentTimeMillis() - session.getLastAccess()) <= sessionConfig.SessionTimeOut * 60 * 1000)
                                        {
                                            Record user = (Record) session.getSession().get(
                                                    authorityConfig.AttributeName);
                                            userkeySet.add(user.getString("id"));
                                        }
                                    }
                                    catch (Exception e)
                                    {
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            memCachedClient.set("liveUser", liveCache);
        }
        return liveCache.getUsers();
    }

    public MemcachedClient getMemCachedClient()
    {
        MemcachedClient memCachedClient = null;
        if (!Lang.isEmpty(sessionConfig)&&connFlag==true)
        {
            try
            {
                memCachedClient = new MemcachedClient(sessionConfig.CacheName);
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
