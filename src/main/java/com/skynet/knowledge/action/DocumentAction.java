package com.skynet.knowledge.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.cox.ioc.annotation.InjectName;
import org.cox.ioc.loader.annotation.Inject;
import org.cox.ioc.loader.annotation.IocBean;
import org.cox.log.Log;
import org.cox.log.Logs;
import org.cox.mvc.annotation.AdaptBy;
import org.cox.mvc.annotation.At;
import org.cox.mvc.annotation.Ok;
import org.cox.mvc.annotation.Param;
import org.cox.mvc.upload.FieldMeta;
import org.cox.mvc.upload.TempFile;
import org.cox.mvc.upload.UploadAdaptor;

import com.skynet.knowledge.bean.Catalog;
import com.skynet.knowledge.bean.Document;
import com.skynet.knowledge.bean.User;
import com.skynet.knowledge.services.DocumentService;
import com.skynet.knowledge.utils.KmUtils;
import com.skynet.watchdog.msg.Flag;
import com.skynet.watchdog.msg.Message;



@InjectName
@IocBean
@At(value = "/document", name = "文档管理")
public class DocumentAction {

	private static Log logger = Logs.get();

	@Inject
	private DocumentService documentService;

	@At(name = "显示文档列表页面")
	@Ok("jsp:/document/jsp/documentList.jsp")
	public Object showList() {
		HashMap<String, Object> map = new HashMap<String, Object>();
		return map;
	}

	@At(name = "初始化获取树数据")
	@Ok("json")
	public Object initTreeData() {
		return documentService.getTreeData();
	}

	@At(name = "获取一个目录的文档")
	@Ok("json")
	public Object getDocs(@Param("cid") String cid,@Param("docname") String name,
			@Param("version") String version,
			@Param("pageNumber") int page, @Param("pageSize") int rows)
			throws Throwable {

		// return documentService.getDocsByCId(cid);
		if (StringUtils.isEmpty(cid)){
			return documentService.queryDocs(name,version,page,rows);
		}else{
			return documentService.getDocPageDataByCId(cid, page, rows);	
		}
		

	}

	@At(name = "初始新增修改页面")
	@Ok("jsp:/document/jsp/documentAdd.jsp")
	public Object showEdit(@Param("id") String id) throws Throwable {
		return documentService.getDocById(id);

	}

	@At(name = "保存回复信息带附件")
	@AdaptBy(type = UploadAdaptor.class, args = { "ioc:myUpload" })
	@Ok("json")
	public Object saveFile(@Param("::document") Document doc,
			@Param("cid") String cid, @Param("importfile") TempFile tf,
			HttpServletRequest request,HttpServletResponse respone) {

		//避免前端无法解析json
		respone.setContentType("text/html");
		
		Message message = new Message();
		User user = (User)KmUtils.getLoginUser();
		if (null == user) {
			message.setFlag(Flag.error);
			message.setMsg("请先登录系统！");
			//return message;

		}

		if (tf == null) {

			message.setFlag(Flag.error);
			message.setMsg("没有选择文件上传！");
			message.setResult(false);
			return message;
		}

		String serverPath = request.getServletContext().getRealPath("/")
				+ "upload\\";

		/* 生成文件名随机数 */
		Random random = new Random();
		int num = (int) (random.nextDouble() * (99999 - 10000 + 1)) + 10000;
		SimpleDateFormat simpledata = new SimpleDateFormat("yyyyMMdd");
		String sdate = simpledata.format(new Date());
		String serverfilename = sdate + num;
		
		String filePath = serverPath+serverfilename;

		int byted = 0;

		File f = tf.getFile(); // 这个是保存的临时文件

		FileInputStream fi = null;
		FileOutputStream fo = null;

		try {

			fi = new FileInputStream(f);
			fo = new FileOutputStream(filePath);

			byte[] buf = new byte[1024];

			while ((byted = fi.read(buf)) != -1) {
				fo.write(buf, 0, byted);
			}
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		} finally {
			try {
				fi.close();
				fo.close();
			} catch (IOException e) {
				// TODO 自动生成的 catch 块
				e.printStackTrace();
			}
		}

		doc.setId(UUID.randomUUID().toString());
		doc.setCid(cid);
		doc.setCreator(user!=null?user.getName():"root");
		//doc.setCreatorip(user!=null?user.getLoginip():"localhost");
		doc.setCreatedate(new Date());
		
		FieldMeta meta = tf.getMeta(); // 这个原本的文件信息
		doc.setName(meta.getFileLocalName());
		doc.setContentType(meta.getContentType());
		doc.setFileExt(meta.getFileExtension());

		doc.setPath(serverfilename);

		message = documentService.saveDoc(doc);
		return message;

	}

