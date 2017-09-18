package com.skynet.watchdog.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 

  * @ClassName: ResourceNote

  * @Description: 权限管理下，资源注解 用于资源的动态扫描入库

  * @author zxz

  * @date 2014年7月8日 下午2:42:06

  *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD,ElementType.TYPE })
@Documented
public @interface ResourceNote
{
    /**
     * 资源描述名称
     */
    String name() default "";
    /**
     * 资源地址
     */
    String url() default "";
    /**
     * 资源描述
     */
    String mark() default "";
    /**
     * 资源是否可用
     */
    boolean yxx() default true;
}
