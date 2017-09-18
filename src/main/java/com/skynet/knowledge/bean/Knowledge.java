package com.skynet.knowledge.bean;

import java.util.Date;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Name;
import org.cox.dao.entity.annotation.Table;

@Table("km_zsk")
public class Knowledge {

	private static final long serialVersionUID = -5542222494255045489L;

	@Column("id")
	@Name
	private String id;// 消息id
	
	@Column("title")
	private String title;// 消息内容
	
	@Column("type")
	private String type;// 知识分类 
	
	@Column("content")
	private String content;// 详细描述

	@Column("tag")
	private String tag;// 标签

	@Column("creator")
	private String creator;// 整理人

	@Column("createdate")
	private Date createdate;// 整理日期

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
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

	
	
}
