package com.skynet.watchdog.sys.bean;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Name;
import org.cox.dao.entity.annotation.Table;

@Table("SYS_RANGE_CONFIG")
public class BeanRangeConfig
{
    @Name
    @Column("id")
    public String id;
    @Column("name")
    public String name;
    @Column("rid")
    public String rid;
    @Column("url")
    public String url;
    @Column("key")
    public String key;
    @Column("title")
    public String title;
    @Column("dataurl")
    public String dataurl;
    @Column("tab")
    public String tab;
    @Column("field")
    public String field;
    @Column("showfield")
    public String showfield;
    @Column("showtext")
    public String showtext;
    @Column("collection")
    public String collection;
    @Column("reg")
    public String reg;
    @Column("single")
    public String single;
    @Column("element")
    public String element;
    @Column("dval")
    public String dval;
    @Column("yxx")
    public int yxx;
    @Column("scan")
    public int scan;
    @Column("sx")
    public int sx;
    /*最终选中值 非实体属性 在选中值行为后 选中值存储于此，将整个对象Json化后存储于 BeanDataRange result属性中*/
    public String val;
    
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
    public String getKey()
    {
        return key;
    }
    public void setKey(String key)
    {
        this.key = key;
    }
    public String getTitle()
    {
        return title;
    }
    public void setTitle(String title)
    {
        this.title = title;
    }
    public String getDataurl()
    {
        return dataurl;
    }
    public void setDataurl(String dataurl)
    {
        this.dataurl = dataurl;
    }
    public String getTab()
    {
        return tab;
    }
    public void setTab(String tab)
    {
        this.tab = tab;
    }
    public String getField()
    {
        return field;
    }
    public void setField(String field)
    {
        this.field = field;
    }
    public String getShowfield()
    {
        return showfield;
    }
    public void setShowfield(String showfield)
    {
        this.showfield = showfield;
    }
    public String getShowtext()
    {
        return showtext;
    }
    public void setShowtext(String showtext)
    {
        this.showtext = showtext;
    }
    public String getCollection()
    {
        return collection;
    }
    public void setCollection(String collection)
    {
        this.collection = collection;
    }
    public String getReg()
    {
        return reg;
    }
    public void setReg(String reg)
    {
        this.reg = reg;
    }
    public String getSingle()
    {
        return single;
    }
    public void setSingle(String single)
    {
        this.single = single;
    }
    public String getElement()
    {
        return element;
    }
    public void setElement(String element)
    {
        this.element = element;
    }
    public String getDval()
    {
        return dval;
    }
    public void setDval(String dval)
    {
        this.dval = dval;
    }
    public int getYxx()
    {
        return yxx;
    }
    public void setYxx(int yxx)
    {
        this.yxx = yxx;
    }
    public int getScan()
    {
        return scan;
    }
    public void setScan(int scan)
    {
        this.scan = scan;
    }
    public String getVal()
    {
        return val;
    }
    public void setVal(String val)
    {
        this.val = val;
    }
	public int getSx() {
		return sx;
	}
	public void setSx(int sx) {
		this.sx = sx;
	}
}
