package com.jzg.demo.spring.annotation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @description: AutowireBean
 * @author: JZG
 * @date: 2018/1/15 10:29
 * @version: v1.0.0
 */
@Component
public class AutowireBean {

    /**
     * Hello Service
     */
    @Autowired
    private AnnotationService annotationService;



    public void getHelloWorld(){
        System.out.println("AutowireBean getHelloWorld running....");
        annotationService.say();
    }
}
