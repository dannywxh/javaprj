$(document).ready(function(){
	$(':text,:password').attr('class','form-control inputfont');
	$('#newPsw').focus();
});
//密码修改
function register(){

		var v1=$('#psw').val();
		if(v1.length<6){
			skynetDialog.msg('密码长度至少为6个字符！','warning',function(){$('#newPsw').focus();});
			return false;
		}
		var v2=$('#confirmPsw').val();
		if(v1!=v2){
			skynetDialog.msg('密码不一致！请重新输入！','warning');
			return false;
		}
		
	   	$('#registerForm').skynetShadowBox('show');
	   	
		var options = { 
				type:"POST",
				dataType: "json",  
			    url: "sysuser/register",
		     	success: function(json) {  
		     		
				try{
						$('#registerForm').skynetShadowBox('hide');
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
		$("#registerForm").ajaxSubmit(options);

}
