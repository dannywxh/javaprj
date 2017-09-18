package com.skynet.watchdog.utils;
/**

 * @Title: EntityToolkets.java

 * @Package com

 * @Description: TODO

 * Copyright: Copyright (c) 2014 

 * Company:昆明世科计算机网络有限公司

 * 

 * @author Comsys-tanfaquan

 * @date Jun 19, 2014 3:53:42 PM

 * @version V1.0

 */


import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Properties;

/**

 * @ClassName: EntityToolkets

 * @Description: TODO

 * @author Comsys-tanfaquan

 * @date Jun 19, 2014 3:53:42 PM

 *


 */

public class EntityToolkets {
	private boolean importUtil = false;
	private boolean importSql = false;
	private boolean importMath = false;
	class TableBean{
		private String name;
		private String remarks;
		private ArrayList<ColumnBean> columnList;
		
		public TableBean(String name, String remarks) {
			super();
			this.name = name;
			this.remarks = remarks;
		}
	
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getRemarks() {
			return remarks;
		}
		public void setRemarks(String remarks) {
			this.remarks = remarks;
		}

		public ArrayList<ColumnBean> getColumnList() {
			return columnList;
		}

		public void setColumnList(ArrayList<ColumnBean> columnList) {
			this.columnList = columnList;
		}
		
		public void addColumn(ColumnBean column){
			if(this.columnList==null){
				this.columnList = new ArrayList<ColumnBean>();
			}
			this.columnList.add(column);
		}
	}
	
	class ColumnBean{
		private String name;
		private String type;
		private String remarks;
		private String defaultValue;
		private int size;// 列名大小
		private int scale;// 列名小数精度
		
		
		public ColumnBean(String colname, String colType, String remarks,
				String defaultValue, int colSize, int colScale) {
			super();
			this.name = colname;
			this.type = colType;
			this.remarks = remarks;
			this.defaultValue = defaultValue;
			this.size = colSize;
			this.scale = colScale;
		}
		public String getColname() {
			return name;
		}
		public void setColname(String colname) {
			this.name = colname;
		}
		public String getColType() {
			return type;
		}
		public void setColType(String colType) {
			this.type = colType;
		}
		public String getRemarks() {
			return remarks;
		}
		public void setRemarks(String remarks) {
			this.remarks = remarks;
		}
		public int getColSize() {
			return size;
		}
		public void setColSize(int colSize) {
			this.size = colSize;
		}
		public int getColScale() {
			return scale;
		}
		public void setColScale(int colScale) {
			this.scale = colScale;
		}
		public String getDefaultValue() {
			return defaultValue;
		}
		public void setDefaultValue(String defaultValue) {
			this.defaultValue = defaultValue;
		}
	}

	
	
	 public static String getSchema(Connection conn) throws Exception {
			String schema;
			schema =conn.getMetaData().getUserName();
			if ((schema == null) || (schema.length() == 0)) {
			    throw new Exception("ORACLE数据库模式不允许为空");
			}
			return schema.toUpperCase().toString();
	}
	 
	 /**
		 * 解析处理(生成实体类主体代码)
	 * @param isAnnotaion TODO
		 */
		private String parse(TableBean table, boolean isAnnotaion) {
			StringBuffer sb = new StringBuffer();
			sb.append("\r\nimport java.io.Serializable;\r\n");
			if (importUtil) {
				sb.append("import java.util.Date;\r\n");
			}
			if (importSql) {
				sb.append("import java.sql.*;\r\n\r\n");
			}
			if(importMath){
				sb.append("import java.math.*;\r\n\r\n");
			}
			//表注释
//			processColnames(sb,table);
			if(table.getName()!=null&&isAnnotaion){
			sb.append("@Table(\"").append(table.getName().toLowerCase()).append("\")\t//").append(table.getRemarks()).append("\r\n");
			}
			sb.append("public class " + initcap(table.getName()) + " implements Serializable {\r\n");
			processAllAttrs(sb,table, isAnnotaion);
			processAllMethod(sb,table);
			sb.append("}\r\n");
			return sb.toString();

		}
	
