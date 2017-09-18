package com.skynet.knowledge.action;

import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.cox.ioc.annotation.InjectName;
import org.cox.ioc.loader.annotation.Inject;
import org.cox.ioc.loader.annotation.IocBean;
import org.cox.log.Log;
import org.cox.log.Logs;
import org.cox.mvc.Mvcs;
import org.cox.mvc.annotation.At;
import org.cox.mvc.annotation.Ok;
import org.cox.mvc.annotation.Param;

import com.skynet.knowledge.bean.User;
import com.skynet.knowledge.services.UserService;
import com.skynet.watchdog.msg.Flag;
import com.skynet.watchdog.msg.Message;

@InjectName
@IocBean
@At(value = "/sysuser", name = "用户管理")
public class UserAction {
	
	private static Log logger = Logs.get();

	@Inject
	private UserService userService;


	@At(name = "用户注册初始页面")
	@Ok("jsp:/user/jsp/register.jsp")
	public Object goReg(HttpServletRequest req) {

		HashMap<String, Object> map = new HashMap<String, Object>();
		return map;
	}

	@At(name = "用户登录初始页面")
	@Ok("jsp:/user/jsp/login.jsp")
	public Object goLogin(HttpServletRequest req) {

		HashMap<String, Object> map = new HashMap<String, Object>();
		return map;
	}

	
	@At(name = "注册保存")
	@Ok("json")
	public Object register(@Param("::user") User user) {

		if (StringUtils.isEmpty(user.getName())||
				StringUtils.isEmpty(user.getPassword())||
				StringUtils.isEmpty(user.getIdcard())||
				StringUtils.isEmpty(user.getDept())){
			
			Message mg = new Message();
			mg.setFlag(Flag.error);
			mg.setResult(false);
			mg.setMsg("提交的注册信息不全,请检查后再提交!！");
			
			return mg;
			
		}
				
		
		if (userService.checkexist(user.getIdcard())){
			
			Message mg = new Message();
			mg.setFlag(Flag.error);
			mg.setResult(false);
			mg.setMsg("用户已经存在，请检查身份证号！");
			
			return mg;
		}
		
		user.setId(UUID.randomUUID().toString().replaceAll("-", ""));
		user.setRegDate(new Date());
		user.setIsadmin("0");
		
		userService.saveUser(user);
		
		Message mg = new Message();
		mg.setFlag(Flag.success);
		mg.setMsg("注册成功！");
		mg.setResult(true);
		mg.setData(user);
		return mg;
	}

	@At(name = "登录")
	@Ok("json")
	public Object login(@Param("uname") String username,
			@Param("passwd") String password, HttpServletRequest req) {

		Message mg = new Message();

		User user=userService.doLogin(username, password);
		if (user == null) {
			mg.setFlag(Flag.error);
			mg.setMsg("无效的账户密码!");
			return mg;
		}

		HttpSession session = req.getSession();
		session.setAttribute("user", user);
		// Record user = (Record) session.getAttribute("user");
		// BeanLoginUser us = user.toPojo(BeanLoginUser.class);
		mg.setFlag(Flag.success);
		mg.setMsg("登录成功！");
		mg.setResult(true);
		mg.setData(user);
		return mg;

	}
	
	

	@At(name = "登出")
	@Ok("json")
	public Object logout() {

		HttpSession session = Mvcs.getHttpSession();
		
		session.setAttribute("user", null);
		   
		Message mg = new Message();
        mg.setResult(true);
		mg.setFlag(Flag.error);
		mg.setMsg("成功退出系统!");
		return mg;
	}

}

