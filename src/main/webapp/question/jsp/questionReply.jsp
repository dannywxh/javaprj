<%@page language="java" pageEncoding="UTF-8"%>


<%-- <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> --%>

<%-- <%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> --%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>回复帖子</title>
<%@include file="/common/html/head.jsp"%>
<link rel="stylesheet" href="common/css/style.css" type="text/css">
<script src="xhEditor/xheditor-1.2.2.min.js"></script>
<script src="xhEditor/xheditor_lang/zh-cn.js"></script>
<script type="text/javascript" src="common/js/validata.js"></script>
<script type="text/javascript" src="question/js/questionReply.js"></script>
</head>
<body >
	<div class="widget-box" style="border-bottom: 1px solid #CDCDCD;">
		<form id="discuzForm" enctype="multipart/form-data">
			<table style="width: 100%; margin: 10px 0px">
				<tbody>
				<tr>
					<td style="width: 100px" align="right">
						<label class="control-label"><font color="red">*</font>回复帖子:</label>
					</td>
					<td style="padding:0px 5px;" >
						<input type="text"  disabled="disabled" class="inputfont span12" value="${obj.data.question.title}">
						<input id = "title" name = "reply.qid" type="hidden" value="${obj.data.question.id}">
					</td>
				</tr>
				<c:if test='${obj.data["reply"].id != null}'>
				<tr>
					<td align="right" >
						<label class="control-label">回复层:</label>
						<input id = "discuzbt" name = "reply.id" type="hidden" value="${obj.data.reply.id}">
					</td>
					<td style="padding:0px 5px;">
						<i class="icon-hand-right"></i>${obj.data.reply.repliername}&nbsp;&nbsp;发表于 ${obj.data.reply.replydate}&nbsp;&nbsp;
						<br><strong>“</strong>${obj.data.reply.content}<strong>”</strong>
					</td>
				</tr>
				</c:if>
				<tr>
					<td align="right">
						<label class="control-label"><font color="red">*</font>内容:</label>
					</td>
					<td  style="padding:5px 5px;">
			        	<textarea id='${Math.random()}' name = "reply.content" rows="6"  class="xheditor-simple" style='height:180px;width: 100%;'></textarea>
					</td>
				</tr>
<!-- 				<tr> -->
<!-- 					<td align="right"><label class="control-label">上传附件:</label></td> -->
<!-- 					<td  style="padding:0px 5px;"> -->
<!-- 					<div> -->
<!--                        <div id="div_importfile" align="left" onclick="uploadFile();"> -->
<!--                        		<input style="width: 74%;display: inline-block;margin-top: 8px;" readonly="readonly" id='inputFile' type="text" class="inputfont" value=""> -->
<!--                        		<button id="btnAdd" type="button" class="btn btn-primary icon-upload-alt" style="margin: 0px 0px;">选择文件</button> -->
<!--                        </div> -->
<!--                        <input id = 'importfile' name="importfile" style="width: 100%;display: none;" type="file"  class="form-control" onchange="readFile();"/> -->
<!--                     </div> -->
<!-- 					</td> -->
<!-- 				</tr> -->
				<tr>
					<td style="padding:10px 0px;text-align: center;" colspan="2">
						<button type="button" class="btn btn-primary icon-save"	onclick="save();">回复</button>
		                <button type="button" class="btn btn-danger icon-arrow-left" onclick="skynetDialog.close();">返回</button>
					</td>
				</tr>
				</tbody>
			</table>
		</form>
	</div>
</body>
</html>
