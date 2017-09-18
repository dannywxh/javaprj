$(function(){
	creatGrid('knowledge/QueryByCnd');
//	$('#grid_index').skynetGrid({
//		autoCreate: true,
//		url:'test/zxqkQuery',
//        isToolbar: false,
//        pager: {pageType: 0},
//        fieldId: 'id',
//        isIndex: true,
//        isCheck: false,
//		columns: [
//        	{title: '用例名称', field: 'ylmc', width: '50px',rowAlign: 'center',
//        		formatter : function(val, row, index) {
//    				return val;
//    			}	
//        	},
//        	{title: '编号', field: 'bh', width: '50px',rowAlign: 'center',
//        		formatter : function(val, row, index) {
//    				return val;
//    			}	
//        	},
//        	{title: '版本', field: 'bb', width: '50px',rowAlign: 'center',
//        		formatter : function(val, row, index) {
//    				return val;
//    			}	
//        	},
//        	{title: '执行时间', field: 'zxsj', width: '50px',rowAlign: 'center',
//        		formatter : function(val, row, index) {
//    				return val;
//    			}	
//        	},
//        	{title: '执行人', field: 'zxr', width: '50px',rowAlign: 'center',
//        		formatter : function(val, row, index) {
//    				return val;
//    			}	
//        	},
//        	{title: '是否通过', field: 'sftg', width: '50px',rowAlign: 'center',
//        		formatter : function(val, row, index) {
//    				return val;
//    			}	
//        	}
//        	,
//        	{title: '操作', field: 'caozuo', width: '50px',rowAlign: 'center',
//        		formatter : function(val, row, index) {
//        			var btn="<a   class='blue icon-share' href='test/showZxqkDetail?zxqkid="+row.id+"' target='_blank'>查看</a>";
//    				return $(btn);
//    			}	
//        	}
//        ]
//	});
	$("#testCaseTree").skynetTree({
        callBack: {	           
            beforeClick: function (treeId, treeNode, clickFlag) {	
            	//exeQuery(treeNode.id);
                return true;
            }   	           
        }
 });
	
	$("#btn_search").click(function(){
		var title=$("[name='title']").val();
		var type=$("[name='type']").val();
		var tag=$("[name='tag']").val();
		
		creatGrid('knowledge/QueryByCnd?title='+title+"&type="+type+"&tag="+tag);
//		$('#grid_index').skynetGrid({
//			autoCreate: true,
//			url:'test/zxqkQueryByCnd?csyl='+csyl+"&bh="+bh+"&bb="+bb+"&sftg="+sftg,
//	        isToolbar: false,
//	        pager: {pageType: 0},
//	        fieldId: 'id',
//	        isIndex: true,
//	        isCheck: false,
//			columns: [
//	        	{title: '用例名称', field: 'ylmc', width: '50px',rowAlign: 'center',
//	        		formatter : function(val, row, index) {
//	    				return val;
//	    			}	
//	        	},
//	        	{title: '编号', field: 'bh', width: '50px',rowAlign: 'center',
//	        		formatter : function(val, row, index) {
//	    				return val;
//	    			}	
//	        	},
//	        	{title: '版本', field: 'bb', width: '50px',rowAlign: 'center',
//	        		formatter : function(val, row, index) {
//	    				return val;
//	    			}	
//	        	},
//	        	{title: '执行时间', field: 'zxsj', width: '50px',rowAlign: 'center',
//	        		formatter : function(val, row, index) {
//	    				return val;
//	    			}	
//	        	},
//	        	{title: '执行人', field: 'zxr', width: '50px',rowAlign: 'center',
//	        		formatter : function(val, row, index) {
//	    				return val;
//	    			}	
//	        	},
//	        	{title: '是否通过', field: 'sftg', width: '50px',rowAlign: 'center',
//	        		formatter : function(val, row, index) {
//	    				return val;
//	    			}	
//	        	},
//	        	{title: '操作', field: 'caozuo', width: '50px',rowAlign: 'center',
//	        		formatter : function(val, row, index) {
//	        			var btn="<a   class='blue icon-share' href='test/showZxqkDetail?zxqkid="+row.id+"' target='_blank'>查看2</a>";
//	    				return $(btn);
//	    			}	
//	        	}
//	        ]
//		});
	});
	
});

function creatGrid(url){
	$('#grid_index').skynetGrid({
	autoCreate: true,
	url:url,
    isToolbar: false,
    pager: {pageType: 0},
    fieldId: 'id',
    isIndex: true,
    isCheck: false,
	columns: [
    	
    	{title: '标题', field: 'title', width: '50px',rowAlign: 'center',
    		formatter : function(val, row, index) {
    			
    			var view="<a style='margin-left:5px;'  class='blue icon-share' href='knowledge/showDetail?zxqkid="+row.id+"' target='_blank'/>"+val+"</a>";
                return view;
			}	
    	},
    	{title: '类型', field: 'type', width: '50px',rowAlign: 'center',
    		formatter : function(val, row, index) {
				return val;
			}	
    	},

    	{title: '标签', field: 'tag', width: '40px',rowAlign: 'center',
    		formatter : function(val, row, index) {
				return val;
			}	
    	},
    	{title: '创建人', field: 'creator', width: '40px',rowAlign: 'center',
    		formatter : function(val, row, index) {
				return val;
			}	
    	}
    	,
    	{title: '创建日期', field: 'createdate', width: '40px',rowAlign: 'center',
    		formatter : function(val, row, index) {
				return val;
			}	
    	}
    	,

    	{title: '操作', field: 'caozuo', width: '50px',rowAlign: 'center',
    		formatter : function(val, row, index) {
    			var edit='<button class="btn icon-comments-alt blue" onclick="edit(\''+row.id+'\')">修改</button>';
    			//var edit="<a class='blue icon-edit' onclick='edit("+row.id+")' href='#' target='_blank'>修改</a>";
    			//var view="<a style='margin-left:5px;'  class='blue icon-share' href='knowledge/showDetail?zxqkid="+row.id+"' target='_blank'>查看</a>";
    			return $(edit);
			}	
    	}
    ]
});
}


function edit(id) {
	
	openDialog('knowledge/edit?id='+id,'新增/修改',860,640);
}

/*function showZxqkDetail(zxqkid){
	window.location.href="test/showZxqkDetail?zxqkid="+zxqkid;
}*/
