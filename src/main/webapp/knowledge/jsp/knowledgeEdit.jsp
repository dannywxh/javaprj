<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title></title>
<%@include file="/common/html/head.jsp"%>

<link rel="stylesheet" href="common/css/style.css" type="text/css">
<script type="text/javascript" src="rw/js/validata.js"></script>
<script type="text/javascript" src="knowledge/js/knowledgeEdit.js"></script>
<script src="xhEditor/xheditor-1.2.2.min.js"></script>
<script src="xhEditor/xheditor_lang/zh-cn.js"></script>
</head>

<body>

	<div class="widget-box skynetBox">
		<form id="discuzForm" enctype="multipart/form-data">
		        <div class="widget-content">
		           <input id = "kid" name = "knowledge.id" type="hidden"  value="${obj.id}">
					<table style="width: 100%;">
						<tbody>
						<tr>
							<td style="width: 10%;" align="right">
								<label class="control-label"><font color="red">*</font>标题:</label>
							</td>
							<td colspan="3">
								<input id = "ktitle" name = "knowledge.title" value="${obj.title}" class="form-control"  style="width: 98.8%;" required="required" type="text" class="inputfont" value="">
							</td>
						</tr>
						
						<tr>
							<td style="width: 10%;" align="right">
								<label class="control-label"><font color="red">*</font>类型:</label>
							</td>
							<td colspan="3">
							
								<select name="knowledge.type">
									<option value="1">操作类</option>
									<option value="2">技术类</option>
									<option value="3">其他类</option>
								</select>
									
							</td>
						</tr>
						
						<tr>
							<td style="width: 10%;" align="right">
								<label class="control-label"><font color="red">*</font>标签:</label>
							</td>
							<td colspan="3">
						       <input id = "tag" name = "knowledge.tag" value="${obj.tag}" class="form-control"  style="width: 98.8%;" required="required" type="text" class="inputfont" value="">
							</td>
						</tr>
						
						<tr>
							<td style="width: 10%;" align="right">
								<label class="control-label"><font color="red">*</font>内容:</label>
							</td>
							<td colspan="3">
					        	<textarea name = "knowledge.content" class="xheditor-simple" rows="16" style="width: 100%"> ${obj.content}</textarea>
							</td>
						</tr>

						<tr>
							<td style="padding:10px 0px;text-align: center;" colspan="4">
								<button type="button" class="btn btn-primary icon-save" onclick="save();">保存</button>
                				<button type="button" class="btn btn-danger icon-arrow-left" onclick="skynetDialog.close();">返回</button>
							</td>
						</tr>
						</tbody>
					</table>
		        </div>
		</form>
	</div>
</body>
</html>