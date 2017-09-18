package com.skynet.watchdog.log;

import java.io.File;
import java.util.Date;
import java.util.List;

import org.cox.aop.InterceptorChain;
import org.cox.dao.Condition;

import com.skynet.watchdog.log.pojo.BeanExceptionLog;

public interface LogException
{

    boolean saveLog(Throwable e);
    
    boolean saveLog(Class<? extends Throwable> e);
    
    boolean saveLog(Throwable e,InterceptorChain chain);
    
    boolean saveLog(Class<? extends Throwable> e,InterceptorChain chain);

    boolean saveLog(BeanExceptionLog  log);

    <E extends BeanExceptionLog> List<E> getLog(Class<E> type,BeanExceptionLog log, Date star, Date end);

    <E extends BeanExceptionLog> List<E> getLog(Class<E> type, Condition cnd);

    boolean importFileLog(File file);

    boolean exportFileLog(BeanExceptionLog log, Date star, Date end);

    boolean exportFileLog(Condition cnd);
}
