package com.jzg.demo.spring.aop;

import com.jzg.demo.spring.aop.factory.Hello;
import com.jzg.demo.spring.ioc.service.HelloService;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @description: AdvicesTest
 * @author: JZG
 * @date: 2018/1/15 15:11
 * @version: v1.0.0
 */
public class AdvicesTest {

    /**
     * 使用ProxyFactoryBean创建
     */
    @Test
    public void test() {
        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext-aopfactory.xml");
        Hello hello = (Hello) applicationContext.getBean("helloProxy");

        hello.say();
    }

    /**
     * 使用XML配置实现切面
     */
    @Test
    public void test1() {
        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext-aopxml.xml");
        HelloService helloService = (HelloService) applicationContext.getBean("helloService");

        helloService.say();
    }


    /**
     * 使用注解使用切面
     */
    @Test
    public void test2() {
        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext-aopanno.xml");
        HelloService helloService = (HelloService) applicationContext.getBean("helloService");

        helloService.say();
    }


}