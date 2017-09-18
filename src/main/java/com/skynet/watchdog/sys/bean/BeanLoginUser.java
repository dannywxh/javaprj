package com.skynet.watchdog.sys.bean;

import java.io.FileInputStream;
import java.util.Date;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Name;
import org.cox.dao.entity.annotation.Table;

@Table("sys_user")
public class BeanLoginUser
{
    @Name
    @Column("id")
    private String id;
    @Column("xm")
    private String xm;
//    @Column("sfzh")
//    private String sfzh;
    @Column("jgdm")
    private String jgdm;
    @Column("gwdm")
    private String gwdm;
    @Column("account")
    private String account;
    @Column("password")
    private String password;
    @Column("remark")
    private String remark;
    @Column("yxx")
    private int yxx;
    @Column("gxsj")
    private Date gxsj;
    @Column("tx")
    private FileInputStream tx;
    @Column("bdip")
    private String bdip;


	private String jgmc;
    
    private String gwmc;

    private String loginip;
    
    private String gzxm;
    
    public BeanLoginUser()
    {
        
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public String getXm()
    {
        return xm;
    }

    public void setXm(String xm)
    {
        this.xm = xm;
    }

//    public String getSfzh()
//    {
//        return sfzh;
//    }
//
//    public void setSfzh(String sfzh)
//    {
//        this.sfzh = sfzh;
//    }

    public String getJgdm()
    {
        return jgdm;
    }

    public void setJgdm(String jgdm)
    {
        this.jgdm = jgdm;
    }

    public String getGwdm()
    {
        return gwdm;
    }

    public void setGwdm(String gwdm)
    {
        this.gwdm = gwdm;
    }

    public String getAccount()
    {
        return account;
    }

    public void setAccount(String account)
    {
        this.account = account;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public String getRemark()
    {
        return remark;
    }

    public void setRemark(String remark)
    {
        this.remark = remark;
    }

    public Date getGxsj()
    {
        return gxsj;
    }

    public void setGxsj(Date gxsj)
    {
        this.gxsj = gxsj;
    }

    public String getJgmc()
    {
        return jgmc;
    }

    public void setJgmc(String jgmc)
    {
        this.jgmc = jgmc;
    }

    public String getGwmc()
    {
        return gwmc;
    }

    public void setGwmc(String gwmc)
    {
        this.gwmc = gwmc;
    }

    public String getLoginip()
    {
        return loginip;
    }

    public void setLoginip(String loginip)
    {
        this.loginip = loginip;
    }
    
    public int getYxx()
    {
        return yxx;
    }

    public void setYxx(int yxx)
    {
        this.yxx = yxx;
    }

	public FileInputStream getTx() {
		return tx;
	}

	public void setTx(FileInputStream tx) {
		this.tx = tx;
	}

	public String getBdip() {
		return bdip;
	}

	public void setBdip(String bdip) {
		this.bdip = bdip;
	}

	public String getGzxm() {
		return gzxm;
	}

	public void setGzxm(String gzxm) {
		this.gzxm = gzxm;
	}
	
	
}
