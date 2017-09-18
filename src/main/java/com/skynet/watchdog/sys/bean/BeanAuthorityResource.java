package com.skynet.watchdog.sys.bean;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Name;
import org.cox.dao.entity.annotation.Table;

/**
 * 权限_资源关联表
 * 
 * @author S_Autumn 2014年7月25日14:38:53
 *
 */
@Table("SYS_Authority_Resources")
//
public class BeanAuthorityResource
{
    @Column("id")
    @Name
    private String id;// 权限资源关联ID,字符长度:36
    @Column("authorityid")
    private String authorityid;// 权限ID,字符长度:36
    @Column("resourcesid")
    private String resourcesid;// 资源ID,字符长度:36
    @Column("param")
    private String param;// 权限参数,字符长度:300

    public void setId(String id)
    {
        this.id = id;
    }

    public String getId()
    {
        return id;
    }

    public void setAuthorityid(String authorityid)
    {
        this.authorityid = authorityid;
    }

    public String getAuthorityid()
    {
        return authorityid;
    }

    public void setResourcesid(String resourcesid)
    {
        this.resourcesid = resourcesid;
    }

    public String getResourcesid()
    {
        return resourcesid;
    }

    public void setParam(String param)
    {
        this.param = param;
    }

    public String getParam()
    {
        return param;
    }
}
