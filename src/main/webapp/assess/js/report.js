 $(document).ready(function(){
	 	$("[name='query_key']").val(new Date().format("yyyy-MM-dd"));
    	$('#grid').skynetGrid({
    		autoCreate: true,
    		url:'report/queryReports',
            pager: {pageType: 0, rows: 40},
            isToolbar: false,
            isCheck: false,
            fieldId: 'id',
    		columns: [
            	{title: '项目名称', field: 'bt', width: '120px', rowAlign: 'left'},
            	{title: '项目状态', field: 'zt', width: '20px', rowAlign: 'left'},
            	{title: '执行人', field: 'zxrmc', width: '20px', rowAlign: 'left'},
            	{title: '上周计划', field: 'szjh', width: '120px', rowAlign: 'left',
            		formatter : function(val, row, index) {   
            				if(row.szjh!=null&&row.szjh!=undefined){
            					return row.szjh.replace(/;/g,";\r\n");
            				}
            				return row.szjh;            			
            		}
            	},
            	{title: '上周工作', field: 'szgz', width: '120px', rowAlign: 'left',
            		formatter : function(val, row, index) {   
        				if(row.szgz!=null&&row.szgz!=undefined){
        					return row.szgz.replace(/;/g,";\r\n");
        				}
        				return row.szgz;
            		}	
            	},
            	{title: '本周工作', field: 'bzgz', width: '120px', rowAlign: 'left',
            		formatter : function(val, row, index) {   
        				if(row.bzgz!=null&&row.bzgz!=undefined){
        					return row.bzgz.replace(/;/g,";\r\n");
        				}
        				return row.bzgz;
            		}
            	},
            	{title: '近期目标', field: 'jqmb', width: '20px', rowAlign: 'left'},
            	{title: '评价', field: 'pj', width: '20px', rowAlign: 'left'},
            	{field: 'caozuo', title: '操作', isShowMore:false, width: '40px',rowAlign: 'center',
    	        	  formatter: function (val, row, index) {
    	        		var btn="<a   class='blue icon-edit' onclick='editReport(\""+row.id+"\")'>修改</a>";
         				return $(btn);
    	        	 }
            	}
            ]
    	});
    $('#btn_search').click(function(){
  		var grid = skynetGrid('#grid');
  		grid.search({cycle:$("[name='cycle']").val(),date:$("[name='query_key']").val()});   		
  	});
      
    $("#btn_export").click(function(){
  			window.location.href="report/exportReport?cycle="+$("[name='cycle']").val()+"&date="+$("[name='query_key']").val();	
  	});
    
});
 
 
 function initQuery(str,lx){
	 $("#xs").html(str);
	 $("input[name='cycle']").val(lx);
 }
 
 function editReport(id){
	 openDialog('report/editReport?id='+id,'周报编辑',800,650);
 }
 
 function save(){
	 var opt={
				type:'post',
				dataType:'json',
				success:function(obj){
					skynetDialog.msg(obj.msg, obj.flag,function(){
						if(obj.flag){
							skynetDialog.opener.$("#btn_search").click();
							skynetDialog.close();
						}
					});
				}
		};
	  	$("#editReportForm").ajaxSubmit(opt);
 }
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
function gridRefresh(){
	SkynetGrid("#grid").refresh();
}

function query(obj){
	var grid = skynetGrid('#grid');
	grid.search(obj); 
}


























/**
 * @author tfq
 *new Date().format("yyyy-MM-dd")
 *alert(new Date("january 12 2008 11:12:30").format("yyyy-MM-dd hh:mm:ss")); 
 */
Date.prototype.format = function(format) //author: meizz 
{ 
   var o = { 
     "M+" : this.getMonth()+1, //month 
     "d+" : this.getDate(),    //day 
     "h+" : this.getHours(),   //hour 
     "m+" : this.getMinutes(), //minute 
     "s+" : this.getSeconds(), //second 
     "q+" : Math.floor((this.getMonth()+3)/3),  //quarter 
     "S" : this.getMilliseconds() //millisecond 
   } 
   if(/(y+)/.test(format)) format=format.replace(RegExp.$1, 
     (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   for(var k in o)if(new RegExp("("+ k +")").test(format)) 
     format = format.replace(RegExp.$1, 
       RegExp.$1.length==1 ? o[k] : 
         ("00"+ o[k]).substr((""+ o[k]).length)); 
   return format; 
} 
