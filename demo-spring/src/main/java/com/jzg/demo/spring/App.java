package com.jzg.demo.spring;

import com.jzg.demo.spring.ioc.service.HelloService;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Hello world!
 */
public class App {
    /**
     * Main方法
     * @param args args
     */
    public static void main(String[] args) {

        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");

        HelloService helloService =  (HelloService) applicationContext.getBean("helloService");
        helloService.say();


        HelloService helloService2 =  (HelloService) applicationContext.getBean("helloService2");
        helloService2.say();


        HelloService helloService3 =  (HelloService) applicationContext.getBean("helloService3");
        helloService3.say();
    }
}
