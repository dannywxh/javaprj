 
$(document).ready(function(){
	
	
	 $("#grid").dataGrid({
	        height: "100%",
	        width: "100%",
	        needToolBar: false,
	        needHead: false,
	/*        queryParams:{
	        	pageNumber:1,
	        	pageSize:10
	        },*/
	        needTitle:false,
//	        title: title + "列表",
//	            dynamicRow:true,
	        url:'question/getQueryListData',
	        selectType: "none",
	
	        pager: {
	            pageType: 1,
	            pageNum: 1,
	            pageArray: [ 10, 20, 30, 40, 100, 500]
	        },
	 
	        fitColumns: true,
	        power: true,
	        index: {
	            frozen: false//默认为冻结项
	        },
	        check: {
	            frozen: false//默认为冻结项
	        },
	        events: {
	            loadFilter: function (data) {
	                return data.rows;
	            }
	        },
	        columns: [
	              	{title: '标题', field: 'title', width: 120, textAlign: 'left',
	              		formatter : function(row, val, fieldId) {
	              			var bt='<a style="color:#959595;" title="点击查看" href="question/showDetail?id='+row.id+'">'+row.title+'</a>';
	          				return $(bt);
	      				}	
	              	},
	              	{title: '提出人', field: 'creatorname', width: 50},
	              	{title: '提出时间', field: 'createdate', width: 100},
	              	{title: '回复数', field: 'replycount', width: 50},
	              	{title: '最后回复人', field: 'lastreplier', width: 50},
	              	{title: '最后回复日期', field: 'lastreplydate', width: 50}
	              ]

	    });
    	
   
      $('#btn_search').click(function(){
//  		var grid = skynetGrid('#grid');
  		var grid = xUi.getGrid("grid");
  		
  		grid.search($("form").serializeJson());   		
  	 });
});
 
function gridRefresh(){
	var grid=xUi.getGrid("grid");
	grid.search(); 
}

function query(obj){
	var grid=xUi.getGrid("grid");
	grid.search(obj); 
	
}

function logout(){
	
	
	skynetDialog.confirm("确定退出系统吗？", function () {

		$.ajax({
			type:"POST",
			dataType: "json",
			url:"sysuser/logout",
			success:function(json){
				
				if(json.result){
						skynetDialog.msg(json.msg,json.ico,null,function(){
							window.location.href = 'sysuser/goLogin';
						});	
					} else {
						skynetDialog.msg(json.msg,json.ico,null);
					}
					
			}
			
		})
	})
}


function initQuery(s,v){
	$("#xs").text(s);
	$("[name='query_type']").val(v);
}