package com.jzg.demo.spring.bean;

import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @description: ListBeanTest
 * @author: JZG
 * @date: 2018/1/12 16:44
 * @version: v1.0.0
 */
/*@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath*:applicationContext-bean.xml")*/
public class BeanTest {

    @Test
    public void test(){
        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext-bean.xml");
        Customer customer = (Customer) applicationContext.getBean("customer");
        System.out.println(customer.toString());

        SimpleBean simpleBean = (SimpleBean) applicationContext.getBean("simpleBean");
        System.out.println(simpleBean.toString());

        ListBean listBean = (ListBean) applicationContext.getBean("listBean");
        System.out.println(listBean.toString());

        MapBean mapBean = (MapBean) applicationContext.getBean("mapBean");
        System.out.println(mapBean.toString());
    }
}