		/**
		 * 处理列名,把空格下划线'_'去掉,同时把下划线后的首字母大写
		 * 要是整个列在3个字符及以内,则去掉'_'后,不把"_"后首字母大写.
		 * 同时把数据库列名,列类型写到注释中以便查看,
		 * @param sb
		 */
		public void processColnames(StringBuffer sb,TableBean table) {
			sb.append("\r\n/** " + table.getName() + "\r\n");
			String colsize="";
			ArrayList<ColumnBean> list = table.getColumnList();
			for (int i = 0; i < list.size(); i++) {
				colsize = list.get(i).getColSize()<=0? "" : (list.get(i).getColScale()<=0? "("+list.get(i).getColSize()+")" : "("+list.get(i).getColSize()+","+list.get(i).getColScale()+")");
				sb.append("\t" + list.get(i).getColname() +"	"+list.get(i).getColType()+ colsize+"\r\n");
				char[] ch = list.get(i).getColname().toCharArray();
				char c ='a';
				if(ch.length>3){
					for(int j=0;j <ch.length; j++){
						c = ch[j];
						if(c == '_'){
							if (ch[j+1]>= 'a' && ch[j+1] <= 'z') {
								ch[j+1]=(char) (ch[j+1]-32);
							}
						}
					}
				}
				//String str = new String(ch);
//				colnames[i] = str.replaceAll("_", "");
			}
			sb.append("*/\r\n");
		}
		/**
		 * 生成所有的方法
		 * 
		 * @param sb
		 */
		private void processAllMethod(StringBuffer sb,TableBean table) {
			ArrayList<ColumnBean> list = table.getColumnList();
			for (int i = 0; i < list.size(); i++) {
				sb.append("\tpublic void set" + initcap(list.get(i).getColname()) + "("
						+ oracleSqlType2JavaType(list.get(i).getColType(),list.get(i).getColScale(),list.get(i).getColSize()) + " " + list.get(i).getColname()
						+ "){\r\n");
				sb.append("\t\tthis." + list.get(i).getColname() + "=" + list.get(i).getColname() + ";\r\n");
				sb.append("\t}\r\n");

				sb.append("\tpublic " + oracleSqlType2JavaType(list.get(i).getColType(),list.get(i).getColScale(),list.get(i).getColSize()) + " get"
						+ initcap(list.get(i).getColname()) + "(){\r\n");
				sb.append("\t\treturn " + list.get(i).getColname() + ";\r\n");
				sb.append("\t}\r\n");
			}
		}

		/**
		 * 解析输出属性
		 * @param isAnnotaion TODO
		 * 
		 * @return
		 */
		private void processAllAttrs(StringBuffer sb,TableBean table, boolean isAnnotaion) {
			String type="";
			ArrayList<ColumnBean> list = table.getColumnList();
			sb.append("\tprivate static final long serialVersionUID = 1L;\r\n");
			for (int i = 0; i < list.size(); i++) {
				if(isAnnotaion){
				sb.append("\t@Column(\"").append(list.get(i).getColname()).append("\")\r\n");
				}
				type=oracleSqlType2JavaType(list.get(i).getColType(),list.get(i).getColScale(),list.get(i).getColSize());
				sb.append("\tprivate " + type + " "+list.get(i).getColname() + ";");
				if(list.get(i).getRemarks()!=null){
					sb.append("//").append(list.get(i).getRemarks());
				}
				if(type!=null&&type.equalsIgnoreCase("String")){
					sb.append(",字符长度:").append(list.get(i).getColSize());
				}
				if(list.get(i).getDefaultValue()!=null){
					sb.append(",默认值：").append(list.get(i).getDefaultValue());
				}
				sb.append("\n");
			}
			sb.append("\r\n");
		}

		/**
		 * 把输入字符串的首字母改成大写
		 * @param str
		 * @return
		 */
		private String initcap(String str) {
			char[] ch = str.toCharArray();
			if (ch[0] >= 'a' && ch[0] <= 'z') {
				ch[0] = (char) (ch[0] - 32);
			}
			return new String(ch);
		}

