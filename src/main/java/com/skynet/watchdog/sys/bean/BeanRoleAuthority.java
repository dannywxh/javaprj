package com.skynet.watchdog.sys.bean;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Name;
import org.cox.dao.entity.annotation.Table;

// 系统角色权限关联表
@Table("SYS_Role_Authority")
public class BeanRoleAuthority
{
    @Name
    @Column("id")
    private String id;// 角色权限关联ID,字符长度:36
    @Column("roleid")
    private String roleid;// 角色ID,字符长度:36
    @Column("authorityid")
    private String authorityid;// 权限ID,字符长度:36

    public void setId(String id)
    {
        this.id = id;
    }

    public String getId()
    {
        return id;
    }

    public void setRoleid(String roleid)
    {
        this.roleid = roleid;
    }

    public String getRoleid()
    {
        return roleid;
    }

    public void setAuthorityid(String authorityid)
    {
        this.authorityid = authorityid;
    }

    public String getAuthorityid()
    {
        return authorityid;
    }
}
