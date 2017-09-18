$(document).ready(function () {
	$('body').on('keyup',function(e){
		if(e.keyCode==13){
			$("#btnSearch").click();
			 var account = $("input[name='uname']").val();
			 if(isEmpty(account)){
				 $("input[name='uname']").focus();
				 return;
			 }
	         var password = $("input[name='passwd']").val();
	         if(isEmpty(password)){
	        	 $("input[name='passwd']").focus();
	        	 return;
	         }
	         $('#loginIn').click();
		}
	});
	
    $('#loginIn').click(function(){
        var account	 = $("input[name='uname']").val();
        var password = $("input[name='passwd']").val();
		if(isEmpty(account)){
			skynetDialog.msg("登录账户不能为空！","warning");
			return;
	    }else if(isEmpty(password)){
    		skynetDialog.msg("用户密码不能为空！","warning");
    		return;
	    }else{
	        $.ajax({
	        	url:'sysuser/login',
	        	data : {"uname":account,"passwd":password},
	        	dataType : "json",
	        	success:function(datas){
	        		var flag="error",msg="登录错误！";
	        		if(!isEmpty(datas)){
	        			flag = isEmpty(datas.flag)?flag:datas.flag;
	        			msg  = isEmpty(datas.msg)?msg:datas.msg;
	        		}
	        		if(flag==="success"){
	        			//window.location.reload();
	        			window.location.href="question/showList";
	        		}else{
	        			skynetDialog.msg(msg,"warning");
	        		}
	        	}
	        })
	    }
    });
    
    $('#toReg').click(function(){
   
		window.location.href="sysuser/goReg";
	})

    
    
});