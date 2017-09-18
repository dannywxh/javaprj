package com.skynet.watchdog.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class ForceNoCacheFilter implements Filter {

	

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {
		 ((HttpServletResponse) response).setHeader("Cache-Control","no-cache");   
		 ((HttpServletResponse) response).setHeader("Pragma","no-cache");   
		 ((HttpServletResponse) response).setDateHeader ("Expires", -1);   
		 filterChain.doFilter(request, response);   
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO 自动生成的方法存根

	}
	
	@Override
	public void destroy() {
		// TODO 自动生成的方法存根

	}

}
