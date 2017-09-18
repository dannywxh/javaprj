 /**
  * 返回字符串中汉字的长度
  * @param str 要验证的字符串
  * @return 返回的长度值
  */
 function CharaCate(str)
 {
 	if(str==undefined)
 	 {
 		  return 0;
 	 }
    var r=RegExp(/[\u007f-\uffe5]/g);
    var m = str.match(r);
    if(m != null)
    { 
 	   return m.length;
    }
    else
    {
 	   return 0;
    }  
 }



 function IsNumber(oNum)
 {
	 if(!oNum) return false;
	 var strP=/^\d+(\.\d+)?$/;
	 if(!strP.test(oNum)) return false;
	 if(oNum<0||oNum>100) return false;
	 try{
	 if(parseFloat(oNum)!=oNum) return false;

	 }
	 catch(ex)
	 {
	 return false;
	 }
	 return true;
 }
 
 function IsNumber8(oNum)
 {
	 if(!oNum) return false;
	 var strP=/^\d+(\.\d+)?$/;
	 if(!strP.test(oNum)) return false;
	 if(oNum<0||oNum>8) return false;
	 try{
	 if(parseFloat(oNum)!=oNum) return false;

	 }
	 catch(ex)
	 {
	 return false;
	 }
	 return true;
 }
 
 /**
 * 只能输入数字
 */
function keyPress() { 
	 	var obj=event.target;
	 	var state=true
	    var keyCode = event.keyCode; 
	    if ((keyCode >= 48 && keyCode <= 57)||keyCode==46)    
	    {   var v=obj.value;
	    	if(v!=""){
	    		if(isNaN(v)){
	    			state = false;
	    		}
	    		if(!(v>0&&v<100)){
	    			state = false;
	    		}
	    	}
	    } else {    
	    	state = false;    
	    } 
	    event.returnValue=state;
}    

function toXml(s, doc) {
	    if (window.ActiveXObject) {
	        doc = new ActiveXObject('Microsoft.XMLDOM');
	        doc.async = 'false';
	        doc.loadXML(s);
	    }
	    else{
	    	 doc = (new DOMParser()).parseFromString(s, 'text/xml');
	    }       
	    return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
}


//| 日期时间有效性检查 
//| 格式为：yyyy-MM-dd HH:mm:ss
function IsValidDateTime(str){ 
	 	  var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
	      var r = str.match(reg);
	      if(r == null){
	          return false;
	      }else{
	      return true;
	      }        
} 


function readFile(obj){
	if ($.trim($(obj).val()) != "") {
		var r = RegExp(/(\.*.(vsd|json|xml|pdm|log|ico|jsp|css|pdf|sql|js|htm|html|class|java|rp|zip|ZIP|rar|RAR|gif|GIF|jpg|JPG|jepg|JEPG|png|PNG|bmp|BMP|xlsm|xlsx|xls|XLSX|XLS|docx|doc|DOCX|DOC|txt|TXT|csv|CSV)$)/);
		r.IgnoreCase = true;
		if (!$.trim($(obj).val()).match(r)) {
			skynetDialog.msg("系统暂不支持此格式的文件！", "warning", null); 	
			$(obj).val("");
		    return false;
		} 
	}
	return true;
}

(function($){  
    $.fn.serializeJson=function(){  
        var serializeObj={};  
        var array=this.serializeArray();  
        var str=this.serialize();  
        $(array).each(function(){  
            if(serializeObj[this.name]){  
                if($.isArray(serializeObj[this.name])){  
                    serializeObj[this.name].push(this.value);  
                }else{  
                    serializeObj[this.name]=[serializeObj[this.name],this.value];  
                }  
            }else{  
                serializeObj[this.name]=this.value;   
            }  
        });  
        return serializeObj;  
    }; 
    $.fn.deserializeJson = function(json) {
        return deserialize($(this), json);
     }; 
})(jQuery);  

