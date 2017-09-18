/**
 * 
 */
package com.skynet;

import javax.servlet.ServletContext;

/**
 * @author jsq
 *
 */
public class AppToolkets {
	private ServletContext sc;  
	public String getPath(String path) 
	{       
		return sc.getRealPath(path);   
	}

}
