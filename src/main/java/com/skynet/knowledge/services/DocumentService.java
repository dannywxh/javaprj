package com.skynet.knowledge.services;

import java.util.ArrayList;
import java.util.List;

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
import org.cox.ioc.loader.annotation.Inject;
import org.cox.ioc.loader.annotation.IocBean;
import org.cox.lang.Strings;
import org.cox.trans.Atom;
import org.cox.trans.Trans;

import com.skynet.knowledge.bean.Catalog;
import com.skynet.knowledge.bean.Document;
import com.skynet.watchdog.msg.Flag;
import com.skynet.watchdog.msg.Message;
import com.skynet.watchdog.utils.PageControl;

@IocBean
public class DocumentService {

	/**
	 * 数据库操作dao
	 */
	@Inject
	protected Dao dao;

	public Document getDocById(String id) {
		return dao.fetch(Document.class, id);
	}

	/**
	 * 测试类型数查询
	 * 
	 * @return
	 */
	public Object getTreeData() {

		List<Catalog> trees = new ArrayList<Catalog>();
		List<Catalog> treeNodes = dao.query(Catalog.class, null);
		if (treeNodes != null) {
			trees.addAll(treeNodes);
		}

		((NutDao) dao).setSqlManager(new FileSqlManager("sqls/km/doc.sqls"));
		// 设置可编辑性
		for (Catalog tree : trees) {
			// tree.setEdit("true");
		}
		// 获得指定文件的指定SQL
		Sql sql = Sqls.create(dao.sqls().get("queryXmlx"));
		sql.setCallback(new QueryRecordCallback());
		dao.execute(sql);
		List<Record> records = sql.getList(Record.class);
		for (Record r : records) {
			Catalog bean = new Catalog();
			bean.setId(r.getString("id"));
			bean.setName(r.getString("bt"));
			bean.setPid(null);
			// bean.setEdit("false");
			trees.add(bean);
		}

		return trees;
	}

	/**
	 * 根据目录id查询相应的文档
	 * 
	 * @param cid
	 * @return
	 */
	public Object getDocsByCId(String cid) {
		((NutDao) dao).setSqlManager(new FileSqlManager("sqls/km/doc.sqls"));
		Sql sql = Sqls.create(dao.sqls().get("getDocsByCId"));
		sql.vars().set("cid", cid);
		sql.setCallback(new QueryRecordCallback());
		dao.execute(sql);
		List<Record> docList = sql.getList(Record.class);
		return docList;
	}

	public Object getDocPageDataByCId(String cid, int pageNumber, int rows) {

		// Cnd cnd = Cnd.where("cid", "=", cid);

		// 获得一个sql文件信息
		((NutDao) dao).setSqlManager(new FileSqlManager("sqls/km/doc.sqls"));
		// 获得指定文件的指定SQL
		Sql sql = Sqls.create(dao.sqls().get("getDocsByCId"));
		sql.vars().set("cid", cid);
		int total = Daos.queryCount(dao, sql.toString());
		sql.setEntity(dao.getEntity(Record.class));
		// 获得分页
		Pager pager = dao.createPager(pageNumber, rows);
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

	
	public Object queryDocs(String name,String version, int pageNumber, int pageSize){
		
		Cnd cnd = Cnd.where("1", "=", "1");
		if (!Strings.isEmpty(name)) {
			cnd.and("name", "like", "%"+name+"%");
		}
		if (!Strings.isEmpty(version)) {
			cnd.and("version", "like", "%"+version+"%");
		}
		
		// 获得一个sql文件信息
		((NutDao) dao).setSqlManager(new FileSqlManager("sqls/km/doc.sqls"));
		// 获得指定文件的指定SQL
		Sql sql = Sqls.create(dao.sqls().get("getDocs"));
		sql.vars().set("where", cnd.toString());
		
		int total = Daos.queryCount(dao, sql.toString());
		sql.setEntity(dao.getEntity(Record.class));
		// 获得分页
		Pager pager = dao.createPager(pageNumber, pageSize);
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
	
	
	public Message saveDoc(Document doc) {
		Message message = new Message();
		try {
			Trans.exec(new Atom() {
				@Override
				public void run() {
					dao.insert(doc);

				}
			});
			message.setResult(true);
			message.setFlag(Flag.success);
			message.setMsg("文件上传成功！");
		} catch (Exception e) {
			message.setFlag(Flag.error);
			message.setMsg("文件上传失败！");
		}
		return message;
	}

	public void addCatalog(Catalog cat) {
		dao.insert(cat);
	}

	public void updateCatalog(String id, String name) {

		dao.update(Catalog.class, Chain.make("name", name),
				Cnd.where("id", "=", id));
	}

}
