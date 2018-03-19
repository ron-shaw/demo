package com.jzg.demo.spring.aop.xml;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;

/**
 * @description: Advices
 * @author: JZG
 * @date: 2018/1/15 14:50
 * @version: v1.0.0
 */
public class Advices {
    /**
     * 前置通知
     * @param joinPoint 连接点
     */
    public void before(JoinPoint joinPoint){
        System.out.println("*************前置通知****************");
        System.out.println("*************" + joinPoint.getSignature().getName() + "****************");
    }

    /**
     * 后置通知
     * @param joinPoint 连接点
     */
    public void after(JoinPoint joinPoint){
        System.out.println("*************后置通知****************");
    }


    /**
     * 环绕通知
     * @param proceedingJoinPoint 连接点
     * @return
     */
    public Object around(ProceedingJoinPoint proceedingJoinPoint) {
        Object object = null;
        try {
            System.out.println("*************环绕通知****************");
            object = proceedingJoinPoint.proceed();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }

        return object;
    }
}
