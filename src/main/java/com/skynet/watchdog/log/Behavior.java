package com.skynet.watchdog.log;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.FIELD,ElementType.TYPE})
public @interface Behavior
{
    /**
     * 字典名称
     */
    String name() default "";

    /**
     * 字典父编码
     */
    String pcode() default "";

    /**
     * 字典类型
     */
    String msg() default "";

    /**
     * 方法描述
     */
    String answer() default "";

    /**
     * 方法是否可用
     */
    boolean flag() default true;
}
