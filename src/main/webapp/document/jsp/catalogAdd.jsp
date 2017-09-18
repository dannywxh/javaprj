<%@page language="java" pageEncoding="UTF-8"%>


<%-- <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> --%>

<%-- <%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> --%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>新增目录</title>
<%@include file="/common/html/head.jsp"%>
<link rel="stylesheet" href="common/css/style.css" type="text/css">

<script type="text/javascript" src="common/js/validata.js"></script>

<script type="text/javascript" src="document/js/catalogAdd.js"></script>

<%
    String cid=(String)request.getParameter("cid");
%>
</head>
<body >

    <div class="widget-content nopadding " >
        	 <input id = "pid" name = "pid" type="hidden" value="<%=cid %>">
            <div class="control-group">
              <label class="control-label inputfont">目录名称：</label>
              <div class="controls">
              	<input id="name" type="text" name="name"  >
              </div>
            </div>
            
			<input type="button" onclick="savenode()" class="btn btn-success icon-save" value="新增" />
	</div>
</body>
</html>
