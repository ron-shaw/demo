package com.jzg.demo.spring;

import junit.framework.TestCase;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @description: SpringSimpleMultiBeanTest
 * @author: JZG
 * @date: 2018/1/15 12:34
 * @version: v1.0.0
 */
public class SpringSimpleMultiBeanTest extends TestCase {
    @Test
    public void test() throws Exception {

        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-init.xml");
        SpringSimpleMultiBean bean = applicationContext.getBean("springMultiBean", SpringSimpleMultiBean.class);
        bean.say();

        /*构造函数 init
        BeanNameAware初始化 set BeanName begin and name is springMultiBean
        BeanFactoryName初始化 begin and beanFactory is org.springframework.beans.factory.support.DefaultListableBeanFactory@3f203d7: defining beans [springMultiBean]; root of factory hierarchy
        InitializingBean接口的具体实现 begin and id is 1 and name is spring
        init method Begin
        BeanFactoryPostProcessor 接口初始化 begin and this beanFactory is org.springframework.beans.factory.support.DefaultListableBeanFactory@3f203d7: defining beans [springMultiBean]; root of factory hierarchy
        hello I am spring*/

        /*SpringOtherBean springOtherBean = applicationContext.getBean("springOtherBean", SpringOtherBean.class);
        springOtherBean.say();*/

        /*构造函数 init
        BeanNameAware初始化 set BeanName begin and name is springMultiBean
        BeanFactoryName初始化 begin and beanFactory is org.springframework.beans.factory.support.DefaultListableBeanFactory@42367c17: defining beans [springMultiBean,springOtherBean]; root of factory hierarchy
        InitializingBean接口的具体实现 begin and id is 1 and name is spring
        init method Begin
        BeanFactoryPostProcessor 接口初始化 begin and this beanFactory is org.springframework.beans.factory.support.DefaultListableBeanFactory@42367c17: defining beans [springMultiBean,springOtherBean]; root of factory hierarchy
        BeanPostProcessor接口 before 初始化  postProcessAfterInitialization begin
        BeanPostProcessor接口after 初始化  postProcessAfterInitialization begin
        hello I am spring
        SpringOtherBean say .*/
    }
}