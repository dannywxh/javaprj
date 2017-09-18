﻿<%@page language="java" pageEncoding="UTF-8"%>
<%-- <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> --%>
<%-- <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> --%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>问题列表1</title>
<%@include file="/common/html/head.jsp"%>
<link rel="stylesheet" href="common/css/style.css" type="text/css">
<script type="text/javascript" src="knowledge/js/questionIndex.js"></script>
<script src="xhEditor/xheditor-1.2.2.min.js"></script>
<script src="xhEditor/xheditor_lang/zh-cn.js"></script>
<style type="text/css">
</style>
</head>
<body class="innerPage" style="background-color: white;">
	<div class="widget-box skynetBox">
	    <div class="widget-content skynetBox" style="padding: 6px 0px;">
			<table  style="width: 100%;">
				<tbody>
					<tr>
						<td style="height: 80px;border-bottom: 0;">
						<form >				    
					    		<div class="controls controls-row" style="margin-top: 5px;">					    		
					    		<div class="span1" style="width:100px;">
									<ul class="nav" style="margin-top: 5px;">
		 								<li class="dropdown" >
        									<a data-toggle="dropdown" class="dropdown-toggle">
        									<i class="btn-primary icon-ok"></i> 
        									<span id="xs" class="text">帖子</span> 
   											<input type="hidden"  name="query_type"  value="tz"/>
        									<b class="caret"></b>
        									</a>
            							<ul class="dropdown-menu" >
            							    <li><a onclick="initQuery('帖子','tz');"><i class="icon-th"></i>帖子</a></li>
            							    <li class="divider"></li>   
            								<li><a onclick="initQuery('用户','hy');"><i class="icon-th"></i>用户</a></li>         
            							</ul>
        								</li>
       								</ul>
					    		</div>   
					    		<div class="span2"  style="width:200px;">
									<input type="text" class="form-control" name="query_key"  value="${obj.data.key}"/>
					    		</div>   									    	
					    		<div class="span2"   style="width:200px;">
					    			<button id="btn_search" type="button" class="btn btn-primary icon-search">查询</button>
					    		</div>
					    		</div>
					    		<div class="form-row"   style="padding-left: 5px;padding-right: 5px;">
					    			<div style="float: left;display: inline-block;height: 100%; margin-top:10px;">
						    			<div class="form-control">
						    			</div>		
					    			</div>
									<div style="float: right;display: inline-block;height: 100%">
										 <button id="btn_add" type="button" class="btn btn-info icon-list-alt" onclick="location.href='question/showAdd';">发帖</button>

	                                     <button id="btn_sy" type="button" class="btn btn-danger icon-arrow-left" onclick="history.go(-1);">返回</button>
					    			</div>
								</div>
					    </form>						    	
						</td>
					</tr>		
					<tr>
						<td>
						 	<div style="width: 100%;height:100%;background-color: white;margin: 0 auto;" >
					    		<table id="grid_index" style="width: 100%;height: 100%"></table>
					    		<c:if test='${obj.data["id"] != null}'>
											<input type = "hidden" id='discuzbk' name="discuz.bk" value="${obj.data.id}">
								</c:if>
					    	</div>
						</td>
					</tr>					
				</tbody>
			</table>
	    </div>
	</div>
</body>
</html>