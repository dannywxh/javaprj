package com.skynet.knowledge.bean;

import java.io.FileInputStream;

/*
 *  问题模块的附件 
 */


import java.io.Serializable;
import java.util.Date;

import org.cox.dao.entity.annotation.ColDefine;
import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Name;
import org.cox.dao.entity.annotation.Table;
@Table("KM_ATTACHMENT")	
public class Attachment implements Serializable {
	private static final long serialVersionUID = 1L;
	@Column("glid")
	private String glid;//,字符长度:40
	@Column("fjmc")
	private String fjmc;//,字符长度:256
	@Column("fjhzm")
	private String fjhzm;//,字符长度:10
	@Column("fjnr")
	private FileInputStream fjnr;//
	@Column("guid")
	@Name
	private String guid;//,字符长度:36,默认值：sys_guid() 
	@Column("fjlx")
	private String fjlx;//,字符长度:200
	@Column("wjdx")
	private Long wjdx;//
	@Column("rksj")
	@ColDefine(insert=false)
	private Date rksj;//,默认值：sysdate 

	
	public void setFjmc(String fjmc){
		this.fjmc=fjmc;
	}
	public String getFjmc(){
		return fjmc;
	}
	public void setFjhzm(String fjhzm){
		this.fjhzm=fjhzm;
	}
	public String getFjhzm(){
		return fjhzm;
	}

	
	
	public String getGlid() {
		return glid;
	}
	public void setGlid(String glid) {
		this.glid = glid;
	}
	public FileInputStream getFjnr() {
		return fjnr;
	}
	public void setFjnr(FileInputStream fjnr) {
		this.fjnr = fjnr;
	}
	public void setGuid(String guid){
		this.guid=guid;
	}
	public String getGuid(){
		return guid;
	}
	public void setFjlx(String fjlx){
		this.fjlx=fjlx;
	}
	public String getFjlx(){
		return fjlx;
	}
	public void setWjdx(Long wjdx){
		this.wjdx=wjdx;
	}
	public Long getWjdx(){
		return wjdx;
	}
	public void setRksj(Date rksj){
		this.rksj=rksj;
	}
	public Date getRksj(){
		return rksj;
	}
}