	@At(name = "下载附件")
	@Ok("json")
	public void downLoad(@Param("id") String id, HttpServletRequest request,
			HttpServletResponse response) {

		Document record = documentService.getDocById(id);
		if ((record == null) || (record.getPath() == null)
				|| ("".equals(record.getPath()))) {
			response.setCharacterEncoding("UTF-8");
			response.setContentType("text/html");
			PrintWriter out = null;
			try {
				out = response.getWriter();
			} catch (IOException e) {
				logger.error(e);
			}
			out.print("<script type='text/javascript'>alert('文件下载失败!','warning');//return false;//window.location.href=\'showList\';</script>");
			out.flush();
			out.close();

			return;
		}


		String serverPath = request.getServletContext().getRealPath("/")
				+ "upload\\";

		// Message message = new Message();
		
		FileInputStream fi = null;
		ServletOutputStream sop = null;

		try {
			fi = new FileInputStream(serverPath + record.getPath());
		} catch (FileNotFoundException e2) {
			// TODO 自动生成的 catch 块
			e2.printStackTrace();
			response.setCharacterEncoding("UTF-8");
			response.setContentType("text/html");
			PrintWriter out = null;
			try {
				out = response.getWriter();
			} catch (IOException e1) {
				logger.error(e1);
			}
			out.print("<script type='text/javascript'>alert('文件没找到!','warning');return false;//window.location.href=\'showList\';</script>");

			out.flush();
			out.close();
			
            return;
		}

		//response.reset();
		response.setContentType(record.getContentType());
		String filename = null;
		try {
			filename = URLEncoder.encode(record.getName(), "utf-8");
			// filename = URLEncoder.encode("原型.7z", "utf-8");
		} catch (UnsupportedEncodingException e) {
			logger.error(e);
		}
		response.setHeader("Content-disposition", "attachment; filename="
				+ filename);

		try {
			sop = response.getOutputStream();

			byte[] buf = new byte[1024 * 2];

			int read = 0;
			while ((read = fi.read(buf)) != -1) {
				sop.write(buf, 0, read);
			}

			sop.flush();
			sop.close();

		} catch (IOException e) {
			logger.error(e);

		}
	}

	@At(name = "初始新增目录页面")
	@Ok("jsp:/document/jsp/catalogAdd.jsp")
	public Object AddNode(@Param("cid") String cid) throws Throwable {
		
		return null;

	}
	
	
	@At(name = "新增节点")
	@Ok("json")
	public Object insertNode(@Param("pid") String pid,@Param("name") String name) throws Throwable {
		
		Message message = new Message();
		User user = KmUtils.getLoginUser();

		Catalog cat=new Catalog();
		
		String id=UUID.randomUUID().toString().replaceAll("-", "");
		cat.setId(id);
		cat.setName(name);
		cat.setPid(pid);
		cat.setCreator(user==null?"root":user.getName());
		cat.setCreatedate(new Date());
		
		try{
			documentService.addCatalog(cat);
			
			Map<String ,String> m=new HashMap();
			
			m.put("id", id);
			m.put("name", name);
			
			message.setFlag(Flag.success);
			message.setMsg("增加节点成功！");
			message.setResult(true);
			message.setData(m);
			return message;
			
		}catch(Exception e){
			message.setFlag(Flag.error);
			message.setMsg("增加节点失败！");
			message.setResult(false);
			return message;
		}

	}
	
	
	@At(name = "更新节点名称")
	@Ok("json")
	public Object updateNode(@Param("id") String id,@Param("name") String name) throws Throwable {
		
		Message message = new Message();

		Catalog cat=new Catalog();
		
		try{
			documentService.updateCatalog(id, name);
			Map<String ,String> m=new HashMap();
			
			m.put("id", id);
			m.put("name", name);
			
			message.setFlag(Flag.success);
			message.setMsg("增加节点成功！");
			message.setResult(true);
			message.setData(m);
			return message;
			
		}catch(Exception e){
			message.setFlag(Flag.error);
			message.setMsg("增加节点失败！");
			message.setResult(false);
			return message;
		}

	}
}
