package com.skynet.watchdog.config;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 资源配置对象
 * 
 * @author zxz
 * @version 2014-07-15
 */
@XmlRootElement(name = "resourceconfig")
public class ResourceConfig
{
    /**
     * 额外资源信息
     */
    public static class MastResource
    {
        @XmlElement(name = "item")
        public List<String> mastResource;
    }
    /**
     * 忽略资源信息
     */
    public static class PassResource
    {
        @XmlElement(name = "item")
        public List<String> passResource;
    }
    
    /**
     * 扫描路径
     */
    @XmlElement(name = "path")
    public String path = "";
    
    /**
     * 其他额外资源
     */
    @XmlElement(name = "mastResource")
    public MastResource MastResource;
    
    /**
     * 忽略的资源
     */
    @XmlElement(name = "passResource")
    public PassResource PassResource;
    
    public ResourceConfig()
    {

    }

    public ResourceConfig(String path, MastResource mastResource, PassResource passResource)
    {
        this.path = path;
        this.MastResource = mastResource;
        this.PassResource = passResource;
    }

}
