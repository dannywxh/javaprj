package com;

public class Mythread {

	public static void main(String[] args) {
		// TODO 自动生成的方法存根

		
		new Thread(new Runnable(){

			@Override
			public void run() {
				// TODO 自动生成的方法存根
				synchronized (Mythread.class) {
					for(int i=0;i<50;i++){
						System.out.println("ssss");	
					}
				}
	
				
			}
			
		}).start();
		
		
		new Thread(new Runnable(){

			@Override
			public void run() {
				// TODO 自动生成的方法存根
				synchronized (Mythread.class) {
					for(int i=0;i<50;i++){
						System.out.println("bbbb");	
					}
				}

			}
			
		}).start();
	}

}
