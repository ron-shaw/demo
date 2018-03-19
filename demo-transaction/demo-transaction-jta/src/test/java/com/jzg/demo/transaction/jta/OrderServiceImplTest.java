package com.jzg.demo.transaction.jta;

import com.alibaba.fastjson.JSON;
import com.jzg.demo.transaction.jta.dao.db2.OrderMapper;
import com.jzg.demo.transaction.jta.dto.OrderDto;
import com.jzg.demo.transaction.tcc.customer.model.Order;
import com.jzg.demo.transaction.tcc.customer.model.OrderExample;
import com.jzg.demo.transaction.jta.service.OrderService;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigDecimal;
import java.util.List;

import javax.annotation.Resource;

/**
 * @description: OrderServiceImplTest
 * @author: JZG
 * @date: 2018/1/18 17:37
 * @version: v1.0.0
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class OrderServiceImplTest {
    @Resource
    OrderService orderService;

    @Resource
    OrderMapper orderMapper;

    @Test
    public void createOrder() throws Exception {
        OrderDto orderDto = new OrderDto(1L, 1L, 10, new BigDecimal("100"));
        Long nRet = orderService.createOrder(orderDto);

        System.out.println(nRet);
    }

    @Test
    public void cancelOrder() throws Exception {

    }

    @Test
    public void incrStock() throws Exception {

    }

    @Test
    public void desrStock() throws Exception {

    }


    @Test
    public void test() {
        OrderExample orderExample = new OrderExample();

        /*OrderExample.Criteria criteria = orderExample.createCriteria();
        criteria.andAmountGreaterThan(new BigDecimal("0"));
        criteria.andCustomerIdBetween(1L, 100L);*/

        orderExample.createCriteria()
                .andAmountGreaterThan(new BigDecimal("0"))
                .andCustomerIdBetween(1L, 100L);

        //or的用法
        orderExample.or().andProductIdBetween(1L, 100L);

        //是否排重
        orderExample.setDistinct(true);
        //排序
        orderExample.setOrderByClause("id desc");

        List<Order> orderList = orderMapper.selectByExample(orderExample);

        System.out.println(JSON.toJSONString(orderList));
    }

}