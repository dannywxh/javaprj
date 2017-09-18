<%@page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>帖子详细</title>
<%@include file="/common/html/head.jsp"%>
<link rel="stylesheet" href="common/css/style.css" type="text/css">
<link rel="stylesheet"	href="common/otherUIs/z-tree/css/zTreeStyle/zTreeStyle.css"	type="text/css">
<script type="text/javascript" src="question/js/questionDetail.js"></script>
<script type="text/javascript">

</script>
<style type="text/css">
.imgsize{ 
	width:200px; 
	height:200px;
	min-height: 200px;
	max-width: 200px;
}
</style>
</head>
<body class="innerPage">
	<input type="hidden" id = 'tzid' value="${obj.id}">
	<input type="hidden" id = 'pagecnt' value="">
	<input type="hidden" id = 'desc' value="">
	<input type="hidden" id = 'userid' value="">
	<input type="hidden" id = 'refreshAll' value="false">
	<div class="widget-box skynetBox">
		<div class="widget-content skynetBox" style="min-height: 300px; padding: 0px 0px;">
			<div class="widget-box widget-chat">
				<div class="widget-content nopadding collapse in" id="collapseG4">
					<div class="widget-content nopadding collapse in" id="collapseG2">
					    <div style="position: fixed;margin-top:-2px;padding:10px;height:33px;background:#f0f0f0;">
							   <div style="float: left;">
								   <button id="btn_add" type="button" class="btn btn-info icon-list-alt" onclick="location.href='question/showAdd'">发帖</button>
								   <button id="btn_search" type="button" class="btn btn-primary icon-comments-alt" onclick='reply("${obj.id}","")'>回复</button>
								</div>
								<div style="float: right;margin-left:1156px;">
<!-- 									<button id="btn_my" type="button" class="btn btn-success icon-copy" onclick="location.href='discuz/showMy';">我的帖子</button> -->
<!-- 									<a  type="button" class="btn btn-warning icon-volume-up" href="message/showMessageList">我的消息</a> -->
<!-- 									<button id="btn_read" type="button" class="btn btn-primary icon-eye-open" onclick="location.href='discuz/showBkIndex';">查看新帖</button> -->
									<button id="btn_sy" type="button" class="btn btn-danger icon-arrow-left" onclick="history.go(-1);">返回</button>
					    		</div>
					    </div>
						<ul class="recent-posts" id="detail_content">
							<li>
								<table class="table table-bordered table-striped">
					              <tbody>
					                <tr class="odd gradeX">
					                  <td width="180px;">
					                   <ul class="recent-posts">									
										<li style="text-align: center;height:30px;line-height:30px;">
					                  		<span class="icon">
<%-- 											<span style="color:#1a79c2;"><i class="icon-eye-open"></i> 查看:</span><font color = '#ff4e00'>&nbsp;&nbsp;${obj.title}</font>&nbsp;&nbsp;|&nbsp;&nbsp;<span style="color:#1a79c2;"><i class="icon-pencil"></i> 回复: </span><font color = '#ff4e00'>&nbsp;&nbsp;${obj.id}</font> --%>
											</span>
										</li>
										<li style="text-align: center;">
											<img class="imgsize" alt="会员" src="question/showImg?id=${obj.id}">
										</li>
										<li style="text-align: center;height:25px;line-height:25px;font-size:14px;">
											<strong>${obj.creator}</strong><br>
										</li>
					                  </ul>
					                  </td>
					                  
					                  <td>
					                  <div class="article-post">
					                  <ul class="recent-posts">									
										<li style="height:30px;line-height:30px;font-size:14px;">
											<i class="icon-comment"></i>&nbsp;&nbsp;<strong>${obj.title}</strong>
										</li>
										<li style="border-bottom:none;height:20px;line-height:20px;background:#f5f5f5;">
											<span style="color:#6493d0"><i class="icon-hand-right"></i> 发表于</span><span style="color:#f92900"> ${obj.createdate}</span>&nbsp; <span style="color:#bcbcbc"> |</span> 
										</li>
										<li style="min-height:70px;padding: 0px 15px;border-bottom:none;">
											<p>${obj.content}</p>
										</li>
										<li id="li_hf" style="border-bottom:none;">
											<button class="btn icon-comments-alt blue" onclick='reply("${obj.id}","")'>回复</button>
											
										</li>
									</ul>
									</div>
									</td>
					                </tr>
					              </tbody>
					           </table>							
							</li>
						</ul>
						<ul class="recent-posts">
							<li style="text-align: center;">
								<button  id = 'loadMore'  class="btn btn-warning" onclick="readMore();">加载更多...</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	<ul class="recent-posts" id="detail_content_clone" style='display:none;'></ul>
</body>
</html>
