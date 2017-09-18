package com.skynet;

import org.cox.mvc.annotation.ChainBy;
import org.cox.mvc.annotation.Encoding;
import org.cox.mvc.annotation.IocBy;
import org.cox.mvc.annotation.Modules;
import org.cox.mvc.ioc.provider.ComboIocProvider;

@Modules(scanPackage = true)
@Encoding(output = "UTF-8", input = "UTF-8")
@IocBy(type = ComboIocProvider.class, 
       args = { "*org.cox.ioc.loader.json.JsonLoader", "config/ioc/",
                "*org.cox.ioc.loader.annotation.AnnotationIocLoader",
                "com/skynet/" })
//@SetupBy(value=TimerTask.class)
@ChainBy(args={"config/chain/chain.js"})
public class MainModule
{
}
