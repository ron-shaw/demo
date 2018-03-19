package com.jzg.demo.spring.ioc.service;

import com.jzg.demo.spring.ioc.dao.HelloDao;
import com.jzg.demo.spring.ioc.dao.HelloDaoImpl;

/**
 * @description: HelloService
 * @author: JZG
 * @date: 2018/1/11 14:16
 * @version: v1.0.0
 */
public class HelloServiceImpl implements HelloService {
    /**
     * helloDao
     */
    private HelloDao helloDao;

    /**
     * 传统做法，直接实例化一个对象
     */
    public HelloServiceImpl(){
        this.helloDao = new HelloDaoImpl();
    }

    /**
     * say
     */
    public void say(){
        helloDao.sayHello();
        System.out.println("HelloServiceImpl  直接实例化对象");
    }
}
