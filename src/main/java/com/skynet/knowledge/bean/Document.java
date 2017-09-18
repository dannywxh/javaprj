package com.skynet.knowledge.bean;

import java.util.Date;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Name;
import org.cox.dao.entity.annotation.Table;

@Table("km_doc")
public class Document {

	private static final long serialVersionUID = -5542222494255045489L;

	@Column("id")
	@Name
	private String id;// id

	@Column("cid")
	private String cid;// 父id

	@Column("name")
	private String name;// 名称

	@Column("creator")
	private String creator;// 整理人
	
	@Column("createdate")
	private Date createdate;// 整理日期

	@Column("creatorip")
	private String creatorip;// 整理人ip
	
	@Column("docno")
	private String docno;// 文档编号
	
	@Column("version")
	private String version; // 版本
	
	@Column("keyword")
	private String keyword;// 关键词
	
	@Column("path")
	private String path; // 存储路径
	
	@Column("ContentType")
	private String ContentType; // 文件类型

	@Column("fileExt")
	private String fileExt; // 文件扩展名

	
	@Column("memo")
	private String memo; // 说明
	
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public String getDocno() {
		return docno;
	}

	public void setDocno(String docno) {
		this.docno = docno;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getContentType() {
		return ContentType;
	}

	public void setContentType(String contentType) {
		ContentType = contentType;
	}

	public String getFileExt() {
		return fileExt;
	}

	public void setFileExt(String fileExt) {
		this.fileExt = fileExt;
	}

	



}