		/**
		 * Oracle
		 * @param sqlType
		 * @param scale
		 * @return
		 */
		private String oracleSqlType2JavaType(String sqlType, int scale,int size) {
			if (sqlType.equalsIgnoreCase("integer")) {
				return "Integer";
			} else if (sqlType.equalsIgnoreCase("long")) {
				return "Long";
			} else if (sqlType.equalsIgnoreCase("float")
					|| sqlType.equalsIgnoreCase("float precision")
					|| sqlType.equalsIgnoreCase("double")
					|| sqlType.equalsIgnoreCase("double precision")
					) {
				return "BigDecimal";
			}else if (sqlType.equalsIgnoreCase("number")
					||sqlType.equalsIgnoreCase("decimal")
					|| sqlType.equalsIgnoreCase("numeric")
					|| sqlType.equalsIgnoreCase("real")) {
				return scale==0? (size<10? "Integer" : "Long") : "BigDecimal";
			}else if (sqlType.equalsIgnoreCase("varchar")
					|| sqlType.equalsIgnoreCase("varchar2")
					|| sqlType.equalsIgnoreCase("char")
					|| sqlType.equalsIgnoreCase("nvarchar")
					|| sqlType.equalsIgnoreCase("nchar")) {
				return "String";
			} else if (sqlType.equalsIgnoreCase("datetime")
					|| sqlType.equalsIgnoreCase("date")
					|| sqlType.equalsIgnoreCase("timestamp")) {
				return "Date";
			}
			return null;
		}
	
		public  String tableNameToBean(String tableName, boolean isAnnotaion){
			Connection conn = getConnect();
			DatabaseMetaData dbmd;
			String table;
			String content="";
			try {
				dbmd = conn.getMetaData();
				 ResultSet resultSet = dbmd.getTables(null, "%", "%", new String[] { "TABLE" });
				    while (resultSet.next()) {
				    	table=resultSet.getString("TABLE_NAME"); 
				    	if(table.equalsIgnoreCase(tableName)){
				    		TableBean tableBean = new TableBean(table,resultSet.getString("REMARKS"));
				    		ResultSet rs =dbmd.getColumns(null, getSchema(conn),tableName.toUpperCase(), "%");//其他数据库不需要这个方法的，直接传null，这个是oracle和db2这么用
//				    		ResultSet rs = dbmd.getColumns(null, "%", tableName, "%");
//				    		ResultSetMetaData columnMetaData = rs.getMetaData();	
				    		while(rs.next()){
				    			ColumnBean columnBean = new ColumnBean(rs.getString("COLUMN_NAME").toLowerCase(), rs.getString("TYPE_NAME").toLowerCase(), rs.getString("REMARKS"),rs.getString("COLUMN_DEF"), rs.getInt("COLUMN_SIZE"), 0);
				    			tableBean.addColumn(columnBean);
				    		}
//				    		System.err.println(Json.toJson(tableBean));
				    		content = parse(tableBean, isAnnotaion);
//				    		try {
//				    			FileWriter fw = new FileWriter(initcap(tableBean.getName()) + ".java");
//				    			PrintWriter pw = new PrintWriter(fw);
//				    			pw.println(content);
//				    			pw.flush();
//				    			pw.close();
//				    		} catch (IOException e) {
//				    			e.printStackTrace();
//				    		}
				    		
				    	}
				    }
			} catch (Exception e1) {
				// TODO 自动生成的 catch 块
				e1.printStackTrace();
			}
			try {
				conn.close();
			} catch (SQLException e) {
				// TODO 自动生成的 catch 块
				e.printStackTrace();
			}
			return content;
		}
		
