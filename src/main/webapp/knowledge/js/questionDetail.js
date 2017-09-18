var nowpage = 1;
$(document).ready(function(){

	$.ajax({
		   type: "POST",
		   dataType: "json", 
		   url: "question/updateCks",
		   data: {"id":$('#tzid').val()},
		   success: function(result){
   
		   }
	});

	var fjs = window.fjs;
	if (fjs != 1) {
		//var fj_html = '<li>' + addFjByJson(fjs) + '</li>';
		//$('#li_hf').before(fj_html);
	}
	$('#detail_content_clone').html($('#detail_content').html());


	$.ajax({
		   type: "POST",
		   dataType: "json", 
		   url: "question/getDetailData?page=1&&rows=10&&id=" + $('#tzid').val(),
		   data: "",
		   success: function(result){
			   
			   try{	
				   if (null == result) {
					   return;
				   }
				   var html= $('#detail_content').html();
				   var lihtml = "";
				   $.each(result.rows,function(index,row){
					   var rowhtml = '<li><table class="table table-bordered table-striped">' 
						+'<tbody><tr class="odd gradeX"><td width="180px;">'
						+'<ul class="recent-posts"><li style="text-align: center;">'
						+'<img class="imgsize" alt="用户" src="question/showImg?id=' + row.replierid + '"></li>';
					   rowhtml = rowhtml + '<li style="text-align: center;">'
					   + '<strong>' + row.repliername + '</strong><br>'
					 //  + '帖子:<a href="javascript:readById(\''+row.hfr+'\',\'tz\')"><font color ="#FCA507">&nbsp;&nbsp;'+ row.tzs +'</font></a>&nbsp;&nbsp;|&nbsp;&nbsp;'
					 //  + '回复:<a href="javascript:readById(\''+row.hfr+'\',\'hf\')"><font color = "#FCA507">&nbsp;&nbsp;'+row.htrhfs+'</font></a>'
					   + '</li></ul></td>'
					    + '<td><div class="article-post"><ul class="recent-posts"><li><i class="icon-hand-right"></i>'
						+'	 发表于 ' + row.replydate + '&nbsp; |&nbsp;<a href=\'javascript:readByUser("'+row.repliername+'");\'>只看该作者</a> &nbsp;|&nbsp;'
						+'<a href=\'javascript:readDesc("' + row.hfztid + '");\'>倒序浏览</a><div style="float:right"><span>' + ((nowpage-1)*10 + index + 1) + '#</span></div></li>'	
						+'	<li style="min-height:130px;padding: 30px 15px;border-bottom:none;">'
						+' <p>' + row.content + '</p>'	
						+'	</li>';
					    if (row.fj) {
					    	//rowhtml = rowhtml + '<li>' + addFj(row.fj)  + '	</li>';
					    }
					    rowhtml = rowhtml + '	<li style="border-bottom:none;">'
						+'		<button class="btn icon-comments-alt blue" onclick=\'reply("' + row.qid +'","'  + row.id + '");\'>回复</button>'
						+'	</li>'
						+'</ul>'
						+'</div>'
						+'</td>'
						+'</tr>'
						+'</tbody>'
						+' </table>		'					
						+'</li>';
						lihtml = lihtml + rowhtml;
				   });
				   $('#detail_content').html(html + lihtml);
				   if (result.pager.pageCount == nowpage || 0 == result.pager.pageCount) {
					   $('#loadMore').hide();
				   }
				}catch(err){
					skynetDialog.msg("系统错误，请联系管理员!", "error", null);
				}	
		   }
	});
});

function addFjByJson(fj){

	var s="";
	$.each(fj,function(index,row){
		s = s + '<br>&nbsp;&nbsp;&nbsp;&nbsp;<a style="color:#959595;" target="_blank" title="点击即可下载"'
		+  'href="discuz/downLoad?id=' + row.id + '">' + row.name + '</a>'
	});
	if(fj.length!=0){
		s="附件："+s;
	}		

	return s;
}

function addFj(fj){

	fj = JSON.parse(fj);
	return addFjByJson(fj);
}


function reply(qid,rid) {
	openDialog('question/showReply?qid='+qid + '&&rid=' + rid,'参与/回复',760,480);
}

function readByUser(userid) {
	nowpage = 1;
	$('#userid').val(userid);
	getDataList();
}

function readDesc(id) {
	nowpage = 1;
	$('#desc').val("desc");
	getDataList();
}

