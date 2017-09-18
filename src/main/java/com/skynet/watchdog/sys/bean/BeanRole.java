package com.skynet.watchdog.sys.bean;

import java.util.Date;
import java.util.List;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Many;
import org.cox.dao.entity.annotation.Name;
import org.cox.dao.entity.annotation.Table;

// 系统角色表
@Table("SYS_Role")
public class BeanRole
{
    @Column("id")
    @Name
    private String id;// 角色ID,字符长度:36
    @Column("pid")
    private String pid;// 角色PID,字符长度:36
    @Column("name")
    private String name;// 角色名称,字符长度:180
    @Column("mark")
    private String mark;// 角色描述,字符长度:2000
    @Column("yxx")
    private int yxx;// 启用标识
    @Column("gxsj")
    private Date gxsj;// 更新时间,默认值：sysdate
    @Many(field = "roleid", target = BeanRoleAuthority.class)
    private List<BeanRoleAuthority> listRA;

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getMark()
    {
        return mark;
    }

    public void setMark(String mark)
    {
        this.mark = mark;
    }

    public int getYxx()
    {
        return yxx;
    }

    public void setYxx(int yxx)
    {
        this.yxx = yxx;
    }

    public Date getGxsj()
    {
        return gxsj;
    }

    public void setGxsj(Date gxsj)
    {
        this.gxsj = gxsj;
    }

    public List<BeanRoleAuthority> getListRA()
    {
        return listRA;
    }

    public void setListRA(List<BeanRoleAuthority> listRA)
    {
        this.listRA = listRA;
    }

    public String getPid()
    {
        return pid;
    }

    public void setPid(String pid)
    {
        this.pid = pid;
    }

}
