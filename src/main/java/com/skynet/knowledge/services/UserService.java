package com.skynet.knowledge.services;

import java.util.List;

import org.cox.dao.Cnd;
import org.cox.dao.Dao;
import org.cox.ioc.loader.annotation.Inject;
import org.cox.ioc.loader.annotation.IocBean;

import com.skynet.knowledge.bean.User;

@IocBean
public class UserService {

	/**
	 * 数据库操作dao
	 */
	@Inject
	protected Dao dao;


	public User doLogin(String uname,String passwd){
		
		List<User> user = dao.query(User.class, Cnd.where("idcard", "=", uname).and("password", "=", passwd));
		
		if ((user==null)||(user.size()==0)){
			return null;
		}
		return user.get(0);
	}
	
	public boolean checkexist(String idcard){

		List<User> user = dao.query(User.class, Cnd.where("idcard", "=", idcard));
		
		if (user.size()>0){
			return true;
		}
		
		return false;
	}
	
	public void saveUser(User user){
		
		dao.insert(user);
		
	}
}
