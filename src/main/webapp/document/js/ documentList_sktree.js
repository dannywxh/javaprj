var cid=null;//catalog id

$(function(){
	//初始化树
	$('#a').skynetTree({
		mode : "normal",
		minWidth : 300,
		minHeight : 300,
		callBack:{
			onClick:function(event, treeId, treeNode){
				//根据当前的相关性id查询数据
				cid=treeNode.id;
				
				var grid = xUi.getGrid("grid_index");
				
				grid.search({"cid":cid});   	
				
				/*
				 $.ajax({
					   type: "POST",
					   dataType:"json",
					   //url: "document/getDocsById?cid="+cid,
					   url: "document/getDocsById?cid=f4f0ad9a-2756-46b5-9f12-9b9a55da1508",
					   
					   cache: false,
					   success: function(data){
						   
							//var grid = xUi.getGrid("grid_index");
							
							//grid.search($("form").serializeJson());   	
					   }
					});
				*/	
			}
		}
	  
	});
	

	var treeObj = $.fn.zTree.getZTreeObj("a");
	
	console.log("treeObj="+treeObj);
	
	 $("#grid_index").dataGrid({
	        height: "100%",
	        width: "100%",
	        needToolBar: false,
	        needHead: false,
	       // queryParams:{
	       // 	pageNumber:1,
	       // 	pageSize:10
	       // },
	        needTitle:false,
//	        title: title + "列表",
//	            dynamicRow:true,
	        url:'document/getDocsById',
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
	              	{title: '文件名', field: 'name', width: 120, textAlign: 'left',
	              		formatter : function(row, val, fieldId) {
	              			
	         				//var bthtml = '<a href="document/download?id=' + row.id + '">'
	        				// + '<img style="margin-right: 10px;" width="15" height="15" alt="帖子" src="images/file.png">&nbsp;' +val+'</a>';

	         				var bthtml = '<a href="javascript:void(0)"  onclick="filedownload(\''+row.id+'\')">'
	         				
	        				 + '<img style="margin-right: 10px;" width="15" height="15" alt="帖子" src="images/file.png">&nbsp;' +val+'</a>';
	              			
	        				var bt = $(bthtml);
	        				
	              			return bt;
	      				}	
	              	},
	              	{title: '版本', field: 'version', width: 50},
	              	{title: '关键词', field: 'keyword', width: 50},
	              	{title: '文件路径', field: 'path', width: 50},
	              	{title: '说明', field: 'memo', width: 50},
	              	{title: '上传人', field: 'creator', width: 50},
	              	{title: '上传时间', field: 'createdate', width: 100}
	              ]

	    });
 	

   $('#btn_search').click(function(){
//		var grid = skynetGrid('#grid');
		var grid = xUi.getGrid("grid_index");
		
		
		grid.search($("form").serializeJson());   		
	 });
   
});


/*
 * id:doc id
 * cid:catalog id
 */
function showEdit(id) {

	if((cid==null)||(cid=="")){
		skynetDialog.msg("请选择一个目录!", "error", null);
		return;
	}
	
	openDialog('document/showEdit?id='+id+'&cid='+cid,'文件增加',760,580);
}

function filedownload(id){
	
	skynetDialog.confirm("确定下载文件吗？", function () {
		 window.location.href="document/download?id=" + id;
	})
	
//	alert("down");
//	
//	 $.ajax({
//		   type: "GET",
//		   dataType:"json",
//		   url: "document/download?id="+id,
//		   cache: false,
//		   success: function(data){
//			   
//			   alert(data);
//	            
//		   }
//		});
}


function getDqZxqkData(testCaseId){
	var data=[];
	var pageSize_zxqk=3;
	var i=testCaseId.indexOf("_");
	var testCaseIdCon=testCaseId.substring(0,i);
	//显示影藏块
	$("#zxqk_list_"+testCaseIdCon).show();
	//为了达到互斥效果，先清除所有执行情况块的内容
	//$("div[name='div_zxqk']").html("");
	 $.ajax({
		   type: "POST",
		   dataType:"json",
		   url: "test/zxqkQueryByTestCaseId?testCaseId="+testCaseId,
		   cache: false,
		   success: function(da){
			   data=da;
			   if(data!=null){
				 //初始化分页组件
				   var total=data.length;					   
				         var pao={
						    id: null,
				            name: null,
				            pageType: null,
				            total: total,
				            page: 1,
				            rows: pageSize_zxqk,
				            maxCount: 1,
				            minCount: 1,
				            step: 3,
				            sizeArray: [10, 20, 30, 40],
				            model: "full",
				            pageList: data
					} 
				         $("#zxqk_pager_"+testCaseIdCon).skynetPager(pao,{
							 getDataSize: function () {
					             return data.length;
					         },
					         loaderData: function () {
					            return data;
					         },
					         onClick:function () {
					        	 //当前页起始值 this.option.page
					        	 var currentPageStart=(this.option.page-1)*pageSize_zxqk;
					        	 var html="<hr>";
								   var space="&nbsp;&nbsp;";
								   $.each(data,function(index,d){
									   var btgyy=d.btgyy;
									   if(btgyy==undefined){
										   btgyy="";
									   }
									   if(index>=currentPageStart&&index<(currentPageStart+pageSize_zxqk)){
										   html+="<div style='border:0px solid yellow; float:left;'><div style='width:200px; float:left; border:0px solid red;'>"+d.zxsj+space+d.sftg+"</div>";
										   html+="<div style='width:758px;float:right; border:0px solid blue;'>"+btgyy+"</div></div>";
									   }
								   });
								   $("#div_zxqk_"+testCaseIdCon).html(html);  
					         }
						});        
				   var space="&nbsp;&nbsp;";
				   var html="";
				   $.each(data,function(index,d){
					   var btgyy=d.btgyy;
					   if(btgyy==undefined){
						   btgyy="";
					   }
					   if(index>=0&&index<pageSize_zxqk){
						   html+="<div style='border:0px solid yellow; float:left;'><div style='width:200px; float:left; border:0px solid red;'>"+d.zxsj+space+d.sftg+"</div>";
						   html+="<div style='width:758px;float:right; border:0px solid blue;'>"+btgyy+"</div></div>";
					   }
				   });
				  $("#div_zxqk_"+testCaseIdCon).html(html);           
			   }
		   }
		});
}

function shouqi(shouqiid){
	$("#zxqk_list_"+shouqiid).hide();
}



