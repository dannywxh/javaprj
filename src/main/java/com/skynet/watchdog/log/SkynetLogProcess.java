package com.skynet.watchdog.log;

import java.util.Objects;

import org.cox.dao.entity.Dossier;
import org.cox.ioc.impl.NutIoc;
import org.cox.json.Json;
import org.cox.lang.Lang;
import org.cox.mvc.ActionContext;
import org.cox.mvc.Mvcs;
import org.cox.mvc.impl.processor.AbstractProcessor;

import com.skynet.watchdog.log.pojo.BeanExceptionLog;

public class SkynetLogProcess extends AbstractProcessor
{
    private LogException log;
    
    public SkynetLogProcess() throws Throwable{
        if(Lang.isEmpty(log)) {
            NutIoc ioc = (NutIoc) Mvcs.getIoc();
            
            log = ioc.get(LogExceptionLocal.class);
           
        }
    }

    @Override
    public void process(ActionContext ac) throws Throwable
    {
        try
        {

        	doNext(ac);
        }
        catch (Throwable e)
        {

        	String jsone = Json.toJson(e);
        	Dossier dossier = Json.fromJson(Dossier.class, jsone);

        	if (!Objects.isNull(dossier.get("log"))) {
        		dossier = Json.fromJson(Dossier.class, Json.toJson(dossier.get("log")));
        		BeanExceptionLog loginfo = dossier.toPojo(BeanExceptionLog.class);
        		log.saveLog(loginfo);
        	} else {
        		log.saveLog(e);
        	}

        	Lang.wrapThrow(e);
        }
    }
}
