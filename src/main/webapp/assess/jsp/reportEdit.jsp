<%@page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>周报编辑</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@include file="/common/html/head.jsp"%>
<link rel="stylesheet" type="text/css" href="common/otherUIs/z-tree/css/zTreeStyle/zTreeStyle.css" />
<script type="text/javascript" src="common/otherUIs/z-tree/jquery.ztree.all-3.5.js"></script>
<script type="text/javascript" src="assess/js/report.js"></script>
</head>
<body style="background: none;">
	<div class="row-fluid">
		<form id="editReportForm" method="post" action="report/save"
			class="form-horizontal">
			<div class="widget-box">
				<div class="widget-content">
					<div class="control-group">
						<label class="control-label">项目名称：</label>
						<div class="controls">
							<input type="text" class="span11" readonly="readonly"
								name="report.bt" value="${obj.bt}" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">项目状态：</label>
						<div class="controls">
							<input type="text" class="span11" 
								name="report.zt" value="${obj.zt}" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">上周计划：</label>
						<div class="controls">
							<textarea class="span11" rows="2" cols="50" name="report.szjh"
								placeholder="请输入上周计划...">${obj.szjh}</textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">上周工作：</label>
						<div class="controls">
							<textarea class="span11" rows="2" cols="50" name="report.szgz"
								placeholder="请输入上周工作...">${obj.szgz}</textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">本周工作：</label>
						<div class="controls">
							<textarea class="span11" rows="2" cols="50" name="report.bzgz"
								placeholder="请输入本周工作...">${obj.bzgz}</textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">近期目标：</label>
						<div class="controls">
							<textarea class="span11" rows="2" cols="50" name="report.jqmb"
								placeholder="请输入近期目标...">${obj.jqmb}</textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">评价：</label>
						<div class="controls">
							<input type="text" class="span11" name="report.pj"
								value="${obj.pj}"  placeholder="请输入评价..." />
						</div>
					</div>
					<div class="control-group" align="center">
						<input type="hidden" name="report.id" value="${obj.id}"> <input
							type="hidden" name="report.zxr" value="${obj.zxr}"> <input
							type="hidden" name="report.bblx" value="${obj.bblx}"> <input
							type="hidden" name="report.xh" value="${obj.xh}"> <input
							type="hidden" name="report.rksj" value="${obj.rksj}"> <input
							type="hidden" name="report.xmid" value="${obj.xmid}">
						<button type="button" class="btn btn-success icon-save"
							onclick="save();">保存</button>
						<a class="btn btn-danger icon-arrow-left"
							onclick="skynetDialog.close();">取消</a>
					</div>

				</div>
				<!-- 隐藏字段 -->
		</form>
	</div>
</body>
</html>