	public String selectSqlToBean(String selectSql,String className,boolean isAnnotaion){
//		String strsql = "SELECT * FROM  tablename WHERE ROWNUM=1"; //读一行记录;
		Connection conn = getConnect();
		String content="";
		try {
			PreparedStatement pstmt = conn.prepareStatement(selectSql);
			pstmt.executeQuery();
			ResultSetMetaData rsmd = pstmt.getMetaData();
			//int size = rsmd.getColumnCount(); // 共有多少列
			TableBean tableBean = new TableBean(className,className);
			for (int i = 0; i < rsmd.getColumnCount(); i++) {
				ColumnBean columnBean = new ColumnBean(rsmd.getColumnName(i + 1).toLowerCase(), rsmd.getColumnTypeName(i + 1), null,null, 0, 0);
				tableBean.addColumn(columnBean);
			}
			content = parse(tableBean, false);
//			try {
//				FileWriter fw = new FileWriter(initcap(className) + ".java");
//				PrintWriter pw = new PrintWriter(fw);
//				pw.println(content);
//				pw.flush();
//				pw.close();
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				if(conn!=null) conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		try {
			conn.close();
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		return content;
		
	}
	
	public Connection  getConnect(){
		Properties props =new Properties();
		props.put("remarksReporting","true");
		props.put("user","pm");
		props.put("password","pm");
		Connection conn = null;
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			conn =  DriverManager.getConnection("jdbc:oracle:thin:@10.166.7.240/dqbdb", props);
		} catch (ClassNotFoundException e2) {
			// TODO 自动生成的 catch 块
			e2.printStackTrace();
		} catch (SQLException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		return conn;
	}
	
	/**
	 * 根据java源代码生成java类文件
	 * @param javaSource            java源代码内容
	 * @param className             java类名称 
	 * @param createClassFilePath   java类生成路径
	 */
	public void create(String javaSource,String className,String createClassFilePath){
		File mkDirFile = new File(createClassFilePath);
		if(!mkDirFile.exists()){
			mkDirFile.mkdirs();
		}
		
		String filePathName = className+".java";
		System.err.println("路径: " + mkDirFile.getAbsolutePath() + ",className: " + filePathName);
		File javaSourceFile = new File(mkDirFile,filePathName);
		if(javaSourceFile.exists()){
			javaSourceFile.delete();
		}
		try {
			java.io.FileWriter fw = new FileWriter(javaSourceFile);
			fw.write(javaSource);
			fw.flush();
			fw.close();
		} catch (IOException e) {
			throw new RuntimeException("生成Java类文件出错..." + e.getMessage(), e);
		}				
		System.err.println("Java类生成"+(javaSourceFile.exists() ? "成功" : "失败")+",路径:" + javaSourceFile.getAbsolutePath());
	}
	
	public void createByTableNameToBean(String tableName, boolean isAnnotaion,String createClassFilePath){
		create(tableNameToBean(tableName, isAnnotaion), initcap(tableName), createClassFilePath);
		
	}
	
	public void createBySelectSqlToBean(String selectSql, String className,String ClassFilePath){
		create(selectSqlToBean(selectSql, className, false), className, ClassFilePath);
	}
	
	
	public static void main(String[] args) {
		EntityToolkets e = new EntityToolkets();
//		e.tableNameToBean("djd_yj", true);
//		e.selectSqlToBean("select t.* from USER_TAB_COLS t where TABLE_NAME =upper('djd_yj')", "test",false);
//		e.selectSqlToBean("select t.* from djd_yj t where 1 =1", "qqq",false);
//		e.createBySelectSqlToBean("select t.* from USER_TAB_COLS t where TABLE_NAME =upper('djd_yj')", "test", "d:\\");
//		e.createByTableNameToBean("djd_yj", true, "d:\\");
//		e.createByTableNameToBean("BZ_xdc", true, "C:\\Users\\Administrator\\Desktop\\dada");
//		e.createByTableNameToBean("bz_sjy", true, "C:\\Users\\Administrator\\Desktop\\dada");
//		e.createByTableNameToBean("bz_sjx", true, "C:\\Users\\Administrator\\Desktop\\dada");
//		e.createByTableNameToBean("task", true, "C:\\Users\\tfq\\Desktop\\d");
		e.createByTableNameToBean("task_action", true, "C:\\Users\\tfq\\Desktop\\d");
	}

}
