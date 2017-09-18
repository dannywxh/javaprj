$(document).ready(function(){

});


function savenode(){
	var pid=$("#pid").val();
	var name=$("#name").val();
	
	if((pid==null)||(pid=="")){
		skynetDialog.msg("请选择父节点!", "error", null);
		return;
	} 
	
	if((name==null)||(name=="")){
		skynetDialog.msg("请输入名称!", "error", null);
		return;
	} 
	
	$.ajax({
	    type:'POST',
	    dataType:'json',
	    url:'document/insertNode',//?pid='+pid+'&name='+name,
	    data:{"pid":pid,"name":name},
		success:function(data){
			
			if (data.result){
				skynetDialog.close();
				skynetDialog.opener.parentCB_after_addNode(data);
			  }
				
			 skynetDialog.msg(data.msg, "", null);
		}
		
	})

};