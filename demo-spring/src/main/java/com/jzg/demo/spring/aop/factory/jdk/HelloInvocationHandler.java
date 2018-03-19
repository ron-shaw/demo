package com.jzg.demo.spring.aop.factory.jdk;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 * @description: HelloProxy
 * @author: JZG
 * @date: 2018/1/15 17:29
 * @version: v1.0.0
 */
public class HelloInvocationHandler implements InvocationHandler {

    private Object target;

    public HelloInvocationHandler(Object target){
        this.target = target;
    }

    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        Object result = null;

        System.out.println("***************前置处理******************");
        result = method.invoke(target, args);
        System.out.println("***************后置处理******************");

        return result;
    }
}
