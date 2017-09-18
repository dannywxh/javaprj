<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<style>
.quick-actions {
	display: block;
	list-style: none outside none;
	text-align: center;
}
				
.quick-actions li {
	min-width: 12%;
	min-height: 70px;
}

.quick-actions_homepage {
	width: 100%;
	text-align: center;
	position: relative;
	float: left;
	margin-top: 0px;
}
</style>
<div class="quick-actions_homepage">
	<ul class="quick-actions">
	        <li class="bg_lb" data-pagename="zygl">
	        	<a href="sys/rsc/rscIndex"> 
	        		<i class="icon-globe"></i> 
	        		 资源管理
	        	</a>
	        </li>
	        <li class="bg_ly" data-pagename="qxgl">
	        	<a href="sys/power/powerIndex">
	        		<i class="icon-key"></i>
	             	权限管理
	            </a>
	        </li>
	        <li class="bg_lo" data-pagename="jsgl">
	        	<a href="sys/role/roleIndex">
	        		<i class="icon-unlock"></i> 
	        		角色管理
	        	</a>
	        </li>
	        <li class="bg_lv" data-pagename="yhgl">
	        	<a href="sys/user/userIndex">
	        		<i class="icon-user"></i> 
	        		用户管理
	        	</a>
	        </li>
	        <li class="bg_ls" data-pagename="bmgl">
	        	<a href="dept/list">
	        		<i class="icon-home"></i> 
	        		部门管理
	        	</a>
	        </li>
	        <li class="bg_lg" data-pagename="gwgl">
	        	<a href="post/list">
	        		<i class="icon-sitemap"></i> 
	        		岗位管理
	        	</a>
	        </li>
	        <li class="bg_hl" data-pagename="mxgl">
	        	<a href="modelManage/showModelList">
	        		<i class="icon-table"></i> 
	        		模型管理
	        	</a>
	        </li>
	    </ul>
	    <input id="_pageName" type="hidden" value="<%= request.getParameter("_pageName") %>">
	    <script type="text/javascript">
	    	$(function(){
	    		var pn=$('#_pageName').val();
	    		if(pn){
	    			$('.quick-actions li[data-pagename="'+pn+'"]>a')
	    			.append('<div style="position: absolute;width: 0px;height: 0px;border: 10px solid transparent;border-bottom-color: white;line-height: 0;border-top: 0;left: 45%;"></div>');
	    		}
	    	});
	    </script>
</div>