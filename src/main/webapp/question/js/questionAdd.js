$(document).ready(function(){
	createMsgShadow($('#discuzForm'));	
	$.ajax({
		   type: "POST",
		   dataType: "json", 
		   url: "discuz/fetchDic",
		   data: "lx=LTBK",
		   success: function(json){
			   try{	
				   var initValue = $('#bklx').val();
				   $('#discuzbk').append("<option value=''>请选择</option>"); 
				   $.each(json,function(index,row){
					   if(initValue!=null&&initValue==row.dm){
						   $('#discuzbk').append("<option value='" + row.dm + "' selected='selected'>"+row.mc+"</option>");
					   }else{
						   $('#discuzbk').append("<option value='" + row.dm + "'>"+row.mc+"</option>");
					   }
				   });
				}catch(err){
					skynetDialog.msg("系统错误，请联系管理员!", "error", null);
				}	
		   }
		});
});



function uploadFile() {	
    $("#importfile").trigger('click');

}

function readFile(){
	 $("#inputFile").val($("#importfile")[0].value);
}

function save(){

	$('#discuzForm').skynetShadowBox('show');
	if (!$('[name="question.title"]').val()) {
		skynetDialog.msg("请输入帖子标题!", "error", null);
		$('#discuzForm').skynetShadowBox('hide');
		return;
	}
	if ($('[name="question.title"]').val().length > 30) {
		skynetDialog.msg("请输入帖子标题!", "error", null);
		$('#discuzForm').skynetShadowBox('hide');
		return;
	}

	if (!$('[name="question.content"]').val()) {
		skynetDialog.msg("请输入帖子内容!", "error", null);
		$('#discuzForm').skynetShadowBox('hide');
		return;
	}else{		
		var zw=$.trim($('[name="discuz.contetx"]').val()) ;
		var len = zw.length+CharaCate(zw); 
		if (CharaCate(zw)>1300) {
			skynetDialog.msg("请输入帖子内容，不能超过1300个汉字!", "error", null);			
			return ;
		}
	}
	var url = 'question/saveQuestion';
	if ($.trim($("[name='importfile']").val()) != "") {
		url = 'question/saveQuestionFile';
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
							window.location.href = 'question/showIndex?id=' + $('#discuzbk').val();
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
