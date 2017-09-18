package com.skynet.watchdog.sys.authority;

import org.cox.dao.Dao;
import org.cox.ioc.annotation.InjectName;
import org.cox.ioc.loader.annotation.Inject;
import org.cox.ioc.loader.annotation.IocBean;

@IocBean
@InjectName("sysService")
public class BaseService
{
    /**
     * 数据库操作dao
     */
    @Inject
    protected Dao dao;
}
