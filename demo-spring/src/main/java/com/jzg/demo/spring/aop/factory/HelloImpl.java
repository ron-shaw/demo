package com.jzg.demo.spring.aop.factory;

import com.jzg.demo.spring.ioc.service.HelloService;
import org.springframework.stereotype.Service;

/**
 * @description: HelloService
 * @author: JZG
 * @date: 2018/1/11 14:16
 * @version: v1.0.0
 */
public class HelloImpl implements Hello{
    /**
     * say
     */
    public void say(){
        System.out.println("HelloImpl say..........");
    }
}
