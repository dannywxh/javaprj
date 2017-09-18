package com.skynet.watchdog.sys.bean;

import java.util.UUID;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Name;
import org.cox.dao.entity.annotation.Table;
import org.cox.json.Json;

@Table("SYS_RANGE")
public class BeanDataRange
{
    @Name
    @Column("id")
    private String id;
    /** 数据范围组ID */
    @Column("gid")
    private String gid;
    /** 数据范围组设定描述 */
    @Column("gname")
    private String gname;
    /** 数据范围设定描述 */
    @Column("rname")
    private String rname;
    /** 配置ID */
    @Column("cid")
    private String cid;
    /** 资源ID */
    @Column("rid")
    private String rid;
    /** 资源对应URL */
    @Column("url")
    private String url;
    /** 配置顺序 */
    @Column("sx")
    private int sx;
    @Column("yxx")
    private int yxx;
    /** 这是一个Json字符串(由BeanRangeConfig转化) 将页面结果存储于此 */
    @Column("result")
    private String result;

    public BeanDataRange()
    {
    }

    public BeanDataRange(BeanDataRange group, BeanRangeConfig config)
    {
        this.id = UUID.randomUUID().toString();
        this.gid = group.getGid();
        this.gname = group.getGname();
        this.rname = group.getRname();
        this.cid = config.getId();
        this.rid = group.getRid();
        this.url = group.getUrl();
        this.sx = config.getSx();
        this.yxx = 1;
        this.result = Json.toJson(config);
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public String getGid()
    {
        return gid;
    }

    public void setGid(String gid)
    {
        this.gid = gid;
    }

    public String getGname()
    {
        return gname;
    }

    public void setGname(String gname)
    {
        this.gname = gname;
    }

    public String getRname()
    {
        return rname;
    }

    public void setRname(String rname)
    {
        this.rname = rname;
    }

    public String getCid()
    {
        return cid;
    }

    public void setCid(String cid)
    {
        this.cid = cid;
    }

    public String getRid()
    {
        return rid;
    }

    public void setRid(String rid)
    {
        this.rid = rid;
    }

    public String getUrl()
    {
        return url;
    }

    public void setUrl(String url)
    {
        this.url = url;
    }

    public int getSx()
    {
        return sx;
    }

    public void setSx(int sx)
    {
        this.sx = sx;
    }

    public int getYxx()
    {
        return yxx;
    }

    public void setYxx(int yxx)
    {
        this.yxx = yxx;
    }

    public String getResult()
    {
        return result;
    }

    public void setResult(String result)
    {
        this.result = result;
    }
}
