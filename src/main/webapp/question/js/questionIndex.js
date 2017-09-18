 $(document).ready(function(){
	    
		createMsgShadow($('#discuzForm'));

	 	var a = new Date();
	 	a = a.format('yyyy-MM-dd');
		var bk = $('#discuzbk').val()||'';
    	$('#grid_index').skynetGrid({
    		autoCreate: true,
    		url:'question/getIndexListData',
            isToolbar: false,
            pager: {pageType: 0},
            fieldId: 'id',
            isIndex: false,
            isCheck: false,
    		columns: [
            	{title: '标题', field: 'title', width: '400px',rowAlign: 'left',
        			formatter : function(val, row, index) {
        				var bthtml = '<a href="question/showDetail?id=' + row.id + '">'
        				 + '<img style="margin-right: 10px;" width="15" height="15" alt="帖子" src="discuz/img/folder_new.gif">&nbsp;' +val+'</a>';
        				var bt = $(bthtml);
        				
        				return bt;
        			}	
            	},
            	{title: '作者', field: 'creatorname', width: '120px',
        			formatter : function(val, row, index) {
        				var result = '';
        				if (val) {
        					result = '<span style="color:#7c7c7c;margin-left:-80px;">' + result + val + '</span><br>';
        				}
        				if (row.createdate) {
        					result = result + '<span style="color:#a5a5a5;">' + row.createdate + '</span>';
        				}
        				return $(result);
    				}	
            	},
            	{title: '回复', field: 'replycount', width: '60px',
        			formatter : function(val, row, index) {
        				var result = '';
        				var hfs= 0,cks = 0;
        				if (row.cks) {
        					cks = row.cks;
        				}
        				if (val) {
        					hfs = val;
        				}
      					result = result +'<span><font style="color:red;">' + hfs + '</font>';
       		
        				return $(result);
    				}	
            	},
            	{title: '最后发表', field: 'lastreplier', width: '400px',
        			formatter : function(val, row, index) {
        				if (row.id) {
        					if (row.lastreplydate) {
        						var reval = val.replace(/<\/?.+?>/g,'');
//        						var reval = val.replace(/<[^>]+>/g,"");
        						return $('<a href="question/showDetail?id=' + row.id + '">'+ reval +'</a>)').
                				after('<br>' + row.lastreplydate+ '&nbsp;&nbsp;by&nbsp;&nbsp;' + row.lastreplier);
        					} else {
        						return '';
        					}
        				} else {
        					return '';
        				}
    				}
            	}
            ]
    	});
    	
    	$('#btn_search').click(function(){
    		var type = $("[name='query_type']").val()||'';
    		var key = $("[name='query_key']").val()||'';
    		//window.location.href = 'discuz/showQuery?type='+type+'&&key='+key;
    		
    		window.location.href = 'question/showIndex?type='+type+'&&key='+key;
    		
    	});

//    	$.ajax({
// 		   type: "POST",
// 		   dataType: "json", 
// 		   url: "discuz/fetchDic",
// 		   data: "lx=LTBK",
// 		   success: function(json){
// 			   try{	
// 				   $('#discuzbkselect').append("<option value=''>请选择</option>"); 
// 				   $.each(json,function(index,row){
// 					   $('#discuzbkselect').append("<option value='" + row.dm + "'>"+row.mc+"</option>");
// 				   });
// 				}catch(err){
// 					skynetDialog.msg("系统错误，请联系管理员!", "error", null);
// 				}	
// 		   }
// 		});
    });
 
 
function initQuery(s,v){
	$("#xs").text(s);
	$("[name='query_type']").val(v);
}

 function uploadFile() {
 	
     $("#importfile").trigger('click');

 }

 function readFile(){

 	 $("#inputFile").val($("#importfile")[0].value);
 }

 function save(){
	$('#discuzForm').skynetShadowBox('show');
 	if (!$('[name="discuz.bt"]').val()) {
 		skynetDialog.msg("请输入帖子标题!", "error", null);
 		$('#discuzForm').skynetShadowBox('hide');
 		return;
 	}
 	if ($('[name="discuz.bt"]').val().length > 30) {
 		skynetDialog.msg("请输入帖子标题!", "error", null);
 		$('#discuzForm').skynetShadowBox('hide');
 		return;
 	}

 	if (!$('[name="discuz.nr"]').val()) {
 		skynetDialog.msg("请输入帖子内容!", "error", null);
 		$('#discuzForm').skynetShadowBox('hide');
 		return;
 	}
 	var url = 'discuz/saveDiscuz';
 	if ($.trim($("[name='importfile']").val()) != "") {
 		url = 'discuz/saveDiscuzFile';
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
 							window.location.href = 'discuz/showBkIndex?id=' + $('[name="discuz.bk"]').val();
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

 
