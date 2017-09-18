/**

 * @Title: DicToolkets.java

 * @Package com.skynet.inspect.console.config.toolkets

 * @Description: TODO

 * Copyright: Copyright (c) 2014 

 * Company:昆明世科计算机网络有限公�?

 * 

 * @author Comsys-tanfaquan

 * @date 2014�?6�?5�? 上午10:47:55

 * @version V1.0

 */


package com.skynet.watchdog;

import java.util.List;

import org.cox.dao.Cnd;
import org.cox.dao.Dao;
import org.cox.mvc.Mvcs;


public class DicToolkets {

	public static  List<DicBean> queryList(String lx){
		Dao dao = Mvcs.getIoc().get(Dao.class, "dao");
		return dao.query(DicBean.class,Cnd.where("lx", "=", lx).asc("px"));
	}
	
	public static  List<DicBean> queryListStr(String w){
		Dao dao = Mvcs.getIoc().get(Dao.class, "dao");
		return dao.query(DicBean.class,Cnd.wrap(w));
	}
	
	public static  String getDicMc(String lx,String v){
		Dao dao = Mvcs.getIoc().get(Dao.class, "dao");
		DicBean c = dao.fetch(DicBean.class,Cnd.where("lx", "=", lx).and("dm", "=", v));
		if(c!=null){
			return c.getMc();
		}
		return "";
		
	}
}
