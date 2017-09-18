package com.skynet.watchdog.log.pojo;

import java.util.Date;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Readonly;
import org.cox.dao.entity.annotation.Table;

@Table("sys_exception_log")
public class BeanExceptionLog
{
    @Readonly
    @Column("id")
    private String id;  // 主键
    @Column("logger")
    private String logger; // 记录日志的IP
    @Readonly
    @Column("czsj")
    private Date czsj; // 操作时间
    @Column("userid")
    private String userid; // 操作用户的ID
    @Column("userip")
    private String userip;  // 操作用户的IP
    @Column("url")
    private String url;  // 操作的URL
    @Column("param")
    private String param; // 操作的URL参数
    @Column("path")
    private String path; // 发生异常的路径
    @Column("arg")
    private String arg; // 发生异常方法的参数
    @Column("info")
    private String info; // 异常信息
    @Column("code")
    private String code; // 异常代码
    @Column("mark")
    private String mark; // 备注
    @Column("tz1")
    private String tz1; // 特征值1
    
    public String getId()
    {
        return id;
    }
    public void setId(String id)
    {
        this.id = id;
    }
    public String getLogger()
    {
        return logger;
    }
    public void setLogger(String logger)
    {
        this.logger = logger;
    }
    public Date getCzsj()
    {
        return czsj;
    }
    public void setCzsj(Date czsj)
    {
        this.czsj = czsj;
    }
    public String getUserid()
    {
        return userid;
    }
    public void setUserid(String userid)
    {
        this.userid = userid;
    }
    public String getUserip()
    {
        return userip;
    }
    public void setUserip(String userip)
    {
        this.userip = userip;
    }
    public String getUrl()
    {
        return url;
    }
    public void setUrl(String url)
    {
        this.url = url;
    }
    public String getParam()
    {
        return param;
    }
    public void setParam(String param)
    {
        this.param = param;
    }
    public String getPath()
    {
        return path;
    }
    public void setPath(String path)
    {
        this.path = path;
    }
    public String getArg()
    {
        return arg;
    }
    public void setArg(String arg)
    {
        this.arg = arg;
    }
    public String getInfo()
    {
        return info;
    }
    public void setInfo(String info)
    {
        this.info = info;
    }
    public String getCode()
    {
        return code;
    }
    public void setCode(String code)
    {
        this.code = code;
    }
    public String getMark()
    {
        return mark;
    }
    public void setMark(String mark)
    {
        this.mark = mark;
    }
    public String getTz1()
    {
        return tz1;
    }
    public void setTz1(String tz1)
    {
        this.tz1 = tz1;
    }
}
