package com.skynet.watchdog.msg;

/**
 * 信息提示及数据对象存储类，可用于页面消息提示以及存储后台传输至页面的数据信息。
 * 
 * @author S_Autumn 2014年5月30日12:09:21
 *
 */
public class Message
{
    /** 提示消息的内容 */
    private String msg;
    /** 提示消息的图标 */
    private Flag flag;
    /** 操作结果 */
    private boolean result;
    /** 数据对象 */
    private Object data;
    /** 回调脚本方法名称 */
    private String okFunName;

    /**
     * 构造函数。将按默认设置标题内容和消息图标。
     */
    public Message()
    {
        setFlag(Flag.info);
    }

    /**
     * 构造函数。将按默认设置标题内容和消息图标。
     */
    public Message(Flag flag, String msg)
    {
        setMsg(msg);
        setFlag(flag);
    }

    /**
     * 获取提示消息的内容
     * 
     * @return
     */
    public String getMsg()
    {
        return msg;
    }

    /**
     * 设置提示消息内容
     * 
     * @param msg 消息内容
     */
    public void setMsg(String msg)
    {
        this.msg = msg;
    }

    /**
     * 获取消息图标
     * 
     * @return
     */
    public Flag getFlag()
    {
        return flag;
    }

    /**
     * 设置消息图标
     * 
     * @param flag
     */
    public void setFlag(Flag flag)
    {
        this.flag = flag;
    }

    /**
     * 获取操作结果
     * 
     * @return
     */
    public boolean getResult()
    {
        return result;
    }

    /**
     * 设置操作结果
     * 
     * @param result
     */
    public void setResult(boolean result)
    {
        this.result = result;
    }

    /**
     * 获取数据对象
     * 
     * @return
     */
    public Object getData()
    {
        return data;
    }

    /**
     * 设置数据对象
     * 
     * @param data
     */
    public void setData(Object data)
    {
        this.data = data;
    }

    public String getOkFunName()
    {
        return okFunName;
    }

    public void setOkFunName(String okFunName)
    {
        this.okFunName = okFunName;
    }

}
