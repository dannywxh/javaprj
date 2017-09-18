package com;




public class A {
	public static void main(String[] args) {
		B a=(B)new C();
		
		a.run();
	}


}

class B {

	public void run(){
		System.out.println("call b");
	}
}
 class C extends B {

	//@Override
	public void run(){
		System.out.println("call C");
	}
}

