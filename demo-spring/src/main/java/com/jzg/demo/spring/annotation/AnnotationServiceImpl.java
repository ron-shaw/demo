package com.jzg.demo.spring.annotation;

import com.jzg.demo.spring.ioc.dao.HelloDao;
import com.jzg.demo.spring.ioc.dao.HelloDaoImpl;
import org.springframework.stereotype.Service;

/**
 * @description: HelloService
 * @author: JZG
 * @date: 2018/1/11 14:16
 * @version: v1.0.0
 */
@Service("annotationService")
public class AnnotationServiceImpl implements AnnotationService {
    /**
     * say
     */
    public void say(){
        System.out.println("AnnotationServiceImpl  say  Hello......");
    }
}
