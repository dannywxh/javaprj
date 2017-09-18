var ioc = {
    dataSource: {
        type: "org.apache.tomcat.jdbc.pool.DataSource",
        fields: {
            driverClassName: "oracle.jdbc.driver.OracleDriver",
            url: "jdbc:oracle:thin:@10.166.7.240/dqbdb",
            username: "pm",
            password : "pm",
			validationQuery : 'select sysdate from dual',
			testOnReturn : true,
			testOnBorrow : true,
			testWhileIdle : true
        },
        events: {
            depose: "close"
        }
    },
    dao: {
        type: "org.cox.dao.impl.NutDao",
        args: [
            {refer: "dataSource"}
        ],
        singleton: false
    },
	toolkets : {  
		type : 'com.skynet.AppToolkets',   
		fields : {sc :{app:'$servlet'}   // 将 ServletContext 对象注入 MyUtils 
		}
    },
    tmpFilePool : {
        type : 'org.cox.filepool.NutFilePool',
        // 临时文件最大个数为 1000 个
        args : [ {java:'$toolkets.getPath("/WEB-INF/tmp")'}, 100]   // 调用 AppToolkets.getPath 函数
    },
    uploadFileContext : {
        type : 'org.cox.mvc.upload.UploadingContext',
        singleton : false,
        args : [ { refer : 'tmpFilePool' } ],
        fields : {
            // 是否忽略空文件, 默认为 false
            ignoreNull : true,
            // 单个文件最大尺寸(大约的值，单位为字节，即 1048576 为 1M)
            maxFileSize : 5242880000,
            // 正则表达式匹配可以支持的文件名
            //nameFilter : '^(.+[.])(vsd|json|xml|pdm|log|ico|jsp|css|pdf|sql|js|htm|html|class|java|rp|zip|ZIP|rar|RAR|gif|GIF|jpg|JPG|jepg|JEPG|png|PNG|bmp|BMP|xlsm|xlsx|xls|XLSX|XLS|docx|doc|DOCX|DOC|txt|TXT|csv|CSV)$' 
        } 
    },
    myUpload : {
        type : 'org.cox.mvc.upload.UploadAdaptor',
        singleton : false,
        args : [ { refer : 'uploadFileContext' } ] 
    }
}