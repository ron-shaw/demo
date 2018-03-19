package com.jzg.demo.spring.aop.factory.cglib;

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

/**
 * @description: HelloProxy
 * @author: JZG
 * @date: 2018/1/15 17:29
 * @version: v1.0.0
 */
public class HelloMethodInterceptor implements MethodInterceptor {

    public Object getProxy(Class clazz) {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(clazz);
        enhancer.setCallback(this);
        return enhancer.create();
    }


    public Object intercept(Object obj, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
        Object result = null;

        System.out.println("***************CGLIB 前置处理******************");
        result = methodProxy.invokeSuper(obj, args);
        System.out.println("***************CGLIB 后置处理******************");

        return result;
    }
}
