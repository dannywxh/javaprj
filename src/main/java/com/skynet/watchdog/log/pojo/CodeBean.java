package com.skynet.watchdog.log.pojo;

import java.io.Serializable;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Readonly;
import org.cox.dao.entity.annotation.Table;

/**
 * @author jsq
 *
 */
@Table("pm_code")	//字典表
public class CodeBean implements Serializable {
	
	private static final long serialVersionUID = 1L;
	@Column("dm")
	private String dm;
	@Column("mc")
	private String mc;
	@Column("jc")
	private String jc;
	@Column("pym")
	private String pym;
	@Column("ly")
	private String ly;
	@Column("lx")
	private String lx;
	@Readonly
	@Column("yxx")
	private String yxx;
	@Column("fdm")
	private String fdm;
	@Readonly
	@Column("PX")
	private String px;

	public String getMc() {
		return mc;
	}
	public void setMc(String mc) {
		this.mc = mc;
	}
	public String getJc() {
		return jc;
	}
	public void setJc(String jc) {
		this.jc = jc;
	}
	public String getPym() {
		return pym;
	}
	public void setPym(String pym) {
		this.pym = pym;
	}
	public String getLy() {
		return ly;
	}
	public void setLy(String ly) {
		this.ly = ly;
	}
	public String getLx() {
		return lx;
	}
	public void setLx(String lx) {
		this.lx = lx;
	}
	public String getYxx() {
		return yxx;
	}
	public void setYxx(String yxx) {
		this.yxx = yxx;
	}
	public String getFdm() {
		return fdm;
	}
	public void setFdm(String fdm) {
		this.fdm = fdm;
	}
	public String getPx() {
		return px;
	}
	public void setPx(String px) {
		this.px = px;
	}
	public String getDm() {
		return dm;
	}
	public void setDm(String dm) {
		this.dm = dm;
	}
}
