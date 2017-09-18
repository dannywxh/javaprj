package com.skynet.watchdog.log;

import org.cox.aop.InterceptorChain;
import org.cox.aop.MethodInterceptor;
import org.cox.ioc.loader.annotation.Inject;
import org.cox.ioc.loader.annotation.IocBean;

@IocBean
public class LogExceptionAop implements MethodInterceptor
{
    @Inject
    private LogExceptionLocal logException;

    @Override
    public void filter(InterceptorChain chain)
    {
        try
        {
            chain.doChain();
        }
        catch (Throwable e)
        {
            logException.saveLog(e);
        }
    }

}
