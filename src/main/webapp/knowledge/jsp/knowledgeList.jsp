<%@page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>执行情况</title>
<%@include file="/common/html/head.jsp"%>
<script src="knowledge/js/knowledgeList.js"></script>
<link rel="stylesheet"
	href="common/otherUIs/z-tree/css/zTreeStyle/zTreeStyle.css"
	type="text/css">
<script type="text/javascript"
	src="common/otherUIs/z-tree/jquery.ztree.all-3.5.js"></script>
<style type="text/css">
#grid_index a {
	cursor: pointer;
}
</style>
</head>
<body style="overflow-y: hidden;">
	<div class="widget-box skynetBox">
		<div>
			<div class="widget-box skynetBox">
				<div class="widget-content" style="min-height: 300px;">
					<table style="width: 100%;">
						<tbody>
							<tr>
								<td style="border-bottom: 0;">
									<form id="form">
										<div class="controls controls-row" style="margin-top: 5px;">

											<div class="span1" style="width: 50px; margin-top: 5px;">
												标题：</div>
											<div class="span1">
												<input type="text" name="title" value=""
													style="width: 80px; margin-left: -34px;" />
											</div>

											<div class="span1"
												style="width: 50px; margin-top: 5px; margin-left: -0px;">
												标签：</div>

											<div class="span1">
												<input type="text" name="tag" value=""
													style="margin-left: -35px; width: 80px;" />
											</div>

											<div class="span1"
												style="width: 80px; margin-top: 5px; margin-left: -0px;">
												类型：</div>
											<div class="span1" style="margin-left: -0px; width: 40px;">
												<select style="width: 80px;" name="type">
													<option value="0">不限</option>
													<option value="1">操作类</option>
													<option value="2">技术类</option>
												</select>
											</div>
											<div class="span1" style="width: 75px; margin-left: 50px;">
												<button id="btn_search" type="button"
													class="btn btn-primary icon-search">查询</button>
											</div>
										</form>
								</td>
							</tr>
							<tr>
								<td>
								   <div style="float: left;">
										   <button id="btn_add" type="button"  onclick="edit(-1)" class="btn btn-info icon-list-alt" onclick="location.href='question/showAdd'">新增</button>
								   </div>
								</td>	   
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="widget-content skynetBox"
			style="min-height: 300px; top: 50px; margin-top: 50px; border: 0px solid red;">
			<table style="width: 100%; border: 0px solid blue;">
				<tbody>
					<tr>
	
						<td>
							<div
								style="width: 100%; height: 100%; background-color: white; margin: 0 auto;">
								<table id="grid_index" style="width: 100%; height: 100%"></table>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</body>
</html>