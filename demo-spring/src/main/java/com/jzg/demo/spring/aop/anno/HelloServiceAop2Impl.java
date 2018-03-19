package com.jzg.demo.spring.aop.anno;

import com.jzg.demo.spring.ioc.service.HelloService;
import org.springframework.stereotype.Service;

/**
 * @description: HelloService
 * @author: JZG
 * @date: 2018/1/11 14:16
 * @version: v1.0.0
 */
@Service("helloService")
public class HelloServiceAop2Impl implements HelloService {
    /**
     * say
     */
    public void say(){
        System.out.println("HelloServiceAop2Impl say..........");
    }
}
