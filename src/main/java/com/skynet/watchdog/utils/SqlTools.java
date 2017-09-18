package com.skynet.watchdog.utils;

import java.util.List;
import java.util.Map;

import org.cox.dao.Condition;
import org.cox.dao.Dao;
import org.cox.dao.Sqls;
import org.cox.dao.entity.Record;
import org.cox.dao.impl.FileSqlManager;
import org.cox.dao.sql.Sql;

public abstract class SqlTools
{
    /**
     * 获取要执行人的sql语句
     * 
     * @param sqlFilePath
     * sql文件路径，包含文件名在内
     * @param sqlName
     * 要执行人的sql名称
     * @return
     */
    public static Sql getSql(String sqlFilePath, String sqlName)
    {
        Sql sql = Sqls.create(new FileSqlManager(sqlFilePath).get(sqlName));
        return sql;
    }

    /**
     * 获取要执行人的sql语句
     * 
     * @param sqlFilePath
     * sql文件路径，包含文件名在内
     * @param sqlName
     * 要执行人的sql名称
     * @param cnd
     * sql语句的条件
     * @return
     */
    public static Sql getSql(String sqlFilePath, String sqlName, Condition cnd)
    {
        Sql sql = Sqls.create(new FileSqlManager(sqlFilePath).get(sqlName));
        if (cnd != null)
        {
            sql.setCondition(cnd);
        }
        return sql;
    }

    /**
     * 查询数据
     * 
     * @param dao
     * 数据库连接对象dao
     * @param sql
     * 可以执行人的sql语句。可以通过【DBTool.getSql(...)】方法获取
     * @return 返回一个map记录列表（属性名称的大小写形式未作转换）
     */
    @SuppressWarnings("unchecked")
    public static List<Map<String, Object>> queryListMap(Dao dao, Sql sql)
    {
        sql.setCallback(Sqls.callback.maps());
        dao.execute(sql);
        // 根据回调函数 获得总记录数
        List<Map<String, Object>> list = (List<Map<String, Object>>) sql.getResult();
        return list;
    }

    /**
     * 查询数据
     * 
     * @param dao
     * 数据库连接对象dao
     * @param sql
     * 可以执行人的sql语句。可以通过【DBTool.getSql(...)】方法获取
     * @return 返回一个String记录列表(属性名称全部转成了小写形式)
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    public static List<String> queryListString(Dao dao, Sql sql)
    {
        sql.setCallback(Sqls.callback.strList());
        dao.execute(sql);
        // 根据回调函数 获得总记录数
        List<String> list = (List<String>) sql.getResult();
        return list;
    }

    /**
     * 查询数据
     * 
     * @param dao
     * 数据库连接对象dao
     * @param sql
     * 可以执行人的sql语句。可以通过【DBTool.getSql(...)】方法获取
     * @return 返回一条record记录(属性名称全部转成了小写形式)
     * @throws Exception
     */
    public static Record queryRecord(Dao dao, Sql sql)
    {
        sql.setCallback(Sqls.callback.record());
        dao.execute(sql);
        Record r = (Record) sql.getResult();
        return r;
    }

    /**
     * 获取Record列表
     * 
     * @param dao
     * @param sql
     * @return
     */
    @SuppressWarnings("unchecked")
    public static List<Record> queryRecords(Dao dao, Sql sql)
    {
        sql.setCallback(Sqls.callback.records());
        dao.execute(sql);
        List<Record> records = (List<Record>) sql.getResult();
        return records;
    }

    /**
     * 获取一个实体列表
     * 
     * @param classOfT 实体的class
     * @param dao
     * @param sql
     * @return
     */
    @SuppressWarnings("unchecked")
    public static <T extends Object> T queryForObj(Class<T> classOfT, Dao dao, Sql sql)
    {

        sql.setCallback(Sqls.callback.entity());
        sql.setEntity(dao.getEntity(classOfT));
        dao.execute(sql);
        // 根据回调函数 获得总记录数
        T obj = (T) sql.getResult();
        return obj;
    }

    /**
     * 获取一个实体列表
     * 
     * @param classOfT 实体的class
     * @param dao
     * @param sql
     * @return
     */
    @SuppressWarnings("unchecked")
    public static <T extends Object> List<T> queryListT(Class<T> classOfT, Dao dao, Sql sql)
    {
        sql.setCallback(Sqls.callback.entities());
        sql.setEntity(dao.getEntity(classOfT));
        dao.execute(sql);
        // 根据回调函数 获得总记录数
        List<T> list = (List<T>) sql.getResult();
        return list;
    }
    
    /**
     * 获取一个实体列表
     * 
     * @param classOfT 实体的class
     * @param dao
     * @param sql
     * @return
     */
    public static int count(Dao dao, Sql sql)
    {
        Sql cntsql = null;
        String key = sql.toString().toLowerCase();
        key = key.replaceAll("order(\\s+)by(\\s|\\w|\\W|\\d|\\D|.|\n)*", "");
        cntsql = Sqls.create("select count(*) as cnt from (" + key + ") COUNTT");
        cntsql.setCallback(Sqls.callback.record());
        dao.execute(cntsql);
        Record rd = (Record) cntsql.getResult();
        int total = rd.getInt("cnt");
        return total;
    }
    
    /**
     * 将一个以逗号隔开的字符串，封装成带单引号并且以逗号隔开的字符串。例如：“1,2,3” ---> "'1','2','3'"
     * 
     * @param needStr
     * @return 带单引号并且以逗号隔开的字符串
     */
    public static String getSqlInKey(String needStr)
    {
        if (needStr != null)
        {
            needStr = "'" + needStr.replaceAll(",", "','") + "'";
        }
        return needStr;
    }

}
