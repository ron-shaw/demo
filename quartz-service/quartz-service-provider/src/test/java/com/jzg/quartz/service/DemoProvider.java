package com.jzg.quartz.service;

/**
 * Created by JZG on 2016/11/14.
 */
public class DemoProvider {
    public static void main(String[] args) {
        System.out.println("provider start main");
        com.alibaba.dubbo.container.Main.main(args);

        /*try {
            ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext(new String[]{"spring/quartz-service-provider-test.xml"});
            applicationContext.start();

            //System.in.read();
        } catch (Exception e) {
            log.error("context start error", e);
        }

        synchronized (DemoProvider.class) {
            while (true) {
                try {
                    DemoProvider.class.wait();
                } catch (InterruptedException e) {
                    log.error("synchronized error", e);
                }
            }
        }*/


    }
}
