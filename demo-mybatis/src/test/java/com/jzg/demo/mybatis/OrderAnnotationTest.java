package com.jzg.demo.mybatis;

import com.jzg.demo.mybatis.dao.OrderMapper;
import com.jzg.demo.mybatis.model.Order;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

/**
 * @description: OrderTest
 * @author: JZG
 * @date: 2018/1/19 13:43
 * @version: v1.0.0
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class OrderAnnotationTest {
    @Resource
    private OrderMapper orderMapper;


    @Test
    public void test() {
        Order order = orderMapper.selectByPrimaryKey(1L);
        System.out.println(order.toString());
    }


    @Test
    public void test1() {
        /*Order order = orderMapper.getOrderByIdxx(1L);
        System.out.println(order.toString());*/
    }
}