function readAsc(id) {
	nowpage = 1;
	$('#desc').val("");
	getDataList();
}

function readMore() {
	$('#refreshAll').val('true');
	nowpage = nowpage + 1;
	getDataList();
}

function getDataList() {

	$.ajax({
		   type: "POST",
		   dataType: "json", 
		   url: "question/getDetailData",
		   data: {"page" : nowpage,"rows" : "10","userid":$('#userid').val(),"id":$('#id').val(),"desc": $('#desc').val()},
		   success: function(result){

			   try{	
				   if (null == result) {
					   return;
				   }
				   var html = $('#detail_content_clone').html();
				   if (nowpage > 1 && 'true' == $('#refreshAll').val()) {
					   var html= $('#detail_content').html();
				   }

				   var lihtml = "";
				   $.each(result.rows,function(index,row){
					   var rowhtml = '<li><table class="table table-bordered table-striped">' 
							+'<tbody><tr class="odd gradeX"><td width="180px;">'
							+'<ul class="recent-posts"><li style="text-align: center;">'
							+'<img class="imgsize" alt="用户" src="question/showImg?id=' + row.replierid + '"></li>';
						   rowhtml = rowhtml + '<li style="text-align: center;">'
						   + '<strong>' + row.repliername + '</strong><br>'
						 //  + '帖子:<a href="javascript:readById(\''+row.replierid+'\',\'tz\')"><font color ="#FCA507">&nbsp;&nbsp;'+ row.tzs +'</font></a>&nbsp;&nbsp;|&nbsp;&nbsp;'
						 //  + '回复:<a href="javascript:readById(\''+row.replierid+'\',\'hf\')"><font color = "#FCA507">&nbsp;&nbsp;'+row.htrhfs+'</font></a>'
						   + '</li></ul></td>'
						    + '<td><div class="article-post"><ul class="recent-posts"><li><i class="icon-hand-right"></i>&nbsp;发表于&nbsp;';
						   
						   if ($('#userid').val()) {
							  // rowhtml = rowhtml + row.rksj + '&nbsp; |&nbsp;<a href=\'javascript:readByUser();\'>查看所有</a> &nbsp;|&nbsp';
						   } else {
							  // rowhtml = rowhtml + row.rksj + '&nbsp; |&nbsp;<a href=\'javascript:readByUser("'+row.replierid+'");\'>只看该作者</a> &nbsp;|&nbsp';
						   }
						   
						   if ($('#desc').val()) {
							  // rowhtml = rowhtml + '<a href=\'javascript:readAsc("' + row.qid + '");\'>正序浏览</a> &nbsp;|&nbsp;<div style="float:right"><span>' +  ((nowpage-1)*10 + index + 1)  + '#</span></div></li>';
						   } else {
							 //  rowhtml = rowhtml + '<a href=\'javascript:readDesc("' + row.qid + '");\'>倒序浏览</a> &nbsp;|&nbsp;<div style="float:right"><span>' +  ((nowpage-1)*10 + index + 1)  + '#</span></div></li>';
						   }

						   rowhtml = rowhtml +'	<li style="min-height:70px;padding: 0px 15px;border-bottom:none;">'
							+' <p>' + row.content + '</p>'	
							+'	</li>';
						    if (row.fj) {
						    	//rowhtml = rowhtml + '<li>' + addFj(row.fj)  + '	</li>';
						    }
						    rowhtml = rowhtml + '	<li style="border-bottom:none;">'
							+'		<button class="btn icon-comments-alt blue" onclick=\'reply("' + row.qid +'","'  + row.id + '");\'>回复</button>'
							+'	</li>'
							+'</ul>'
							+'</div>'
							+'</td>'
							+'</tr>'
							+'</tbody>'
							+' </table>		'					
							+'</li>';
							lihtml = lihtml + rowhtml;
				   });
				   $('#detail_content').html(html + lihtml);
				   if (result.pager.pageCount == nowpage || 0 == result.pager.pageCount) {
					   $('#loadMore').hide();
				   } else {
					   $('#loadMore').show();
				   }
				   
				}catch(err){
					skynetDialog.msg("系统错误，请联系管理员!", "error", null);
				}	
		   }
	});
}
function sendMsg(sxrid) {
	openDialog('message/showSendMsg?sxrid='+sxrid,'消息发送',600,500);
}

function readById(userid, type){
	window.location.href = 'discuz/showMy?id='+userid + '&&type='+type;
}