/**
* 设置表单值
* @param form          Form表单id或表单jquery DOM对象
* @param data          json对象，多选时为数组
*/
var deserialize = function(form,data){
   var rcheck = /^(?:radio|checkbox)$/i,
       rselect = /^(?:option|select-one|select-multiple)$/i,
       rvalue = /^(?:button|color|date|datetime|datetime-local|email|hidden|month|number|password|range|reset|search|submit|tel|text|textarea|time|url|week)$/i;

   var $form = (typeof(form)=="string" ? $("#"+form) : form);

   //得到所有表单元素
   function getElements( elements ) {
     //此处elements为jquery对象。这个map函数使用来便利elements数组的.如存在多个form表单，则便利多个form表单
       return elements.map(function(index, domElemen) {
           //this代表form表单，this.elements获取表单中的DOM数组. jQuery.makeArray 转换一个类似数组的对象成为真正的JavaScript数组。
           return this.elements ? jQuery.makeArray( this.elements ) : this;
         //过滤不启用的选项
       }).filter( ":input:not(:disabled)" ).get();
   }
   //把表单元素转为json对象
   function elementsToJson( elements ) {
       var current,elementsByName = {};
     //elementsByName对象为{控件名：控件元素或控件元素数组}
       jQuery.each( elements, function( i, element ) {
           current = elementsByName[ element.name ];
           elementsByName[ element.name ] = current === undefined ? element :
               //如果已经是一个数组了，那么就添加，否则构造一个数组
               ( jQuery.isArray( current ) ? current.concat( element ) : [ current, element ] );
       });
       return elementsByName;
   }

   var elementsJson = elementsToJson(getElements($form));
   //data是一个对象
   for(var key in data){
       var val = data[key];
       var dataArr = [];//更具数据直接构造一个jQUery序列化后的数组形式。
     //判断值是否为数组
       if( $.isArray(val)){
           for(var i= 0,v;v=val[i++];){
               //是数组那么就变成多个对象形式
               dataArr.push({name:key,value:v});
           }
       } else{
           //不是数组直接构造
           dataArr.push({name:key,value:val});
       }
    
       //根据数据构造的这个数组进行操作
       for(var m= 0,vObj;vObj=dataArr[m++];){
           var element;
           //如果表单中无元素则跳过
           if ( !( element = elementsJson[vObj.name] ) ) {
               continue;
           }
         //判断元素是否为数组,暂时获取第一个元素，后面会有迭代赋值。
           var type = element.length?element[0]:element;
         //元素类型
           type = ( type.type || type.nodeName ).toLowerCase();

           var property = null;
         //是单值类型
           if ( rvalue.test( type ) ) {
               element.value = (typeof(vObj.value)=="undefined" || vObj.value==null)?"":vObj.value;
             //checkbox
           } else if ( rcheck.test( type ) ) {
               property = "checked";
   //select
           } else if ( rselect.test( type ) ) {
               property = "selected";
           }
           //判断类型是否为多选
           if(property) {
               //如果是，则迭代多选的元素赋值
               for(var n= 0,e;e=element[n++];){
                   if(e.value==vObj.value){
                     //设置选中
                       e[property] = true;
                   }
               }
           }
       }
   }
};

function zxrRw(zxr){
	 var state=false;
	 $.ajax({
		   type: "POST",
		   dataType: "text", 
		   url: "rw/queryZxRw?zxr="+zxr,
		   async: false,
		   success: function(result){				 
			   if(parseInt(result)>10){
				   skynetDialog.msg("执行人正在执行任务数大于10，请重新选择执行人！", "error", null);					
			   }else{
				   state=true;
			   }	
		   }
    });
	return state;
}

function checkURL(URL){
	var str=URL;
	//判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
	//下面的代码中应用了转义字符"\"输出一个字符"/"
	var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
	var objExp=new RegExp(Expression);
	if(objExp.test(str)==true){
	return true;
	}else{
	return false;
	}
} 