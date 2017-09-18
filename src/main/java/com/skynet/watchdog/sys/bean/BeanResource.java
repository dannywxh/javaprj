package com.skynet.watchdog.sys.bean;

import java.util.Date;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Default;
import org.cox.dao.entity.annotation.Name;
import org.cox.dao.entity.annotation.Table;
import org.cox.lang.Strings;
import org.cox.mvc.annotation.At;

import com.skynet.watchdog.annotation.ResourceNote;
import com.skynet.watchdog.utils.Util;

/**
 * 资源信息表
 *
 */
// 资源信息表
@Table("SYS_RESOURCES")
public class BeanResource
{
    @Name
    @Column("id")
    private String id;// 资源ID,字符长度:36
    @Column("pid")
    public String pid;
    @Column("name")
    private String name;// 资源名称,字符长度:180
    @Column("type")
    private String type;// 资源类型,字符长度:40
    @Column("url")
    private String url;// 资源地址,字符长度:200
    @Column("mark")
    private String mark;// 资源描述,字符长度:2000
    @Column("project")
    private String project;// 从属项目,字符长度:40
    @Column("yxx")
    private int yxx;// 启用标识
    @Column("gxsj")
    private Date gxsj;// 更新时间,默认值：sysdate
    @Column("flag")
    @Default(value = "1")
    private int flag;// 更新标识,默认值：1
    
    private String param;
    
    
    public BeanResource()
    {
        this.flag = 1;
    }
    
    public BeanResource(String type, At aNote, ResourceNote rNote, String url, String purl,String projectPath)
    {
        if (!Strings.isBlank(type) && !Strings.isBlank(url))
        {
            this.type = type;
            this.project = projectPath;
            if (rNote != null)
            {
                this.yxx = rNote.yxx() ? 1 : 0;
                this.mark = rNote.mark();
                this.url = url;
                if (!Strings.isBlank(rNote.name()))
                {
                    this.name = rNote.name();
                }
                else
                {
                    this.name = url;
                }
            }
            else if (aNote != null)
            {
                this.yxx = aNote.yxx() ? 1 : 0;
                this.mark = aNote.mark();
                this.url = url;
                if (!Strings.isBlank(aNote.name()))
                {
                    this.name = aNote.name();
                }
                else
                {
                    this.name = url;
                }
            }
            if (!"leaf".equals(type))
            {
                this.pid = null;
            }
            else if ("leaf".equals(type) && !Strings.isBlank(purl))
            {
                this.pid = Util.MD5Encrypt(Util.encode(purl.getBytes()));
            }
            this.flag = 1;
            this.id = Util.MD5Encrypt(Util.encode(url.getBytes()));
        }
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public String getId()
    {
        return id;
    }

    public String getPid()
    {
        return pid;
    }

    public void setPid(String pid)
    {
        this.pid = pid;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getName()
    {
        return name;
    }

    public void setType(String type)
    {
        this.type = type;
    }

    public String getType()
    {
        return type;
    }

    public void setUrl(String url)
    {
        this.url = url;
        this.id = Util.MD5Encrypt(Util.encode(url.getBytes()));
    }

    public String getUrl()
    {
        return url;
    }

    public void setMark(String mark)
    {
        this.mark = mark;
    }

    public String getMark()
    {
        return mark;
    }

    public void setProject(String project)
    {
        this.project = project;
    }

    public String getProject()
    {
        return project;
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

    public void setFlag(int flag)
    {
        this.flag = flag;
    }

    public int getFlag()
    {
        return flag;
    }

    public String getParam()
    {
        return param;
    }

    public void setParam(String param)
    {
        this.param = param;
    }
}
