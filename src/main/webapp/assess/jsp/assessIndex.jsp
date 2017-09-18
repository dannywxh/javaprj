<%@page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>考评</title>
<%@include file="/common/html/head.jsp"%>
<script src="assess/js/assess.js"></script>
<link rel="stylesheet" href="common/css/style.css" type="text/css">
<style type="text/css">
  textarea {
	color: gray;
	font-family:微软雅黑;
	font-size: 10px;
	margin-top: 10px;
	line-height: 15px;
	width: 80px;
}
a:HOVER {
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
									<div class="span1" style="width: 150px;">
										<ul class="nav" style="margin-top: 5px;">
											<li class="dropdown">
											<a data-toggle="dropdown" class="dropdown-toggle">
											    <i class="btn-primary icon-ok"></i>
												 <span id="xs" class="text">工程师考评</span>
												  <input type="hidden" name="query_type" value="gcs" />
												   <b class="caret"></b>
											</a>
												<ul class="dropdown-menu">
													<li><a onclick="initQuery('工程师考评','gcs');"><i class="icon-th" id="a_gcs"></i>工程师考评</a></li>
													<li class="divider"></li>
													<li><a onclick="initQuery('项目责任人考评','xmfzr');"><i class="icon-th"></i>项目责任人考评</a></li>
													<li class="divider"></li>
													<li><a onclick="initQuery('部门经理考评','bmjl');"><i class="icon-th"></i>部门经理考评</a></li>
												</ul></li>
										</ul>
									</div>
									<div class="span2" style="width: 200px;">
										<input type="month" class="form-control" name="query_month" id="query_month"/>										
									</div>
									<div class="span2" style="width: 200px;">										
										<input type="text" class="form-control" name="query_xm"  />
									</div>
									<div class="span2" style="width: 200px;">
										<button id="btn_search" type="button" class="btn btn-primary icon-search">查询</button>
										<button id="btn_export" type="button" class="btn btn-success icon-arrow-down">导出</button>	
									</div>									
								</div>
							</form>
						</td>
					</tr>
					<tr valign="top">
						<td valign="top">
							<div id="yhftest"
								style="width: 100%; height: 100%; background-color: white; margin: 0 auto;">
								<table id="grid_index" style="width: 100%; height: 100%"></table>
								<div style="display: none;" >
									<form action="" id="form_kp">
										<input type="text" value="" name="assess.pf" id="form_pf" />
										 <input type="text" value="" name="assess.bz" id="form_bz" />
										 <input type="text" value="" name="assess.id" id="form_id" />
									</form>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</body>
</html>