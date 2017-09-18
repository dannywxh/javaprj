<%@page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>文档列表</title>
<%@include file="/common/html/head.jsp"%>

<link rel="stylesheet"
	href="common/otherUIs/z-tree/css/zTreeStyle/zTreeStyle.css"
	type="text/css">
<link rel="stylesheet" type="text/css" href="common/xUi/css/xUi.css">
<link rel="stylesheet" type="text/css"	href="common/xUi/css/xUiRadius.css">
<link rel="stylesheet" type="text/css"	href="common/xUi/css/defaultColor.css">
<link rel="stylesheet" type="text/css"	href="common/xUi/css/font/font-awesome.css">
<script type="text/javascript"	src="common/otherUIs/z-tree/jquery.ztree.all-3.5.js"></script>
<script type="text/javascript" src="common/js/validata.js"></script>
<script type="text/javascript" src="common/xUi/js/Underscore.js"></script>
<script type="text/javascript" src="common/xUi/js/jquery-ui.js"></script>
<script type="text/javascript" src="common/xUi/js/events.js"></script>
<script src="document/js/documentList.js"></script>

<style type="text/css">
#grid_index a {
	cursor: pointer;
}
</style>
</head>
<body class="innerPage">

	<div class="widget-box skynetBox">

		<div class="widget-content skynetBox" style="min-height: 300px;">
			<table  style="width: 100%;">
				<tbody>
					<tr>
						<td style="height: 80px; border-bottom: 0;">
							<form>
								<div class="controls controls-row" style="margin-top: 5px;">
									<div class="span1" style="width: 300px; margin-left: 0px;">
										<div id="testCaseTree" class="span12" data-skynetTree
											style="width: 100%; height: 30px;" data-sname="csyl"
											></div>
									</div>
									<div class="span1" style="width: 75px; margin-top: 5px;">
										文档名称：</div>
									<div class="span1">
										<input type="text" name="docname" value=""
											style="width: 80px; margin-left: -34px;" />
									</div>
									<div class="span1"
										style="width: 50px; margin-top: 5px; margin-left: -1px;">
										版本：</div>
									<div class="span1">
										<input type="text" name="version" value=""
											style="margin-left: -35px; width: 80px;" />
									</div>
								
									<div class="span1" style="width: 75px; margin-left: 50px;">
										<button id="btn_search" type="button"
											class="btn btn-primary icon-search">查询</button>
									</div>
								</div>
								<div class="controls controls-row"
									style="margin-top: 5px; margin-left: 30px; margin-bottom: 10px;">

								</div>
							</form>
						</td>
					</tr>
					<tr valign="top">
						<td valign="top">
							<div
								style="width: 100%; height: 100%; background-color: white; margin: 0 auto;">
								<table style="width: 100%; height: 100%;">
									<tbody>
										<tr>
											<td style="width: 20%;height: 582px;">
											   <div style="float: left;">
	
                                                   <button id="btn_new1" type="button" class="btn btn-primary icon-comments-alt" onclick='addnodeForm()'>增加子目录</button>
<!--      											<button id="btn_new" type="button" class="btn btn-primary icon-comments-alt" onclick='opendlg()'>增加</button>  -->
<!-- 												<button id="btn_edit" type="button" class="btn btn-primary icon-comments-alt" onclick='editnode()'>修改</button> -->
													<button id="btn_refresh" type="button" class="btn btn-primary icon-comments-alt" onclick='refreshTree()'>刷新</button> 												   
												   

												</div>
												
												<div
													style=" top: 0; left: 0; right: 0; bottom: 0; padding: 1px; width: 250px;height: 100%;">
													<div 
														style="width: 100%; height: 92%; border: none; margin-top: 45px; border: 1px solid #ccc;">
													
													     <ul id="catalog" class="ztree""></ul>
													     	
														</div>
												</div>

											</td>
											<td>
											
											   <div style="float: left;">
												   <button id="btn_new" type="button" class="btn btn-primary icon-comments-alt" onclick='showEdit("${obj.id}","")'>增加文件</button>
												</div>
					  				  	
											   <div id="grid_index"
													style="width: 100%; height: 100%"
													onselectstart='return true'>
											   </div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>


</body>
</html>