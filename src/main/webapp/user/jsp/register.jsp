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

<style type="text/css">
.col-center-block{
 float:none;
 display:block;
 margin-left:auto;
 margin-right:auto;
 width:800px;
}
</style>
<body>
<div  class="widget-box col-center-block" style = "margin-top: 0px;margin-bottom: 0px; ">
			<div align="center">
				<br>
			</div>
        <div class="widget-title col-center-block"> <span class="icon"> <i class="icon-align-justify"></i> </span>
          <h5>个人注册信息</h5>
        </div>
        <div class="widget-content nopadding " >
          <form id="registerForm" class="form-horizontal" method="post">
            <div class="control-group">
              <label class="control-label inputfont">用户名称：</label>
              <div class="controls">
              	<input id="name" type="text" name="user.name" >
              </div>
            </div>
            <div class="control-group">
              <label class="control-label inputfont">所属单位：</label>
              <div class="controls">
                <input id="dept" type="text" name="user.dept"  >
              </div>
            </div>
            <div class="control-group">
              <label class="control-label inputfont">身份证：</label>
              <div class="controls">
             	<input id="idcard" type="text" name="user.idcard" >
              </div>
            </div>
            
            <div class="control-group">
              <label class="control-label inputfont">警官证：</label>
              <div class="controls">
             	<input id="pno" type="text" name="user.pno" >
              </div>
            </div>
            
            <div class="control-group">
              <label class="control-label inputfont">联系电话：</label>
              <div class="controls">
             	<input id="phone" type="text"  placeholder="请输入联系电话" name="user.phone" >
              </div>
            </div>
            
            <div class="control-group">
              <label class="control-label inputfont">密码：</label>
              <div class="controls">
                <input id="psw" type="password" placeholder="请输入密码！" name='user.password'>
<!--                 <span style="color: red;">*至少为6个字符</span> -->
              </div>
            </div>
            <div class="control-group">
              <label class="control-label inputfont">确认密码：</label>
              <div class="controls">
              	<input id="confirmpsw" type="password" name="confirmPsw" placeholder="请再次输入密码！">
<!--               	<span style="color: red;">*</span> -->
              </div>
            </div>
			<div align="center">
				<br>
				<input type="submit" class="btn btn-success icon-save" value="注册" />
<!-- 				<a  class="btn btn-danger icon-arrow-left" onclick="skynetDialog.close();">取消</a> -->
			</div>

			<div align="center">
				<br>
			</div>
			
          </form>
        </div>
      </div>
</body>
</html>