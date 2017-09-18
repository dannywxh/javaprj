$(function() {
	//默认日期设置
    var date=new Date();
    var month=date.getMonth();
    if(month<10){
    	month="0"+month;
    }
    var datestr=date.getFullYear()+"-"+month;
	$("#query_month").val(datestr);
	$("#btn_search").click(function(){
		//获取查询的数据类型 工程师、项目负责人、部门经理
		var v=$("input[name='query_type']").val();
		//考评月份
		var kpyf=$("input[name='query_month']").val().replace("-","");
		//用户名
		var xm=$("input[name='query_xm']").val();
		var s=$("#xs").html();
		initQuery(s,v,kpyf,xm);
	});
	$("#btn_export").click(function(){
		//获取查询的数据类型 工程师、项目负责人、部门经理
		var type=$("input[name='query_type']").val();
		//考评月份
		var kpyf=$("input[name='query_month']").val().replace("-","");
		//用户名
		var xm=$("input[name='query_xm']").val();
		window.location.href="assess/dowmLoadKp?type="+type+"&kpyf="+kpyf+"&xm="+xm;
		
	});
	//默认为工程师考评页面，后期可能要改，不能写死
	$("#a_gcs").click();
  });

function grading(id,lx){
	//有效性检验
	if(lx=='xmfzr'){
		//工程师的考评
		var pf=$("#row_pf_"+id).val();
		if(pf<-5||pf>5){
			skynetDialog.msg("该项评分只能在-5至5之间,请重新输入", "error", null);
			var pf=$("#row_pf_"+id).val(0);
			return;
		}
	}
	if(lx=='gcs'){
		//工程师的考评
		var pf=$("#row_pf_"+id).val();
		if(pf<-5||pf>5){
			skynetDialog.msg("该项评分只能在-5至5之间,请重新输入", "error", null);
			var pf=$("#row_pf_"+id).val(0);
			return;
		}
	}
	if(lx=='bmjl'){
		//工程师的考评
		var pf=$("#row_pf_"+id).val();
		if(pf<0){
			skynetDialog.msg("该项评分不能小于0,请重新输入", "error", null);
			var pf=$("#row_pf_"+id).val(0);
			return;
		}
	}
	$("#form_pf").val($("#row_pf_"+id).val());
	$("#form_bz").val($("#row_bz_"+id).val());
	$("#form_id").val(id);                 
	var opt={
		type:'post',
		dataType:'json',
		url: "assess/singleGrading",
		success:function(data){
			try{					
				if(data.result){
					$("#row_zf_"+id).html(data.data+"分");
					//评分成功也不给予提示
				} else {
					skynetDialog.msg(data.msg,json.ico,null);
				}
			}catch(err){
				skynetDialog.msg("系统错误，请联系管理员!", "error", null);
			}	
			
		}
	}
   $("#form_kp").ajaxSubmit(opt);
}
function initQuery(s,v,kpyf,xm){
	$("#xs").text(s);
	$("[name='query_type']").val(v);
	//考评月份
	kpyf=$("input[name='query_month']").val().replace("-","");
	//用户名
	xm=$("input[name='query_xm']").val();
	//根据选择不同的类型查询数据并显示不同的表单项
	if(v=="gcs"){
		$('#grid_index').skynetGrid({
    		autoCreate: true,
    		url:'assess/query',
            isToolbar: false,
            pager: {pageType: 0},
            params:{queryType:v,kpyf:kpyf,xm:xm},
            fieldId: 'id',
            isIndex: true,
            isCheck: false,
    		columns: [
            	{title: '用户', field: 'xm', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '考评月份', field: 'kpyf', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '生成时间', field: 'rksj', width: '100px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '工作成果量', field: 'gzcgl', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '工作负荷', field: 'gzfh', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '工期提前率', field: 'gqtql', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '工期延迟率', field: 'gqycl', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '工作质量', field: 'gzzl', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '评分', field: 'pf', width: '100px',rowAlign: 'center',
            		formatter : function(val, row, index) {
            			return val;
        			}	
            	},
            	
            	{title: '总分', field: 'zf', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
            			var html="";
            			if(val<=0||val==null||val==""){
            				html="未评分";
            			}else{
            				html="<span style='color:red;' id='row_zf_"+row.id+"'>"+val+"分</span>";
            			}
            			return html;
        			}	
            	}
  	          
            	
            ]
    	});
	}else if("xmfzr"==v){
		//部门经理考评项目责任人
    	$('#grid_index').skynetGrid({
    		autoCreate: true,
    		url:'assess/query',
            isToolbar: false,
            params:{queryType:v,kpyf:kpyf,xm:xm},
            pager: {pageType: 0},
            fieldId: 'id',
            isIndex: true,
            isCheck: false,
    		columns: [
            	{title: '用户', field: 'xm', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '考评月份', field: 'kpyf', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '生成时间', field: 'rksj', width: '100px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '个人时间量', field: 'grsjl', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '提出人时间量', field: 'tcrsjl', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '时间评估量1(延期)', field: 'sjpgl1', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '时间评估量2(占比)', field: 'sjpgl2', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '时间评估量3(任务数)', field: 'sjpgl3', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '管理工作占比', field: 'glgzzb', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '进度管理', field: 'jdgl', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '质量控制', field: 'zlkz', width: '30px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	
            	{title: '评分', field: 'pf', width: '100px',rowAlign: 'center',
            		formatter : function(val, row, index) {
            			return val;
        			}	
            	},
            	
            	{title: '总分', field: 'zf', width: '50px',rowAlign: 'center',
            		formatter : function(val, row, index) {
            			var html="";
            			if(val<=0||val==null||val==""){
            				html="未评分";
            			}else{
            				html="<span style='color:red;' id='row_zf_"+row.id+"'>"+val+"分</span>";
            			}
            			return html;
        			}	
            	}
            	
            ]
    	});
	}else if("bmjl"==v){
		//部门经理考评数据
		$('#grid_index').skynetGrid({
    		autoCreate: true,
    		url:'assess/query',
            isToolbar: false,
            pager: {pageType: 0},
            params:{queryType:v,kpyf:kpyf,xm:xm},
            fieldId: 'id',
            isIndex: true,
            isCheck: false,
    		columns: [
            	{title: '用户', field: 'xm', width: '50px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '考评月份', field: 'kpyf', width: '50px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '生成时间', field: 'rksj', width: '50px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '工作成果量', field: 'gzcgl', width: '50px',rowAlign: 'center',
            		formatter : function(val, row, index) {
        				return val;
        			}	
            	},
            	{title: '评分', field: 'pf', width: '50px',rowAlign: 'center',
            		formatter : function(val, row, index) {
            			return val;
        			}	
            	},
            	
            	{title: '总分', field: 'zf', width: '50px',rowAlign: 'center',
            		formatter : function(val, row, index) {
            			var html="";
            			if(val<=0||val==null||val==""){
            				html="未评分";
            			}else{
            				html="<span style='color:red;' id='row_zf_"+row.id+"'>"+val+"分</span>";
            			}
            			return html;
        			}	
            	}
            ]
    	});
	}
}