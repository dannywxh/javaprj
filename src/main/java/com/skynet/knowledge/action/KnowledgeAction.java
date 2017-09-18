package com.skynet.knowledge.action;

import java.util.HashMap;

import org.cox.ioc.annotation.InjectName;
import org.cox.ioc.loader.annotation.Inject;
import org.cox.ioc.loader.annotation.IocBean;
import org.cox.log.Log;
import org.cox.log.Logs;
import org.cox.mvc.annotation.At;
import org.cox.mvc.annotation.Ok;
import org.cox.mvc.annotation.Param;

import com.skynet.knowledge.bean.Knowledge;
import com.skynet.knowledge.services.KnowledgeService;
import com.skynet.watchdog.HtmlToolkets;
import com.skynet.watchdog.msg.Message;


@InjectName
@IocBean
@At(value = "/knowledge", name = "知识管理")
public class KnowledgeAction {
	private static Log logger = Logs.get();

	@Inject
	private KnowledgeService knowledgeService;
	
	
	@At(name = "显示知识列表页面")
	@Ok("jsp:/knowledge/jsp/knowledgeList.jsp")
	public Object showList(){	
		HashMap<String, Object> map = new HashMap<String, Object>();
		return map;
	}
	
	@At(name = "执行情况多条件组合查询")
	@Ok("json")
	public Object QueryByCnd(String title,String type, String tag) {
		return knowledgeService.klgQueryByCnd(title, type, tag);
	}
	
	
	@At(name = "[例子]列表页面并传入字典代码")
	@Ok("jsp:/knowledge/jsp/queryList.jsp")
	public Object showQueryList(){
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("rwzt", HtmlToolkets.createSelectByQuery("query_zt", "RWZT"));
		return map;
	}

	

	@At(name = "客户查询使用，列表分页数据")
	@Ok("json")
	public Object queryData(@Param("pageNumber")int pageNumber, @Param("pageSize")int pageSize){
		return knowledgeService.queryData(pageNumber,pageSize);
	}

	
	@At(name = "显示知识修改页面")
	@Ok("jsp:/knowledge/jsp/knowledgeEdit.jsp")
	public Object edit(String id){	
		
		Knowledge klg=knowledgeService.getKnowById(id);
		
		//HashMap<String, Object> map = new HashMap<String, Object>();
		return klg;
	}
	
	@At(name="保存信息")
	@Ok("json")
	public Object save(@Param("::knowledge") Knowledge know){

		if((know.getId()==null)||("".endsWith(know.getId()))){
			Message m = knowledgeService.insertKnowledge(know);
			return m;	
		}else
		{
			Message m = knowledgeService.updateKnowledge(know);
			return m;
		}
		
	}

	


	
	
}
