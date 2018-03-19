package com.jzg.demo.spring.ioc.service;

import com.jzg.demo.spring.ioc.dao.HelloDao;

/**
 * @description: HelloService
 * @author: JZG
 * @date: 2018/1/11 14:16
 * @version: v1.0.0
 */
public class HelloServiceImpl2 implements HelloService {
    /**
     * helloDao
     */
    private HelloDao helloDao;

    /**
     * 构造函数注入
     */
    public HelloServiceImpl2(HelloDao helloDao){
        this.helloDao = helloDao;
    }


    /**
     * say
     */
    public void say(){
        helloDao.sayHello();
        System.out.println("HelloServiceImpl2  构造函数注入");
    }
}
