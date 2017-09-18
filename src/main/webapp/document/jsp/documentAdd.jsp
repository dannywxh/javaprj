<%@page language="java" pageEncoding="UTF-8"%>


<%-- <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> --%>

<%-- <%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> --%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>新增文件</title>
<%@include file="/common/html/head.jsp"%>
<link rel="stylesheet" href="common/css/style.css" type="text/css">

<script type="text/javascript" src="common/js/validata.js"></script>
<script type="text/javascript" src="document/js/documentAdd.js"></script>
<script src="xhEditor/xheditor-1.2.2.min.js"></script>
<script src="xhEditor/xheditor_lang/zh-cn.js"></script>

</head>
<body >
	<div class="widget-box" style="border-bottom: 1px solid #CDCDCD;">
		<form id="discuzForm" enctype="multipart/form-data">
		    <input id = "did" name = "document.id" type="hidden" value="${obj.data.document.id}">
		    <input id = "cid" name = "cid" type="text" value="<%=request.getParameter("cid")%>">

			<table style="width: 100%; margin: 10px 0px">
				<tbody>
				<tr>
					<td align="right"><label class="control-label">上传文件:</label></td>
					<td  style="padding:0px 5px;">
					<div>
                       <div id="div_importfile" align="left" onclick="uploadFile();">
                       		<input style="width: 74%;display: inline-block;margin-top: 8px;" readonly="readonly" id='inputFile' type="text" class="inputfont" value="">
                       		<button id="btnAdd" type="button" class="btn btn-primary icon-upload-alt" style="margin: 0px 0px;">选择文件</button>
                       </div>
                       <input id = 'importfile' name="importfile" style="width: 100%;display: none;" type="file"  class="form-control" onchange="readFile();"/>
                    </div>
					</td>
				</tr>

				<tr>
					<td style="width: 100px" align="right">
						<label class="control-label"><font color="red">*</font>文件编号:</label>
					</td>
					<td style="padding:0px 5px;" >
						<input type="text"  name="document.docno" class="inputfont span12" value="${obj.data.document.docno}">
					</td>
				</tr>
				<tr>
					<td style="width: 100px" align="right">
						<label class="control-label"><font color="red">*</font>关键词:</label>
					</td>
					<td style="padding:0px 5px;" >
						<input type="text"  name="document.keyword" class="inputfont span12" value="${obj.data.document.keyword}">
					</td>
				</tr>

				<tr>
					<td style="width: 100px" align="right">
						<label class="control-label"><font color="red">*</font>文件版本:</label>
					</td>
					<td style="padding:0px 5px;" >
						<input type="text"  name="document.version" class="inputfont span12" value="${obj.data.document.version}">
					</td>
				</tr>

				<tr>
					<td align="right">
						<label class="control-label"><font color="red">*</font>内容:</label>
					</td>
					<td  style="padding:5px 5px;">
			        	<textarea id='${Math.random()}' name = "document.memo" rows="5"  class="xheditor-simple" style='height:180px;width: 100%;'>${obj.data.document.memo}</textarea>
					</td>
				</tr>
	
				<tr>
					<td style="padding:10px 0px;text-align: center;" colspan="2">
						<button type="button" class="btn btn-primary icon-save"	onclick="saveFile();">保存</button>
		                <button type="button" class="btn btn-danger icon-arrow-left" onclick="skynetDialog.close();">关闭</button>
					</td>
				</tr>
				</tbody>
			</table>
		</form>
	</div>
</body>
</html>
