package com.skynet.knowledge.bean;

import java.util.Date;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Name;
import org.cox.dao.entity.annotation.Table;

@Table("km_question")
public class Question {

	private static final long serialVersionUID = -5542222494255045489L;

	@Column("id")
	@Name
	private String id;// 消息id

	@Column("title")
	private String title;// 消息内容

	@Column("content")
	private String content;// 详细描述

	@Column("creator")
	private String creator;// 整理人

	@Column("creatorname")
	private String creatorname;// 整理人名字
	
	@Column("createdate")
	private Date createdate;// 整理日期

	@Column("replycount")
	private int replycount;// 回复次数
	
	@Column("lastreplier")
	private int lastreplier;// 最后回复人
	
	@Column("lastreplydate")
	private Date lastreplydate;// 最后回复日期
	
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

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
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

	public String getCreatorname() {
		return creatorname;
	}

	public void setCreatorname(String creatorname) {
		this.creatorname = creatorname;
	}

	public int getReplycount() {
		return replycount;
	}

	public void setReplycount(int replycount) {
		this.replycount = replycount;
	}

	public int getLastreplier() {
		return lastreplier;
	}

	public void setLastreplier(int lastreplier) {
		this.lastreplier = lastreplier;
	}

	public Date getLastreplydate() {
		return lastreplydate;
	}

	public void setLastreplydate(Date lastreplydate) {
		this.lastreplydate = lastreplydate;
	}



}
