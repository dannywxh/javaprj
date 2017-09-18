var cid=null;//catalog id

$(function(){
	
    var treeObj;
    
	var setting = {
		//treeId : "catalog",
		//treeObj : null,
		async: {
			enable: true,
			url: "document/initTreeData",
			autoParam: ["id", "name"]
		},
	
		view: {
			selectedMulti: false
		},
		edit:{
			enable: true,
			showRemoveBtn : false,
			showRenameBtn : true
		},
		
		data:{
			simpleData:{
				enable: true,
				idKey: "id",
				pIdKey: "pid",
				rootPId: null,
			}
		},

		callback:{
				onClick:function(event, treeId, treeNode){
					//根据当前的相关性id查询数据
					cid=treeNode.id;
					
					$("#pid").val(cid);
					
					var grid = xUi.getGrid("grid_index");
					
					grid.search({"cid":cid});   	
				
			},
			
			beforeRemove:function(){
				
				
			}, /* onRemove */ 
			
			beforeEditName :function(treeId, treeNode){
				if (treeNode.level==0){
					console.log("top node can't be modified!");
					return false;
					
				}
			},
			
			onRename :function(event, treeId, treeNode){
				
				console.log("new name is:"+treeNode.name);
				
				updateNodeName(treeId, treeNode);
				
				
			},
			/* onRename*/ 
			
			onAsyncSuccess: function(event, treeId, treeNode, msg){
				var zTree = $.fn.zTree.getZTreeObj("catalog");
                //var node = treeObj.getNodeByParam('id', 'ad50dd0d-1766-4e97-83ea-4bd7117f525a');//获取id为1的点  
			    
			    var node=zTree.getNodes()[0]
			    
			    zTree.selectNode(node);//选择点  
			    zTree.setting.callback.onClick(null, zTree.setting.treeId, node);//调用事件  
			    
			}
	}

	}
	

	treeObj=$.fn.zTree.init ($("#catalog"), setting);
	


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
	        url:'document/getDocs',
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




function addnodeForm(){
	
	var zTree = $.fn.zTree.getZTreeObj("catalog"),
	nodes = zTree.getSelectedNodes(),
	treeNode = nodes[0];
	if (nodes.length == 0) {
		skynetDialog.msg("请选择一个目录!", "error", null);
		return;
	}
	
	openDialog('document/AddNode?cid='+treeNode.id,'目录增加',320,240);

}




function updateNodeName(treeId, node){
	$.ajax({
	    type:'POST',
	    dataType:'json',
	    url:'document/updateNode',
	    data:{"id":node.id,"name":node.name},
		success:function(data){
			
			if (data.result){
				
				//skynetDialog.msg(data.msg, "", null);
		
				//$('#myModal').modal('hide');	
		}
		}
	})
}

function editnode1() {
	var zTree = $.fn.zTree.getZTreeObj("catalog"),
	nodes = zTree.getSelectedNodes(),
	treeNode = nodes[0];
	if (nodes.length == 0) {
		alert("请先选择一个节点");
		return;
	}
	zTree.editName(treeNode);
};

function editnode() {
	var zTree = $.fn.zTree.getZTreeObj("catalog"),
	nodes = zTree.getSelectedNodes(),
	treeNode = nodes[0];
	if (nodes.length == 0) {
		alert("请先选择一个节点");
		return;
	}
	
	treeNode.name = "test";
	zTree.updateNode(nodes[0]);
	
	
};


function parentCB_after_upload(cid){
	var grid = xUi.getGrid("grid_index");
	grid.search({"cid":cid});   	
}

function parentCB_after_addNode(data){
	var zTree = $.fn.zTree.getZTreeObj("catalog");
	//isParent = e.data.isParent;
	isParent=false;
	nodes = zTree.getSelectedNodes();
	treeNode = nodes[0];
	if (treeNode) {
		treeNode = zTree.addNodes(treeNode, {id:data.data.id, pId:treeNode.id, isParent:false, name:data.data.name});
	}
}


function remove(e) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
	nodes = zTree.getSelectedNodes(),
	treeNode = nodes[0];
	if (nodes.length == 0) {
		alert("请先选择一个节点");
		return;
	}
	var callbackFlag = $("#callbackTrigger").attr("checked");
	zTree.removeNode(treeNode, callbackFlag);
};

/*本页面的modal dialog调用*/
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
	    url:'document/saveNode?pid='+pid+'&name='+name,
	    
		success:function(data){
			
			if (data.result){
				var zTree = $.fn.zTree.getZTreeObj("catalog");
				//isParent = e.data.isParent;
				isParent=false;
				nodes = zTree.getSelectedNodes();
				treeNode = nodes[0];
				if (treeNode) {
					treeNode = zTree.addNodes(treeNode, {id:data.data.id, pId:treeNode.id, isParent:false, name:name});
				}
			  }
				
				skynetDialog.msg(data.msg, "", null);
		
				$('#myModal').modal('hide');	
		}
		
	})

};


function refreshTree(){
	
	var treeObj = $.fn.zTree.getZTreeObj("catalog");
	treeObj.refresh();
	
//	alert("s");
}


