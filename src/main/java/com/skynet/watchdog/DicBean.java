/**

 * @Title: DicBean.java

 * @Package com.skynet.inspect.console.config.toolkets

 * @Description: TODO

 * Copyright: Copyright (c) 2014 

 * Company:昆明世科计算机网络有限公�?

 * 

 * @author Comsys-tanfaquan

 * @date 2014�?6�?5�? 上午10:48:34

 * @version V1.0

 */


package com.skynet.watchdog;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Table;

@Table("PM_CODE")
public class DicBean {
	@Column("dm")
	private String dm;
	@Column("mc")
	private String mc;
	@Column("jc")
	private String jc;
	@Column("lx")
	private String lx;
	@Column("pdm")
	private String pdm;
	public String getDm() {
		return dm;
	}
	public void setDm(String dm) {
		this.dm = dm;
	}
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
	public String getLx() {
		return lx;
	}
	public void setLx(String lx) {
		this.lx = lx;
	}
	public String getPdm() {
		return pdm;
	}
	public void setPdm(String pdm) {
		this.pdm = pdm;
	}
	
}
