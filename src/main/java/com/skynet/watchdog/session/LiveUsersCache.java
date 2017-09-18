package com.skynet.watchdog.session;

import java.io.Serializable;


public class LiveUsersCache implements Serializable
{

    private static final long serialVersionUID = 1L;

    private long lastAccess;
    
    private long users;

    public LiveUsersCache()
    {
        users = 0;
        lastAccess = System.currentTimeMillis();
    }
    
    public LiveUsersCache(long users)
    {
        this.users = users;
        this.lastAccess = System.currentTimeMillis();
    }

    public long getUsers()
    {
        return this.users;
    }

    public void setUsers(long users)
    {
        this.users = users;
    }

    public long getLastAccess()
    {
        return lastAccess;
    }

    public void setLastAccess(long lastAccess)
    {
        this.lastAccess = lastAccess;
    }
}