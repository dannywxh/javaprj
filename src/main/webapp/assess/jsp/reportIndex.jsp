<%@page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>工作周报</title>
<%@include file="/common/html/head.jsp" %>
<script type="text/javascript" src="assess/js/report.js"></script>
<style type="text/css">
  #grid a{
   cursor: pointer;
  }
</style>
</head>
<body class="innerPage">
	<div class="widget-box skynetBox">
    	<div class="widget-title">
			<span class="icon"><i class="icon-file"></i></span>
         	<h5>任务列表</h5>
     	</div>
	    <div class="widget-content skynetBox" style="min-height: 300px;top: 37px;">
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
        									<span id="xs" class="text">周报</span> 
        									<input type="hidden"  name="cycle"  value="weeks"/>      		
        									<b class="caret"></b>
        									</a>
            							<ul class="dropdown-menu" >
            								<li><a style="cursor: pointer;" onclick="initQuery('周报','weeks');"><i class="icon-th"></i>周报</a></li>                 
                							<li class="divider"></li>               
                							<!--<li><a style="cursor: pointer;" onclick="initQuery('月报','months');" ><i class="icon-th"></i>月报</a></li>  
                							<li class="divider"></li>               
                							<li><a style="cursor: pointer;" onclick="initQuery('季报','season');" ><i class="icon-th"></i>季报</a></li>  
                							<li class="divider"></li>               
                							<li><a style="cursor: pointer;" onclick="initQuery('年报','years');" ><i class="icon-th"></i>年报</a></li> -->                      
            							</ul>
        								</li>
       								</ul>
					    		</div>   
					    		<div class="span2"  style="width:200px;" id="input_query">
									<input type="date" class="form-control" name="query_key"  min="2016-03-01" max="2116-03-01"/>
					    		</div>   									    	
					    		<div class="span2"   style="width:200px;">
					    			<button id="btn_search" type="button" class="btn btn-primary icon-search">查询</button>
					    			<button id="btn_export"	type="button" class="btn btn-success icon-arrow-down" >导出</button>
					    		</div>
					    		</div>			
					    </form>						    	
						</td>
					</tr>				
					<tr>
						<td>
						 	<div style="width: 100%;height: 100%;background-color: white;margin: 0 auto;">
					    		<table id="grid" style="width: 100%;height: 100%"></table>
					    	</div>
						</td>
					</tr>
				</tbody>
			</table>
	    </div>
	</div>
</body>
