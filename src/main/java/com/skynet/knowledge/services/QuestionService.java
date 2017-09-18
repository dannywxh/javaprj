package com.skynet.knowledge.services;

import java.util.Date;
import java.util.List;
import java.util.UUID;

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
import org.cox.ioc.loader.annotation.Inject;
import org.cox.ioc.loader.annotation.IocBean;
import org.cox.lang.Lang;
import org.cox.lang.Strings;
import org.cox.lang.util.NutMap;
import org.cox.mvc.Mvcs;
import org.cox.trans.Atom;
import org.cox.trans.Trans;

import com.skynet.knowledge.bean.Attachment;
import com.skynet.knowledge.bean.Question;
import com.skynet.knowledge.bean.Reply;
import com.skynet.knowledge.bean.User;
import com.skynet.knowledge.utils.KmUtils;
import com.skynet.watchdog.msg.Flag;
import com.skynet.watchdog.msg.Message;
import com.skynet.watchdog.utils.PageControl;
import com.skynet.watchdog.utils.SqlTools;

@IocBean
public class QuestionService {

	/**
	 * 数据库操作dao
	 */
	@Inject
	protected Dao dao;

	public Question getQuestionById(String id) {
		return dao.fetch(Question.class, id);
	}

	/**
	 * 保存
	 * 
	 * @return
	 */
	public Message save(Question qst) {
		// TODO 自动生成的方法存根
		Message message = new Message();
		User user = (User)KmUtils.getLoginUser();
		if (null == user) {
			message.setFlag(Flag.error);
			message.setMsg("保存失败！");
			return message;
		}

		try {
			Trans.exec(new Atom() {
				@Override
				public void run() {
					// dao.insert(discuz);
				}
			});
			message.setResult(true);
			message.setFlag(Flag.success);
			message.setMsg("保存成功！");
		} catch (Exception e) {
			message.setFlag(Flag.error);
			message.setMsg("保存失败！");
		}
		return message;
	}

	/**
	 * 根据参数获取显示信息
	 * 
	 * @param params
	 *            查询参数
	 * @return
	 */
	public Object getIndexListData() throws Throwable {
		// 获得一个sql文件信息
		((NutDao) dao)
				.setSqlManager(new FileSqlManager("sqls/km/question.sqls"));
		// 获得指定文件的指定SQL
		Sql sql = Sqls.create(dao.sqls().get("getIndexList"));
		return SqlTools.queryRecords(dao, sql);
	}

	/*
	 * 获取分页数据，满足前端 $("#grid").dataGrid({}) 的格式要求：
	 */
	public Object getQueryListData(String type, String key, int rows, int page) {

		User u = (User) Mvcs.getHttpSession().getAttribute("user");
		if (u == null) {
			return null;
		}

		Cnd cnd = Cnd.where("1", "=", "1");
		if ("1".equals(u.getIsadmin())) { //admin
			if (!Strings.isEmpty(type) && !Strings.isEmpty(key)) {
				if (Strings.equals("tz", type)) {// 查标题
					cnd.and("title", "like", "%" + key + "%");
				} else {
					cnd.and("creatorname", "like", "%" + key + "%");
				}
			}
		} else {
			cnd.and("creator", "=", u.getId());

			if (!Strings.isEmpty(type) && !Strings.isEmpty(key)) {
				if (Strings.equals("tz", type)) {// 查标题
					cnd.and("title", "like", "%" + key + "%");
				}
			}
		}

		// cnd.desc("createdate");

		// 获得一个sql文件信息
		((NutDao) dao)
				.setSqlManager(new FileSqlManager("sqls/km/question.sqls"));
		// 获得指定文件的指定SQL
		Sql sql = Sqls.create(dao.sqls().get("getIndexList"));
		sql.vars().set("where", cnd.toString());
		int total = Daos.queryCount(dao, sql.toString());
		sql.setEntity(dao.getEntity(Record.class));
		// 获得分页
		Pager pager = dao.createPager(page, rows);
		pager.setRecordCount(total);
		// 重设 分页查询参数
		sql.setPager(pager);
		// 重设返回结果回调函数
		sql.setCallback(new QueryRecordCallback());
		// 第二次执行人
		dao.execute(sql);
		// 根据回调函数 分页查询结果
		List<Record> list = sql.getList(Record.class);
		return new PageControl(list, pager);
	}

