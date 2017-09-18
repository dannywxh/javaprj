package com.skynet.knowledge.bean;

import java.util.Date;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Name;
import org.cox.dao.entity.annotation.Table;

@Table("km_reply")
public class Reply {

	private static final long serialVersionUID = -5542222494255045489L;

	@Column("id")
	@Name
	private String id;// 消息id
	
	@Column("qid")
	private String qid;// question id

	@Column("content")
	private String content;// 回复内容

	@Column("replierid")
	private String replierid;// 回复人

	@Column("repliername")
	private String repliername;// 回复人
	
	@Column("replydate")
	private Date replydate;// 回复日期

	@Column("replyip")
	private String replyip; // 回复IP

	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getQid() {
		return qid;
	}

	public void setQid(String qid) {
		this.qid = qid;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	
	public String getReplierid() {
		return replierid;
	}

	public void setReplierid(String replierid) {
		this.replierid = replierid;
	}

	public String getRepliername() {
		return repliername;
	}

	public void setRepliername(String repliername) {
		this.repliername = repliername;
	}

	public Date getReplydate() {
		return replydate;
	}

	public void setReplydate(Date replydate) {
		this.replydate = replydate;
	}

	public String getReplyip() {
		return replyip;
	}

	public void setReplyip(String replyip) {
		this.replyip = replyip;
	}



	

}
