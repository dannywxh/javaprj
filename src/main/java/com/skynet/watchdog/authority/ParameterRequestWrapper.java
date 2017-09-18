package com.skynet.watchdog.authority;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import org.cox.lang.Lang;
import org.cox.lang.util.NutMap;

public class ParameterRequestWrapper extends HttpServletRequestWrapper
{
    private Map<String,String[]> params= new HashMap<String,String[]>();
    
    public ParameterRequestWrapper(HttpServletRequest request, NutMap params)
    {
        super(request);
        this.params.putAll(request.getParameterMap());
        addParams(params);
    }
    
    @Override
    public String getParameter(String name){
        String[] values=params.get(name);
        if(Lang.isEmptyArray(values)){
            return null;
        }else{
            return values[0];
        }
    }
    
    @Override
    public String[] getParameterValues(String name){
        return params.get(name);
    }
    
    public void addParams(NutMap params){
        if(!Lang.isEmpty(params)){
            Set<String> keys = params.keySet();
            Iterator<String> it = keys.iterator();
            while (it.hasNext())
            {
                String key = it.next();
                addParam(key,params.get(key));
            }
            
        }
    } 
    
    public void addParam(String key,Object value){
        if(!Lang.isEmpty(value)){
            if(value instanceof String[]){
                params.put(key, (String[])value);
            }else if (value instanceof String){
                params.put(key, new String[] {(String)value});
            }else{
                params.put(key, new String[] {String.valueOf(value)});
            }
        }
    } 

}