	/**
	 * 获取帖子详细信息列表
	 * 
	 * @param id
	 *            帖子ID
	 * @return
	 */
	public Object getDetailData(String id, String userid, String desc,
			int rows, int page) {

		// 获得一个sql文件信息
		((NutDao) dao)
				.setSqlManager(new FileSqlManager("sqls/km/question.sqls"));
		// 获得指定文件的指定SQL
		Sql sql = Sqls.create(dao.sqls().get("getDetailData"));
		String where = " where r.qid = '" + id + "'";
		if (!Strings.isEmpty(userid)) {
			where = where + " and r.replierid = '" + userid + "'";
		}
		if (Strings.equals("desc", desc)) {// 排序
			where = where + " order by r.REPLYDATE desc";
		} else {
			where = where + " order by r.REPLYDATE asc";
		}
		sql.vars().set("where", where);
		int total = Daos.queryCount(dao, sql.toString());
		sql.setEntity(dao.getEntity(Record.class));
		// 获得分页
		Pager pager = dao.createPager(page, rows);
		pager.setRecordCount(total);
		// 重设 分页查询参数
		sql.setPager(pager);
		// 重设返回结果回调函数
		sql.setCallback(new QueryRecordCallback());
		// 第二次执行人
		dao.execute(sql);
		// 根据回调函数 分页查询结果
		List<Record> list = sql.getList(Record.class);
		return new PageControl(list, pager);
	}

	/**
	 * 保存帖子详细信息
	 * 
	 * @return
	 */
	public Message saveQuestion(Question question, List<Attachment> fjList) {
		// TODO 自动生成的方法存根
		Message message = new Message();
		User user =(User) KmUtils.getLoginUser();
		if (null == user) {
			message.setFlag(Flag.error);
			message.setMsg("请先登陆系统！");
			return message;
		}

		question.setId(UUID.randomUUID().toString());
		// question.setCreator(user.getId());
		question.setCreator(user.getName());
		question.setCreatedate(new Date());

		try {
			Trans.exec(new Atom() {
				@Override
				public void run() {

					if (fjList != null) {
						// ArrayList<FileBean> list = new ArrayList<FileBean>();
						for (Attachment fjBean : fjList) {
							if (fjBean != null) {
								fjBean.setGuid(UUID.randomUUID().toString());
								// list.add(new FileBean(fjBean.getGuid(),
								// fjBean.getFjmc()));
								dao.insert(fjBean);
							}
							// discuz.setFj(Json.toJson(list));
						}
					}

					dao.insert(question);
				}
			});
			message.setResult(true);
			message.setFlag(Flag.success);
			message.setMsg("帖子发布成功！");
		} catch (Exception e) {
			message.setFlag(Flag.error);
			message.setMsg("帖子发布失败！");
		}
		return message;
	}

	/**
	 * 获取帖子详细信息列表
	 * 
	 * @param qid
	 *            帖子ID
	 * @param rid
	 *            回复ID
	 * @return
	 */
	public Message initReply(String qid, String rid) {

		Message message = new Message();
		NutMap map = new NutMap();

		// 获取帖子信息
		Question question = dao.fetch(Question.class, qid);
		map.put("question", question);

		// 获取帖子信息

		if ((rid == null) || (rid.equals(""))) {
			map.put("reply", new Record());
		} else {
			Reply reply = dao.fetch(Reply.class, rid);
			map.put("reply", reply);

			if (!Lang.isEmpty(reply.getContent())) {

				reply.setContent(reply.getContent().replaceAll("</?.+?>", ""));
				if (reply.getContent().length() > 60) {
					reply.setContent(reply.getContent().substring(0, 60)
							+ "...");
				}
			}
			map.put("reply", reply);
		}

		message.setData(map);
		return message;
	}

	public Message saveReply(Reply reply, List<Attachment> fjList) {

		Message message = new Message();
		User user = (User)KmUtils.getLoginUser();
		if (null == user) {
			message.setFlag(Flag.error);
			message.setMsg("保存失败！请先登陆系统!");
			return message;
		}

		reply.setId(UUID.randomUUID().toString());
		reply.setReplierid(user.getId());
		reply.setRepliername(user.getName());
		//reply.setReplyip(user.getLoginip());
		reply.setReplydate(new Date());

		try {
			Trans.exec(new Atom() {
				@Override
				public void run() {
					if (fjList != null) {
						// ArrayList<FileBean> list = new ArrayList<FileBean>();
						for (Attachment attachment : fjList) {
							if (attachment != null) {
								attachment
										.setGuid(UUID.randomUUID().toString());
								// list.add(new FileBean(fjBean.getGuid(),
								// fjBean.getFjmc()));
								dao.insert(attachment);
							}
							// reply.setFj(Json.toJson(list));
						}
					}
					dao.insert(reply);

					// 更新帖子回复次数及回复内容

					Sql sql = Sqls
							.create("UPDATE km_question SET lastreplier='"
									+ user.getName()
									+ "',replycount = nvl(replycount,0) + 1 ,lastreplydate=sysdate WHERE id='"
									+ reply.getQid() + "'");
					dao.execute(sql);
				}
			});
			message.setResult(true);
			message.setFlag(Flag.success);
			message.setMsg("回复成功！");
		} catch (Exception e) {
			message.setFlag(Flag.error);
			message.setMsg("回复失败！");
		}
		return message;
	}

	public Record queryUser(String id) {
		return dao.fetch("sys_user", Cnd.where("id", "=", id));
	}
}
