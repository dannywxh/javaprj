package com.skynet.watchdog.sys.bean;

import java.util.List;

public class BeanUserContext
{
    private BeanLoginUser user;

    private String jgdm;

    private List<BeanResource> resources;

    private List<BeanAuthority> power;

    private List<BeanRole> role;

    public BeanLoginUser getUser()
    {
        return user;
    }

    public void setUser(BeanLoginUser user)
    {
        this.user = user;
    }

    public String getJgdm()
    {
        return jgdm;
    }

    public void setJgdm(String jgdm)
    {
        this.jgdm = jgdm;
    }

    public List<BeanResource> getResources()
    {
        return resources;
    }

    public void setResources(List<BeanResource> resources)
    {
        this.resources = resources;
    }

    public List<BeanAuthority> getPower()
    {
        return power;
    }

    public void setPower(List<BeanAuthority> power)
    {
        this.power = power;
    }

    public List<BeanRole> getRole()
    {
        return role;
    }

    public void setRole(List<BeanRole> role)
    {
        this.role = role;
    }
}
