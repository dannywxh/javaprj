$(document).ready(function(){
	createMsgShadow($('#discuzForm'));
	$('#xhe0_iframearea').css({ height: "180px"});
});

function uploadFile() {
	
    $("#importfile").trigger('click');

}

function readFile(){

	 $("#inputFile").val($("#importfile")[0].value);
}

function save(){
	$('#discuzForm').skynetShadowBox('show');
	if (!$('[name="reply.content"]').val()) {
		$('#discuzForm').skynetShadowBox('hide');
		skynetDialog.msg("请输入回复内容!", "error", null);
		return;
	}else{
		var zw=$.trim($('[name="reply.content"]').val()) ;
		
		//console.log(CharaCate(zw));
		
		var len = zw.length+CharaCate(zw); 
		if (len>2300) {
			skynetDialog.msg("请输入回复内容，不能超过1200个汉字!", "error", null);		
			$('#discuzForm').skynetShadowBox('hide');
			return ;
		}
	}
	var url = 'question/saveReply';
	if ($.trim($("[name='importfile']").val()) != "") {
		url = 'question/saveReplyFile';
	}
	
	var options = { 
			type:"post",
			dataType: "json",  
		    url: url,
	     	success: function(json) {  
				try{
					$('#discuzForm').skynetShadowBox('hide');
					if(json.result){
						skynetDialog.msg(json.msg,json.ico,null,function(){
							skynetDialog.close();
			      			skynetDialog.opener.location.reload();	
						});	
					} else {
						skynetDialog.msg(json.msg,json.ico,null);
					}
				}catch(err){
					skynetDialog.msg("系统错误，请联系管理员!", "error", null);
				}	
			}   
	}; 
	// pass options to ajaxForm 
	$("#discuzForm").ajaxSubmit(options);
}
