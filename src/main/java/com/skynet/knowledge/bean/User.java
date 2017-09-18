package com.skynet.knowledge.bean;

import java.util.Date;

import org.cox.dao.entity.annotation.Column;
import org.cox.dao.entity.annotation.Name;
import org.cox.dao.entity.annotation.Table;

@Table("km_user")
public class User {

	private static final long serialVersionUID = -5542222494255045489L;

	@Column("id")
	@Name
	private String id;// id

	@Column("name")
	private String name;// 姓名

	@Column("password")
	private String password;// 

	@Column("idcard")
	private String idcard;// idcard

	@Column("pno")
	private String pno;// 警号

	@Column("dept")
	private String dept;// 机构

	@Column("phone")
	private String phone;// 联系电话

	@Column("memo")
	private String memo;// 备注

	@Column("regDate")
	private Date regDate;// 注册日期

	@Column("isadmin")
	private String isadmin;// 管理员

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

	public String getIdcard() {
		return idcard;
	}

	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}

	public String getPno() {
		return pno;
	}

	public void setPno(String pno) {
		this.pno = pno;
	}

	public String getDept() {
		return dept;
	}

	public void setDept(String dept) {
		this.dept = dept;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getIsadmin() {
		return isadmin;
	}

	public void setIsadmin(String isadmin) {
		this.isadmin = isadmin;
	}
	
	
}
