$(document).ready(function(){
	//$(':text,:password').attr('class','form-control inputfont');
	//$('#newPsw').focus();
});



//密码修改
function save(){

		$('#discuzForm').skynetShadowBox('show');
		if (!$('[name="knowledge.title"]').val()) {
			skynetDialog.msg("请输入标题!", "error", null);
			$('#discuzForm').skynetShadowBox('hide');
			return;
		}
		
		if ($('[name="knowledge.title"]').val().length > 30) {
			skynetDialog.msg("标题太长!", "error", null);
			$('#discuzForm').skynetShadowBox('hide');
			return;
		}

		if (!$('[name="knowledge.content"]').val()) {
			skynetDialog.msg("请输入内容!", "error", null);
			$('#discuzForm').skynetShadowBox('hide');
			return;
		}else{		
			var zw=$.trim($('[name="knowledge.content"]').val()) ;
			var len = zw.length+CharaCate(zw); 
			if (CharaCate(zw)>1300) {
				skynetDialog.msg("请输入帖子内容，不能超过1300个汉字!", "error", null);			
				return ;
			}
		}
		
		var url = 'knowledge/save';
		if ($.trim($("[name='importfile']").val()) != "") {
			url = 'knowledge/saveWithFile';
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

