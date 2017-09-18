package com.skynet.watchdog.sys.bean;

import java.util.Date;
import java.util.List;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Many;
import org.cox.dao.entity.annotation.Name;
import org.cox.dao.entity.annotation.Table;

/**
 * 系统权限表
 * 
 * @author S_Autumn 2014年7月25日08:49:07
 *
 */
@Table("SYS_Authority")
// 系统权限表
public class BeanAuthority
{
    @Column("id")
    @Name
    private String id;// 权限ID,字符长度:36
    @Column("pid")
    private String pid;// 父权限ID,字符长度:36
    @Column("code")
    private String code;// 权限编码,字符长度:36
    @Column("name")
    private String name;// 权限名称,字符长度:180
    @Column("mark")
    private String mark;// 权限描述,字符长度:2000
    @Column("yxx")
    private int yxx;// 启用标识
    @Column("gxsj")
    private Date gxsj;// 更新时间,默认值：sysdate
    @Many(field = "authorityid", target = BeanAuthorityResource.class)
    private List<BeanAuthorityResource> listPR;

    public void setId(String id)
    {
        this.id = id;
    }

    public String getId()
    {
        return id;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getName()
    {
        return name;
    }

    public void setMark(String mark)
    {
        this.mark = mark;
    }

    public String getMark()
    {
        return mark;
    }

    public void setYxx(int yxx)
    {
        this.yxx = yxx;
    }

    public int getYxx()
    {
        return yxx;
    }

    public void setGxsj(Date gxsj)
    {
        this.gxsj = gxsj;
    }

    public Date getGxsj()
    {
        return gxsj;
    }

    public List<BeanAuthorityResource> getListPR()
    {
        return listPR;
    }

    public void setListPR(List<BeanAuthorityResource> listPR)
    {
        this.listPR = listPR;
    }

    public String getPid()
    {
        return pid;
    }

    public void setPid(String pid)
    {
        this.pid = pid;
    }

    public String getCode()
    {
        return code;
    }

    public void setCode(String code)
    {
        this.code = code;
    }

}
