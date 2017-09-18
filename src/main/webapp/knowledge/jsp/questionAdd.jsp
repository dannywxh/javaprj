<%@page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>发布新贴</title>
<%@include file="/common/html/head.jsp"%>
<link rel="stylesheet" href="common/css/style.css" type="text/css">
<script type="text/javascript" src="rw/js/validata.js"></script>
<script type="text/javascript" src="knowledge/js/questionAdd.js"></script>
<script src="xhEditor/xheditor-1.2.2.min.js"></script>
<script src="xhEditor/xheditor_lang/zh-cn.js"></script>
</head>
<body class="innerPage">
	<div class="widget-box skynetBox">
		<form id="discuzForm" enctype="multipart/form-data">
		        <div class="widget-title"><span class="icon"> <i class="icon-align-justify"></i> </span>
		            <h5>发布新贴</h5>
		        </div>
		        <div class="widget-content">
					<table style="width: 100%;">
						<tbody>
						<tr>
							<td style="width: 10%;" align="right">
								<label class="control-label"><font color="red">*</font>标题:</label>
							</td>
							<td colspan="3">
								<input id = "qstitle" name = "question.title" maxlength="30" class="form-control"  style="width: 98.8%;" required="required" type="text" class="inputfont" value="">
							</td>
						</tr>
						<tr>
							<td style="width: 10%;" align="right">
								<label class="control-label"><font color="red">*</font>内容:</label>
							</td>
							<td colspan="3">
					        	<textarea name = "question.content" class="xheditor-simple" rows="20" style="width: 100%"></textarea>
							</td>
						</tr>

						<tr>
							<td style="padding:10px 0px;text-align: center;" colspan="4">
								<button type="button" class="btn btn-primary icon-save" onclick="save();">保存</button>
                				<button type="button" class="btn btn-danger icon-arrow-left" onclick="javascript:history.go(-1);">返回</button>
							</td>
						</tr>
						</tbody>
					</table>
		        </div>
		</form>
	</div>
</body>
</html>