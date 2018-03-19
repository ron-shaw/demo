package com.jzg.demo.mybatis;

import com.jzg.demo.mybatis.dao.OrderMapper;
import com.jzg.demo.mybatis.model.Order;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.Date;

/**
 * @description: SqlSessionTemplateTest
 * @author: JZG
 * @date: 2018/1/19 13:58
 * @version: v1.0.0
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class SqlSessionTemplateTest {

    @Resource
    SqlSession sqlSession;

    /**
     * 使用SqlSession对象
     */
    @Test
    public void test() {
        Order order = (Order) sqlSession.selectOne("com.jzg.demo.mybatis.dao.OrderMapper.getProductById", 2L);
        System.out.println(order.toString());
    }

    /**
     * 获取Mapper对象
     */
    @Test
    public void testMapper() {
        OrderMapper orderMapper = sqlSession.getMapper(OrderMapper.class);
        Order order = orderMapper.selectByPrimaryKey(2L);
        System.out.println(order.toString());
    }

    /**
     * 使用statement直接执行
     */
    @Test
    public void testInsert() {
        for (int i = 0; i < 5; i++) {
            Order order = new Order();
            order.setCustomerId(1L);
            order.setProductId(1L);
            order.setAmount( new BigDecimal("10"));
            order.setIndate(new Date());
            int nRet = sqlSession.insert("com.jzg.demo.mybatis.dao.OrderMapper.insert", order);
            System.out.println(order.toString());
        }
    }
}
