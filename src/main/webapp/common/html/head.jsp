<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%
response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
response.setHeader("Pragma","no-cache"); //HTTP 1.0
response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/"; %>
<base href="<%=basePath%>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-store" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<link rel="icon" type="text/css" href="favicon.ico" mce_href="favicon.ico" type="image/x-icon">
<link rel="shortcut icon" type="text/css" href="favicon.ico" mce_href="favicon.ico" type="image/x-icon">
<link rel="stylesheet" href="skin/css/matrix-style.css" />
<script type="text/javascript" src="common/js/jquery-1.8.3.js"></script>
<script type="text/javascript" src="common/js/ui/skynetUI.js"></script>