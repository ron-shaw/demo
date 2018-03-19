package com.jzg.quartz.service.impl;


import com.alibaba.dubbo.rpc.service.GenericException;
import com.alibaba.dubbo.rpc.service.GenericService;

/**
 * @description: Create By IDEA
 * @author: JZG
 * @date: 2017/12/19 15:59
 */
public class QuartzServiceImpl implements GenericService {
    /**
     * 泛化调用
     *
     * @param method         方法名，如：findPerson，如果有重载方法，需带上参数列表，如：findPerson(java.lang.String)
     * @param parameterTypes 参数类型
     * @param args           参数列表
     * @return 返回值
     * @throws Throwable 方法抛出的异常
     */
    @Override
    public Object $invoke(String method, String[] parameterTypes, Object[] args) throws GenericException {
        return null;
    }
}
