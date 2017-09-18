/**

 * @Title: HtmlToolkets.java

 * @Package com.skynet.inspect.console.config.toolkets

 * @Description: TODO

 * Copyright: Copyright (c) 2014 

 * Company:昆明世科计算机网络有限公�?

 * 

 * @author Comsys-tanfaquan

 * @date 2014�?6�?5�? 上午10:23:36

 * @version V1.0

 */


package com.skynet.watchdog;

import java.util.List;

import org.cox.dao.Dao;
import org.cox.dao.entity.Record;
import org.cox.mvc.Mvcs;



public class HtmlToolkets {
	
	
	
	
	public static String createSelect(String id,String name,String lx){
		List<DicBean> list = DicToolkets.queryList(lx);
		StringBuffer sb = new StringBuffer();
		sb.append("<select class='form-control'").append(" id='").append(id).append("'").append(" name='").append(name).append("' style=''>");
		for (int i = 0; i < list.size(); i++) {
			sb.append("<option value='").append(list.get(i).getDm()).append("'>").append(list.get(i).getMc());
			sb.append("</option>");
		}
		sb.append("</select>");
		return sb.toString();
	}

	public static String createSelect(String name,String lx){
		List<DicBean> list = DicToolkets.queryList(lx);
		return createSelectList(list, name);
	}
	
	public static String createSelectWhere(String name,String str){
		List<DicBean> list = DicToolkets.queryListStr(str);
		return createSelectList(list, name);
	}
	
	public static String createSelectList(List<DicBean> list,String name){
		StringBuffer sb = new StringBuffer();
		sb.append("<select class='form-control'").append(" name='").append(name).append("' style=''>");
		for (int i = 0; i < list.size(); i++) {
			sb.append("<option value='").append(list.get(i).getDm()).append("'>").append(list.get(i).getMc());
			sb.append("</option>");
		}
		sb.append("</select>");
		return sb.toString();
	}
	
	
	
	public static String createSelectByQuery(String name,String lx){
		List<DicBean> list = DicToolkets.queryList(lx);
		StringBuffer sb = new StringBuffer();
		sb.append("<select class='form-control'").append(" name='").append(name).append("' style=''>");
		sb.append("<option value='").append("").append("'>").append("全部");
		for (int i = 0; i < list.size(); i++) {
			sb.append("<option value='").append(list.get(i).getDm()).append("'>").append(list.get(i).getMc());
			sb.append("</option>");
		}
		sb.append("</select>");
		return sb.toString();
	}
	
	public static String createSelectByQueryInit(String name,String lx,String initValue){
		List<DicBean> list = DicToolkets.queryList(lx);
		StringBuffer sb = new StringBuffer();
		sb.append("<select class='form-control'").append(" name='").append(name).append("' style=''>");
		sb.append("<option value='").append("").append("'>").append("全部").append("</option>");
		for (int i = 0; i < list.size(); i++) {
			sb.append("<option value='").append(list.get(i).getDm());
			if(initValue.equals(list.get(i).getDm())){
				sb.append("' selected='selected'");
			}
			sb.append("'>").append(list.get(i).getMc());
			sb.append("</option>");

		}
		sb.append("</select>");
		return sb.toString();
	}
	
	public static String createSelectInitValue(String name,String lx,String initValue){
		List<DicBean> list = DicToolkets.queryList(lx);
		StringBuffer sb = new StringBuffer();
		sb.append("<select class='form-control'").append(" name='").append(name).append("' style=''>");
		for (int i = 0; i < list.size(); i++) {
			sb.append("<option value='").append(list.get(i).getDm());
			if(initValue.equals(list.get(i).getDm())){
				sb.append("' selected='selected'");
			}
			sb.append("'>").append(list.get(i).getMc());
			sb.append("</option>");
		}
		sb.append("</select>");
		return sb.toString();
	}
	
	public static String createSelectInitValueStr(String name,String str,String initValue){
		List<DicBean> list = DicToolkets.queryListStr(str);
		StringBuffer sb = new StringBuffer();
		sb.append("<select class='form-control'").append(" name='").append(name).append("' style=''>");
		for (int i = 0; i < list.size(); i++) {
			sb.append("<option value='").append(list.get(i).getDm());
			if(initValue.equals(list.get(i).getDm())){
				sb.append("' selected='selected'");
			}
			sb.append("'>").append(list.get(i).getMc());
			sb.append("</option>");
		}
		sb.append("</select>");
		return sb.toString();
	}
	 
	public static String createSelectUser(String name,String initValue){
		Dao dao = Mvcs.getIoc().get(Dao.class, "dao");
		List<Record> list = dao.query("SYS_USER", null);
		StringBuffer sb = new StringBuffer();
		sb.append("<select class='form-control span12'").append(" name='").append(name).append("' style=''>");
		for (int i = 0; i < list.size(); i++) {
			sb.append("<option value='").append(list.get(i).getString("id")).append("' ");
			if(list.get(i).getString("id").equals(initValue)){
				sb.append("' selected='selected'");
			}
			sb.append(">").append(list.get(i).getString("xm"));
			sb.append("</option>");
		}
		sb.append("</select>");
		return sb.toString();
	}
	
	public static String createSelectUserByQuery(String name){
		Dao dao = Mvcs.getIoc().get(Dao.class, "dao");
		List<Record> list = dao.query("SYS_USER", null);
		StringBuffer sb = new StringBuffer();
		sb.append("<select class='form-control'").append(" name='").append(name).append("' style=''>");
		sb.append("<option value='").append("").append("'>").append("全部");
		for (int i = 0; i < list.size(); i++) {
			sb.append("<option value='").append(list.get(i).getString("id")).append("'>").append(list.get(i).getString("xm"));
			sb.append("</option>");
		}
		sb.append("</select>");
		return sb.toString();
	}
}
