package com;

public class Samp {

  public static void main(String[] args) {
	
	  String a="aaaa";
	  String b="bbbb";
	  
	 // Samp am=new Samp();
	 // am.swap(a,b);
	  
	  swap(a,b);
	  
	  System.out.println(a);
	  System.out.println(b);
	  
	  System.err.println(1==1);
	  
}
	
	public static void swap(String a,String b){
		
		String tmp=a;
		a=b;
		b=tmp;
		
	}
}
