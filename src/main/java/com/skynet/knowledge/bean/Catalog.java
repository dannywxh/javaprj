package com.skynet.knowledge.bean;

import java.util.Date;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Name;
import org.cox.dao.entity.annotation.Table;

@Table("km_catalog")
public class Catalog {

	private static final long serialVersionUID = -5542222494255045489L;

	@Column("id")
	@Name
	private String id;// id

	@Column("pid")
	private String pid;// 父id

	@Column("name")
	private String name;// 名称

	@Column("creator")
	private String creator;// 整理人
	
	@Column("createdate")
	private Date createdate;// 整理日期

	@Column("creatorip")
	private String creatorip;// 整理人ip
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public Date getCreatedate() {
		return createdate;
	}

	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}

	public String getCreatorip() {
		return creatorip;
	}

	public void setCreatorip(String creatorip) {
		this.creatorip = creatorip;
	}


	



}
