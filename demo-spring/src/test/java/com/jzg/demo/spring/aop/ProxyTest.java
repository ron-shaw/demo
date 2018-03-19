package com.jzg.demo.spring.aop;

import com.jzg.demo.spring.aop.factory.Hello;
import com.jzg.demo.spring.aop.factory.HelloImpl;
import com.jzg.demo.spring.aop.factory.cglib.HelloMethodInterceptor;
import com.jzg.demo.spring.aop.factory.jdk.HelloInvocationHandler;
import org.junit.Test;

/**
 * @description: ProxyTest
 * @author: JZG
 * @date: 2018/1/15 17:34
 * @version: v1.0.0
 */
public class ProxyTest {

    @Test
    public void test() {
        Hello target = new HelloImpl();
        HelloInvocationHandler helloInvocationHandler = new HelloInvocationHandler(target);
        //生成代理对象
        Hello helloProxy = (Hello) java.lang.reflect.Proxy.newProxyInstance(target.getClass().getClassLoader(),
                target.getClass().getInterfaces(), helloInvocationHandler);
        helloProxy.say();

    }



    @Test
    public void test1() {
        HelloMethodInterceptor interceptor = new HelloMethodInterceptor();
        //生成代理对象
        Hello hello = (Hello)interceptor.getProxy(HelloImpl.class);
        hello.say();
    }
}
