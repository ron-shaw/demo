package com.jzg.demo.spring.bean;

/**
 * @description: SimpleBean
 * @author: JZG
 * @date: 2018/1/12 17:11
 * @version: v1.0.0
 */
public class SimpleBean {
    public SimpleBean(){
        System.out.println("SimpleBean初始化");
    }

    public void init(){
        System.out.println("执行init方法");
    }

    public void close(){
        System.out.println("执行close方法");
    }
}
