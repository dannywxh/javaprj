/**
 * 
 */
package com.skynet.watchdog;

import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.cox.dao.Chain;
import org.cox.dao.Cnd;
import org.cox.dao.Dao;
import org.cox.dao.Sqls;
import org.cox.dao.entity.Record;
import org.cox.dao.impl.FileSqlManager;
import org.cox.dao.impl.NutDao;
import org.cox.dao.impl.sql.SqlTemplate;
import org.cox.dao.impl.sql.callback.QueryRecordCallback;
import org.cox.dao.sql.Sql;
import org.cox.http.Http;
import org.cox.http.Response;
import org.cox.json.Json;
import org.cox.lang.Strings;
import org.cox.log.Log;
import org.cox.log.Logs;
import org.cox.mvc.Mvcs;

/**
 * @author tfq
 *
 */
public abstract class RwToolkets {
	private static Log	logger	= Logs.get();
	
	/**
	 * @return
	 */
	public static Date currentDate() {
		Dao dao = Mvcs.getIoc().get(Dao.class, "dao");
		Date date = new SqlTemplate(dao).queryForObject("select sysdate  from dual", null, null, Date.class);
		return date;
	}
	
	
	/**发�?�飞秋信�?
	 * @param msg
	 */
	public static void sendFeiqiu(String msg,String jsrid) {	
//		BeanLoginUser user = LoginMng.getLoginUser();
		Dao dao = Mvcs.getIoc().get(Dao.class, "dao");
	    Record user = dao.fetch("sys_user", Cnd.where("id", "=", jsrid));
	    if(!Strings.isEmpty(user.getString("bdip"))){
	    	Map<String, Object> params = new HashMap<String, Object>();
	        params.put("msg", msg);
	        params.put("ips", user.getString("bdip"));
	        Response response = Http.post("http://10.166.7.150/feiq/msg", params);   
	        dao.insert("pm_feiqiu", Chain.make("msg", msg).add("ip", user.getString("bdip")).add("state", response.getContent()));
	        logger.info(response.getContent());
	    }
	}

	
	/**
	 * @return
	 */
	public static String queryHsr(String tcr,String fid) {	
//		IocLoader il = new JsonLoader("config/ioc/dao.conf.js");
//	    Ioc ioc = new NutIoc(il);
//		Dao dao = ioc.get(Dao.class, "dao");
		Dao dao = Mvcs.getIoc().get(Dao.class, "dao");
		((NutDao) dao).setSqlManager(new FileSqlManager("sqls/rw/rw.sqls"));
		// 获得指定文件的指定SQL
		Sql sql = Sqls.create(dao.sqls().get("queryHsr"));	
		sql.params().set("id", fid);						
		sql.setCallback(new QueryRecordCallback());
		// 第二次执行人
		dao.execute(sql);
		// 根据回调函数 分页查询结果
		List<Record> list = sql.getList(Record.class);	
		for (@SuppressWarnings("rawtypes")
		Iterator iterator = list.iterator(); iterator.hasNext();) {
			Record record = (Record) iterator.next();
			System.err.println(Json.toJson(record));
			if(!tcr.equals(record.getString("zxr"))){
				return  record.getString("zxr");
			}
			if(!tcr.equals(record.getString("tcr"))){
				return  record.getString("tcr");
			}
			if(!tcr.equals(record.getString("hsr"))){
				return  record.getString("hsr");
			}
		}
	    return "72d7e3bd-f174-4609-ab40-b1145a145744";
	}
	
	public static void main(String[] args) {
		System.err.println(queryHsr("89d7cd69-90de-4b2a-8d00-7f0f607c4a89","6ee97c8d-5589-4b76-9586-c67b409ffc12"));
		
	}
}
