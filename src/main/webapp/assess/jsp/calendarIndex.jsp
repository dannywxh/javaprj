<%@ page language="java"  pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@include file="/common/html/head.jsp"%>
<script src="assess/js/calendar.js"></script>
<title>日程追溯</title>
<link href="assess/css/theme.min.css" type="text/css" rel="stylesheet" />
<link href="assess/css/style.css" type="text/css" rel="stylesheet" />
</head>
<body style="overflow-y:hidden;">
<div class="aboluo-w-700">
	<div class="aboluo-leftdiv">
		<div class="aboluo-tools">
			<div class="aboluo-calendar-select-year"></div>
			<div class="aboluo-calendar-month">
				<a class="aboluo-month-a-perv" href="javascript:;">&lt; </a>
				<a class="aboluo-month-a-next" href="javascript:;"> &gt;</a>
			</div>
			<input type="button" class="aboluo-toToday" value="返回今天" />
		</div>
		<div class="aboluo-rilidiv">
			<table class="aboluo-rilitable" cellspacing="0" cellpadding="0" >
				<thead class="aboluo-rilithead">
					<tr>
						<th>一</td>
						<th>二</td>
						<th>三</td>
						<th>四</td>
						<th>五</td>
						<th style="color:red;">六</td>
						<th style="color:red;">日</td>
					</tr>
				</thead>
			</table>
		</div>
	</div>
	<div class="aboluo-rightdiv">
		<p class="aboluo-xssj"><p>
		<p class="aboluo-currday"></p>
		<p class="aboluo-ssjjr"></p>
		<p class="aboluo-xsmx"></p>
		<div class="rwallshow"></div>
	</div>
</div>
</body>
</html>
