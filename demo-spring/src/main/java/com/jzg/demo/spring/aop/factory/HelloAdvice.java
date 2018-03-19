package com.jzg.demo.spring.aop.factory;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.aop.AfterReturningAdvice;
import org.springframework.aop.MethodBeforeAdvice;

import java.lang.reflect.Method;

/**
 * @description: HelloAdvice
 * @author: JZG
 * @date: 2018/1/15 15:43
 * @version: v1.0.0
 */
public class HelloAdvice implements MethodBeforeAdvice, AfterReturningAdvice, MethodInterceptor {

    /**
     * 前置通知
     *
     * @param method method being invoked
     * @param args   arguments to the method
     * @param target target of the method invocation. May be {@code null}.
     * @throws Throwable if this object wishes to abort the call.
     *                   Any exception thrown will be returned to the caller if it's
     *                   allowed by the method signature. Otherwise the exception
     *                   will be wrapped as a runtime exception.
     */
    public void before(Method method, Object[] args, Object target) throws Throwable {
        System.out.println("*************前置通知****************");
        System.out.println("*************" + method.getName() + "****************");
    }

    /**
     * 后置通知
     *
     * @param returnValue the value returned by the method, if any
     * @param method      method being invoked
     * @param args        arguments to the method
     * @param target      target of the method invocation. May be {@code null}.
     * @throws Throwable if this object wishes to abort the call.
     *                   Any exception thrown will be returned to the caller if it's
     *                   allowed by the method signature. Otherwise the exception
     *                   will be wrapped as a runtime exception.
     */
    public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
        System.out.println("*************后置通知****************");
        System.out.println("*************" + method.getName() + "****************");
    }

    /**
     * 环绕通知
     *
     * @param invocation the method invocation joinpoint
     * @return the result of the call to {@link
     * Joinpoint#proceed()}, might be intercepted by the
     * interceptor.
     * @throws Throwable if the interceptors or the
     *                   target-object throws an exception.
     */
    public Object invoke(MethodInvocation invocation) throws Throwable {
        Object object = null;
        System.out.println("*************环绕通知****************");
        object = invocation.proceed();

        return object;
    }
}
