package com.skynet.knowledge.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.cox.dao.entity.Record;
import org.cox.ioc.annotation.InjectName;
import org.cox.ioc.loader.annotation.Inject;
import org.cox.ioc.loader.annotation.IocBean;
import org.cox.log.Log;
import org.cox.log.Logs;
import org.cox.mvc.annotation.AdaptBy;
import org.cox.mvc.annotation.At;
import org.cox.mvc.annotation.By;
import org.cox.mvc.annotation.Filters;
import org.cox.mvc.annotation.Ok;
import org.cox.mvc.annotation.Param;
import org.cox.mvc.filter.CheckSession;
import org.cox.mvc.upload.FieldMeta;
import org.cox.mvc.upload.TempFile;
import org.cox.mvc.upload.UploadAdaptor;

import com.skynet.knowledge.bean.Attachment;
import com.skynet.knowledge.bean.Question;
import com.skynet.knowledge.bean.Reply;
import com.skynet.knowledge.services.QuestionService;
import com.skynet.watchdog.StringToolkets;
import com.skynet.watchdog.msg.Message;


@InjectName
@IocBean
@At(value = "/question", name = "问题管理")
public class QuestionAction {

	private static Log logger = Logs.get();
	
	@Inject
	private QuestionService questionService;
	
	@At(name = "导航到 初始化问题首页")
	@Ok("jsp:/question/jsp/questionIndex.jsp")
	public Object showIndex() throws Throwable {

		//return qstService.getIndexData();
		HashMap<String, Object> map = new HashMap<String, Object>();
		return map;
	}

	//grid的ajax里使用：url:'question/getIndexListData',
	@At(name = "获取问题列表数据")
	@Ok("json")
	public Object getIndexListData() throws Throwable {

		return questionService.getIndexListData();
	}
	

	
	@At(name = "第二种写法：导航到 初始化问题首页")
	@Ok("jsp:/question/jsp/questionList.jsp")
	@Filters(@By(type=CheckSession.class, args={"user", "/sysuser/goLogin"}))
	public Object showList() throws Throwable {

		//return qstService.getIndexData();
		HashMap<String, Object> map = new HashMap<String, Object>();
		return map;
	}
	
	@At(name = "获取查询列表数据")
	@Ok("json")
	@Filters(@By(type=CheckSession.class, args={"user", "/sysuser/goLogin"}))
	public Object getQueryListData(@Param("query_type") String type,@Param("query_key") String key, @Param("rows") int rows, @Param("page") int page) throws Throwable {

		return questionService.getQueryListData(type,key,rows,page);
	}
	
	@At(name = "初始化帖子详细信息")
	@Ok("jsp:/question/jsp/questionDetail.jsp")
	@Filters(@By(type=CheckSession.class, args={"user", "/sysuser/goLogin"}))
	public Object showDetail(@Param("id") String id) throws Throwable {

		return questionService.getQuestionById(id);
	}
	
	
	@At(name = "初始化发帖页面")
	@Ok("jsp:/question/jsp/questionAdd.jsp")
	@Filters(@By(type=CheckSession.class, args={"user", "/sysuser/goLogin"}))
	public Object showAdd(@Param("id") String id) throws Throwable {

		Message message = new Message();
		message.setData(id);
		return message;
	}

	
	@At(name="保存帖子信息")
	@Ok("json")
	public Object saveQuestion(@Param("::question") Question question){

		Message m = questionService.saveQuestion(question, null);
		return m;
	}
	
	
	@At(name = "获取回复详细数据")
	@Ok("json")
	public Object getDetailData(@Param("id") String id,
			@Param("userid") String userid,
			@Param("desc") String desc,
			@Param("rows") int rows, @Param("page") int page) throws Throwable {

		return questionService.getDetailData(id,userid,desc,rows,page);
	}
	
	
	@At(name = "初始化回复页面")
	@Ok("jsp:/question/jsp/questionReply.jsp")
	public Object showReply(@Param("qid") String qid,@Param("rid") String rid) throws Throwable {

		Message message = new Message();
		message = questionService.initReply(qid,rid);
		return message;
	}
	
	
	@At(name="保存回复信息")
	@Ok("json")
	public Object saveReply(@Param("::reply") Reply reply){

		Message m = questionService.saveReply(reply, null);
		return m;
	}
	
	@At(name="保存回复信息带附件")
	@AdaptBy(type = UploadAdaptor.class, args = {"ioc:myUpload" })
	@Ok("json")
	public Object saveReplyFile(@Param("::reply") Reply reply,@Param("importfile") TempFile[] tfs) {
		String uuid=UUID.randomUUID().toString().replaceAll("-", "");
		reply.setId(uuid);
		List<Attachment> fj=new ArrayList<Attachment>();
		if(tfs!=null){
			for (int i = 0; i < tfs.length; i++) {
				if(tfs[i]==null) continue;             
				// 这个是保存的临时文件
				File tf = tfs[i].getFile();
				FieldMeta meta = tfs[i].getMeta();               
				// 这个原本的文件信息   
				String oldName = meta.getFileLocalName();
				Attachment f = new Attachment();
				f.setGlid(uuid);
				f.setFjmc(oldName);
				f.setFjlx(meta.getContentType());//
				f.setFjhzm(meta.getFileExtension());
				try {
					f.setFjnr(new FileInputStream(tf));
				} catch (FileNotFoundException e) {

				}
				f.setWjdx(tf.length());
				fj.add(f);
			}
		}
		Message m = questionService.saveReply(reply, fj);
		return m;
	}
	
	
	@At(name = "显示头像")
    public void showImg(@Param("id") String id,HttpServletResponse response) throws Throwable{
    	
    	byte[] byteArray=null;
    	Record u = questionService.queryUser(id);
		if(u!=null){
			Object obj = u.get("tx");
			if(obj!=null){
				Blob b=(Blob)obj;	
				try {
					byteArray = StringToolkets.Bytes(b.getBinaryStream());
				} catch (SQLException e) {
					
				}
			}
		}
		response.reset();
		if(byteArray!=null){
			
			response.setContentType("image/jpg");
			ServletOutputStream sop = response.getOutputStream();
			sop.write(byteArray, 0, byteArray.length);
			sop.close();
			sop = null;
			response.flushBuffer();
		} else{
			ClassLoader loader = getClass().getClassLoader();
			InputStream is = loader.getResourceAsStream("com/skynet/skkl/img_user.gif");
			ServletOutputStream sop = response.getOutputStream();
			byte[] buf = new byte[1024];
			int len;
			while ((len = is.read(buf)) != -1)
			{
				sop.write(buf, 0, len);
			}
			sop.close();
			sop = null;
			is.close();
			is = null;
			response.flushBuffer();
		}
	}
	
}
