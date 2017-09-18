package com.skynet.watchdog.utils;

import java.util.ArrayList;
import java.util.List;

import org.cox.dao.Condition;
import org.cox.dao.Dao;
import org.cox.dao.Sqls;
import org.cox.dao.entity.Record;
import org.cox.dao.impl.FileSqlManager;
import org.cox.dao.impl.NutDao;
import org.cox.dao.pager.Pager;
import org.cox.dao.sql.Sql;

/**
 * 
 * ver(1.0) 邹小舟 2014-05-18 新建
 * 
 */
public class PageControl
{
    private List<Record> rows;

    private int total;

    private Pager pager;

    private List<String> ck;

    public PageControl()
    {
        rows = new ArrayList<Record>();
        ck = new ArrayList<String>();
        total = 0;
        pager = new Pager();
        pager.setPageNumber(1);
        pager.setPageSize(10);
        pager.setRecordCount(0);
    }

    public PageControl(List<Record> rows)
    {
        this.setRows(rows);
    }

    public PageControl(List<Record> rows, Pager pager)
    {
        this.setRows(rows);
        this.setPager(pager);
        if (pager != null)
        {
            this.total = pager.getRecordCount();
        }
    }

    public PageControl(List<Record> rows, List<String> ck)
    {
        this.setRows(rows);
        this.setCk(ck);
    }

    public PageControl(List<Record> rows, Pager pager, List<String> ck)
    {
        this.setRows(rows);
        this.setPager(pager);
        this.setCk(ck);
        if (pager != null)
        {
            this.total = pager.getRecordCount();
        }
    }

    @SuppressWarnings("unchecked")
    public PageControl(Dao dao, Sql sql, int pageNumber, int pageSize, List<String> ck)
    {
        String version = dao.meta().getProductName().toLowerCase();
        Sql cntsql = null;
        if (version.indexOf("oracle") > -1)
        {
            cntsql = Sqls.create("select count(*) as cnt from (" + sql.toString() + ") COUNTT");
        }
        else
        {
            String key = sql.toString().toLowerCase();
            key = key.replaceAll("order(\\s+)by(\\s|\\w|\\W|\\d|\\D|.|\n)*", "");
            cntsql = Sqls.create("select count(*) as cnt from (" + key + ") COUNTT");
        }
        // 设置回调函数
        cntsql.setCallback(Sqls.callback.record());
        // 第一次查询 通过回调函数取得总行数
        dao.execute(cntsql);
        // 根据回调函数 获得总记录数
        Record rd = (Record) cntsql.getResult();
        int total = rd.getInt("cnt");

        // 获得分页
        Pager pager = dao.createPager(pageNumber, pageSize);
        pager.setRecordCount(total);
        // 重设 分页查询参数
        sql.setPager(pager);
        // 重设返回结果回调函数
        sql.setCallback(Sqls.callback.records());
        // 第二次执行人
        dao.execute(sql);
        this.setRows((List<Record>) sql.getResult());
        this.setPager(pager);
        this.setTotal(total);
        this.setCk(ck);
    }

    @SuppressWarnings("unchecked")
    public PageControl(Dao dao, String sqlPath, String SqlName, Condition c, int pageNumber, int pageSize,
            List<String> ck)
    {
        // 获得一个sql文件信息
        ((NutDao) dao).setSqlManager(new FileSqlManager(sqlPath));
        // 获得指定文件的指定SQL
        Sql sql = Sqls.create(dao.sqls().get(SqlName));
        // 设置查询条件
        sql.setCondition(c);
        String version = dao.meta().getProductName().toLowerCase();
        Sql cntsql = null;
        if (version.indexOf("oracle") > -1)
        {
            cntsql = Sqls.create("select count(*) as cnt from (" + sql.toString() + ") COUNTT");
        }
        else
        {
            String key = sql.toString().toLowerCase();
            key = key.replaceAll("order(\\s+)by(\\s|\\w|\\W|\\d|\\D|.|\n)*", "");
            cntsql = Sqls.create("select count(*) as cnt from (" + key + ") COUNTT");
        }
        // 设置回调函数
        cntsql.setCallback(Sqls.callback.record());
        // 第一次查询 通过回调函数取得总行数
        dao.execute(cntsql);
        // 根据回调函数 获得总记录数
        Record rd = (Record) cntsql.getResult();
        int total = rd.getInt("cnt");

        // 获得分页
        Pager pager = dao.createPager(pageNumber, pageSize);
        pager.setRecordCount(total);
        // 重设 分页查询参数
        sql.setPager(pager);
        // 重设返回结果回调函数
        sql.setCallback(Sqls.callback.records());
        // 第二次执行人
        dao.execute(sql);
        this.setRows((List<Record>) sql.getResult());
        this.setPager(pager);
        this.setTotal(total);
        this.setCk(ck);
    }

    public List<Record> getRows()
    {
        return rows;
    }

    public void setRows(List<Record> rows)
    {
        if (rows == null)
        {
            rows = new ArrayList<Record>();
        }
        this.rows = rows;
    }

    public Pager getPager()
    {
        return pager;
    }

    public void setPager(Pager pager)
    {
        this.pager = pager;
    }

    public int getTotal()
    {
        return total;
    }

    public void setTotal(int total)
    {
        this.total = total;
    }

    public List<String> getCk()
    {
        return ck;
    }

    public void setCk(List<String> ck)
    {
        if (ck == null)
        {
            ck = new ArrayList<String>();
        }
        this.ck = ck;
    }
}
