<%@ page language="java" contentType="text/html; charset=UTF-8" 
import="org.cox.lang.*" 
import="com.skynet.watchdog.utils.Util"
import="com.skynet.watchdog.config.AuthorityConfig" 
import="com.skynet.watchdog.config.ConfigManager" 
import="com.skynet.watchdog.sys.bean.BeanLoginUser" 
pageEncoding="UTF-8"%>
<%
	AuthorityConfig authorityConfig = ConfigManager.getInstance().getAuthorityConfig();
    Object obj = request.getSession().getAttribute(authorityConfig.AttributeName);
	if(!Lang.isEmpty(obj)){
	    String project=request.getContextPath();
	    if(Strings.isBlank(project)){
	    	project="/"+request.getServletContext().getServletContextName();
	    }
	    String hostAddr = "http://" + Util.getServerIp(request) + ":" + Util.getServerPort(request) + project;
	    //response.sendRedirect(hostAddr);
	  //  return;
	}
%>
<!DOCTYPE html>
<html>
<head>
    <title>问题发布平台</title>
    <%@include file="/common/html/head.jsp"%>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="skin/css/matrix-style.css"/>
    <link rel="stylesheet" href="skin/css/matrix-media.css"/>
    <link rel="stylesheet" href="skin/css/matrix-login.css"/>
    
    <script src="skin/js/matrix.js"></script>
    <script src="user/js/login.js"></script>
</head>
<body>
<form action="" method="post">
<div id="loginbox">
	<div class="control-group normal_text"><h3><img src="skin/img/logogai.png" style="position: absolute;top: 0px;left: 25px;"><span style="font-size: 20px;color: white;font-family: '微软雅黑';position: absolute;top: 0px;left: 85px;">问题提问平台</span></h3></div>
	<div class="control-group">
	    <div class="controls">
	        <div class="main_input_box">
	            <span class="add-on bg_lg"><i class="icon-user"></i></span><input name="uname" type="text" placeholder="请输入身份证号"/>
	        </div>
	    </div>
	</div>
	<div class="control-group">
	    <div class="controls">
	        <div class="main_input_box">
	            <span class="add-on bg_ly"><i class="icon-lock"></i></span><input name="passwd" type="password" placeholder="请输入密码"/>
	        </div>
	    </div>
	</div>
	<div style="text-align: center;">
	    <button id="toReg" type="button" class="btn btn-success">注册</button>
		<button id="loginIn" type="button" class="btn btn-success">登录</button>
	</div>
</div>
</form>
</body>
</html>