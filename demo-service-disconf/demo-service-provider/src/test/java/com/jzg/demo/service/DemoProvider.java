package com.jzg.demo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by JZG on 2016/11/14.
 */
public class DemoProvider {
    private static Logger logger = LoggerFactory.getLogger("DemoProvider");

    public static void main(String[] args) {
        System.out.println("provider start main");
        com.alibaba.dubbo.container.Main.main(args);

        /*try {
            ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext(new String[]{"classpath:/META-INF/spring/spring-context.xml"});
            applicationContext.start();

            //System.in.read();
        } catch (Exception e) {
            logger.error("context start error", e);
        }

        synchronized (DemoProvider.class) {
            while (true) {
                try {
                    DemoProvider.class.wait();
                } catch (InterruptedException e) {
                    logger.error("synchronized error", e);
                }
            }
        }*/


    }
}
