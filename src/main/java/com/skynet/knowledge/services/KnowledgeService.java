package com.skynet.knowledge.services;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.cox.dao.Chain;
import org.cox.dao.Cnd;
import org.cox.dao.Dao;
import org.cox.dao.Sqls;
import org.cox.dao.entity.Record;
import org.cox.dao.impl.FileSqlManager;
import org.cox.dao.impl.NutDao;
import org.cox.dao.impl.sql.callback.QueryRecordCallback;
import org.cox.dao.pager.Pager;
import org.cox.dao.sql.Sql;
import org.cox.dao.util.Daos;
import org.cox.dao.util.cri.SqlExpression;
import org.cox.ioc.loader.annotation.Inject;
import org.cox.ioc.loader.annotation.IocBean;
import org.cox.lang.Strings;
import org.cox.mvc.Mvcs;
import org.cox.trans.Atom;
import org.cox.trans.Trans;

import com.skynet.knowledge.bean.Knowledge;
import com.skynet.watchdog.msg.Flag;
import com.skynet.watchdog.msg.Message;
import com.skynet.watchdog.sys.bean.BeanLoginUser;
import com.skynet.watchdog.utils.PageControl;
import com.skynet.watchdog.utils.SkynetUtils;


@IocBean
public class KnowledgeService {

	/**
	 * 数据库操作dao
	 */
	@Inject
	protected Dao dao;

	public Knowledge getKnowById(String id) {
		return dao.fetch(Knowledge.class, id);
	}

	/**
	 * 保存
	 * 
	 * @return
	 */
	public Message insertKnowledge(Knowledge know) {
		// TODO 自动生成的方法存根
		Message message = new Message();
		BeanLoginUser user = SkynetUtils.getLoginUser();
		if (null == user) {
			message.setFlag(Flag.error);
			message.setMsg("保存失败！");
			return message;
		}
        
		know.setId(UUID.randomUUID().toString());
		
		know.setCreator(user.getXm());
		know.setCreatedate(new Date());
		
		
		try {
			Trans.exec(new Atom() {
				@Override
				public void run() {
					dao.insert(know);	 
				}
			});
			message.setResult(true);
			message.setFlag(Flag.success);
			message.setMsg("新增成功！");
		} catch (Exception e) {
			message.setFlag(Flag.error);
			message.setMsg("新增失败！");
		}
		return message;
	}

	/**
	 * 保存
	 * 
	 * @return
	 */
	public Message updateKnowledge(Knowledge know) {
		// TODO 自动生成的方法存根
		Message message = new Message();
		BeanLoginUser user = SkynetUtils.getLoginUser();
		if (null == user) {
			message.setFlag(Flag.error);
			message.setMsg("保存失败！");
			return message;
		}

		try {
			Trans.exec(new Atom() {
				@Override
				public void run() {
					  dao.update(Knowledge.class, Chain.make("tag",  know.getTag())
							  .add("content", know.getContent())
							  .add("type", know.getType()), Cnd.where("id", "=", know.getId()));
					  
					  
						 
				}
			});
			message.setResult(true);
			message.setFlag(Flag.success);
			message.setMsg("修改成功！");
		} catch (Exception e) {
			message.setFlag(Flag.error);
			message.setMsg("修改失败！");
		}
		return message;
	}
	
