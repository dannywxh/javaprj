<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title></title>
<%@include file="/common/html/head.jsp"%>
<link rel="stylesheet"
	href="common/otherUIs/z-tree/css/zTreeStyle/zTreeStyle.css"
	type="text/css">
<link rel="stylesheet" href="common/css/style.css" type="text/css">
<script type="text/javascript"
	src="common/otherUIs/z-tree/jquery.ztree.all-3.5.js"></script>
<script type="text/javascript" src="user/js/register.js"></script>
</head>
<body>
<div class="widget-box" style = "margin-top: 0px;margin-bottom: 0px;">
        <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
          <h5>个人注册信息</h5>1`
        </div>
        <div class="widget-content nopadding">
          <form id="registerForm" class="form-horizontal">
            <div class="control-group">
              <label class="control-label inputfont">用户名称：</label>
              <div class="controls">
              	<input id="xm" type="text" name="user.name" >
              </div>
            </div>
            <div class="control-group">
              <label class="control-label inputfont">所属部门：</label>
              <div class="controls">
                <input id="dwmc" type="text" name="user.dept"  >
              </div>
            </div>
            <div class="control-group">
              <label class="control-label inputfont">身份证：</label>
              <div class="controls">
             	<input id="account" type="text" name="user.idcard" >
              </div>
            </div>
            
            <div class="control-group">
              <label class="control-label inputfont">警官证：</label>
              <div class="controls">
             	<input id="account" type="text" name="user.pno" >
              </div>
            </div>
            
            <div class="control-group">
              <label class="control-label inputfont">联系电话：</label>
              <div class="controls">
             	<input id="account" type="text"  placeholder="请输入联系电话" name="user.phone" >
              </div>
            </div>
            
            <div class="control-group">
              <label class="control-label inputfont">密码：</label>
              <div class="controls">
                <input id="psw" type="password" placeholder="请输入新密码！"><span style="color: red;">*至少为6个字符</span>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label inputfont">确认密码：</label>
              <div class="controls">
              	<input id="confirmPsw" type="password" name="user.password" placeholder="请再次输入密码！"><span
													style="color: red;">*</span>
              </div>
            </div>
			<div align="center">
				<br>
				<button type="button" class="btn btn-success icon-save" onclick="register()">保存</button>
				<a  class="btn btn-danger icon-arrow-left" onclick="skynetDialog.close();">取消</a>
			</div>
			<input type="hidden" id="id" name="u.id" value="${obj.u.id}">
			<div align="center">
				<br>
			</div>
          </form>
        </div>
      </div>
</body>
</html>