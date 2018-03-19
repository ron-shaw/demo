package com.jzg.demo.spring.ioc.service;

import com.jzg.demo.spring.ioc.dao.HelloDao;

/**
 * @description: HelloService
 * @author: JZG
 * @date: 2018/1/11 14:16
 * @version: v1.0.0
 */
public class HelloServiceImpl3 implements HelloService {


    /**
     * helloDao
     */
    private HelloDao helloDao;


    /**
     * 属性注入
     *
     * @param helloDao helloDao
     */
    public void setHelloDao(HelloDao helloDao) {
        this.helloDao = helloDao;
    }



    /**
     * say
     */
    public void say(){
        helloDao.sayHello();
        System.out.println("HelloServiceImpl3  属性注入");
    }
}