	/**
	 * @param csyl
	 * @param bh
	 * @param bb
	 * @param sftg
	 * @return
	 */
	public Object klgQueryByCnd(String title, String type, String tag) {
		// 获得一个sql文件信息
		((NutDao) dao).setSqlManager(new FileSqlManager("sqls/km/km.sqls"));
		// 获得指定文件的指定SQL
		Sql sql = Sqls.create(dao.sqls().get("showListData"));
		String where = " where 1=1 ";

		if (title != null && !"".equals(title)) {
			where += " and title like '%" + title + "%' ";

		}
		if (type != null &&!"".equals(type)) {
			
			if (!type.equals("0")){
				where += " and type='" + type + "' ";	
			}
			
		}

		if (tag != null && !"".equals(tag)) {
			where += " and tag like '%" + tag + "%' ";
		}

		sql.vars().set("where", where);
		sql.setCallback(new QueryRecordCallback());

		dao.execute(sql);
		List<Record> klgs = sql.getList(Record.class);
		return klgs;
	}


	
	//提供客户进行全文检索，先用这个方法
	public Object queryData(int page, int rows) {
		HttpServletRequest req = Mvcs.getReq();
		Cnd cnd = Cnd.where("1", "=", 1);
		String tcsj = "";
		if (!Strings.isBlank(req.getParameter("query_type"))) {// 普通查询
			if ("q".equals(req.getParameter("query_type"))) {//所有字段查询
				if (!Strings.isBlank(req.getParameter("query_key"))) {
					// cnd.and("t.bt", "LIKE", "%" +
					// req.getParameter("query_key") + "%");
					// cnd.or("t.nrms", "LIKE", "%" +
					// req.getParameter("query_key") + "%)");
					SqlExpression e = Cnd
							.exps("t.title", "LIKE",
									"%" + req.getParameter("query_key") + "%")
							.or("t.content", "LIKE",
									"%" + req.getParameter("query_key") + "%")
							.or("t.tag", "LIKE",
									"%" + req.getParameter("query_key") + "%");
					cnd.and(e);
				}
			} else {
				if (!Strings.isBlank(req.getParameter("query_key"))) {
					if ("title".equals(req.getParameter("query_type"))) {
						cnd.and("title", "LIKE",
								"%" + req.getParameter("query_key") + "%");
					} else if ("tag".equals(req.getParameter("query_type"))) {
						cnd.and("tag", "LIKE",
								"%" + req.getParameter("query_key") + "%");
					} else if ("content".equals(req.getParameter("query_type"))) {
						cnd.and("content", "LIKE",
								"%" + req.getParameter("query_key") + "%");
					} else {
						cnd.and("t." + req.getParameter("query_type"), "LIKE",
								"%" + req.getParameter("query_key") + "%");
					}
				}
			}
		} else {
			if (!Strings.isBlank(req.getParameter("query_begin"))) {
				tcsj = tcsj
						+ Cnd.format(
								" AND trunc(t.CREATEDATE) >= to_date('%s:00','yyyy-MM-dd hh24:mi:ss')",
								req.getParameter("query_begin")).toString();
				// cnd.and(Cnd.exps("trunc(t.tcsj)", ">=",
				// "to_date('"+req.getParameter("query_begin")+":00','yyyy-MM-dd hh24:mi:ss')"));
			}
			if (!Strings.isBlank(req.getParameter("query_end"))) {
				tcsj = tcsj
						+ Cnd.format(
								" AND trunc(t.CREATEDATE) < to_date('%s:00','yyyy-MM-dd hh24:mi:ss')",
								req.getParameter("query_end")).toString();
				// cnd.and(Cnd.exps("trunc(t.tcsj)", "<=",
				// "to_date('"+req.getParameter("query_end")+":00','yyyy-MM-dd hh24:mi:ss')"));
			}
			if (!Strings.isBlank(req.getParameter("query_title"))) {
				cnd.and("t.title", "LIKE", "%" + req.getParameter("query_title")
						+ "%");
			}
			if (!Strings.isBlank(req.getParameter("query_tag"))) {
				cnd.and("t.tag", "LIKE", "%" + req.getParameter("query_tag")
						+ "%");
			}
			
			if (!Strings.isBlank(req.getParameter("query_content"))) {
				cnd.and("t.content", "LIKE", "%" + req.getParameter("query_content")
						+ "%");
			}

			if (!Strings.isBlank(req.getParameter("query_type"))) {
				cnd.and("t.type", "=", req.getParameter("query_type"));
			}
		}
		// 获得一个sql文件信息
		((NutDao) dao).setSqlManager(new FileSqlManager("sqls/km/km.sqls"));
		// 获得指定文件的指定SQL
		Sql sql = Sqls.create(dao.sqls().get("showListData"));
		sql.vars().set("where", cnd.toString() + tcsj);

		int total = Daos.queryCount(dao, sql.toString());
		// 第一次查询 通过回调函数取得总行数
		// dao.execute(sql);
		// 根据回调函数 获得总记录数
		// int total = (int) sql.getResult();
		// 获得分页
		Pager pager = dao.createPager(page, rows);
		pager.setRecordCount(total);
		// 重设 分页查询参数
		sql.setPager(pager);
		// 重设返回结果回调函数
		sql.setCallback(new QueryRecordCallback());
		// 第二次执行
		dao.execute(sql);
		// 根据回调函数 分页查询结果
		List<Record> list = sql.getList(Record.class);
		return new PageControl(list, pager);

	}

}
