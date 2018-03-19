package com.jzg.demo.transaction.tcc.order.service.impl;

import com.jzg.demo.transaction.tcc.order.api.OrderService;
import com.jzg.demo.transaction.tcc.order.dao.OrderMapper;
import com.jzg.demo.transaction.tcc.order.dto.OrderDto;
import com.jzg.demo.transaction.tcc.order.model.Order;
import com.jzg.framework.core.exception.BizException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

import javax.annotation.Resource;

/**
 * @description: ProductServiceImpl
 * @author: JZG
 * @date: 2018/1/18 15:44
 * @version: v1.0.0
 */
@Service("orderService")
public class OrderServiceImpl implements OrderService {

    @Resource
    private OrderMapper orderMapper;

    /**
     * 创建订单
     *
     * @param orderDto order
     * @return
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT)
    public Long createOrder(OrderDto orderDto) {
        int nRet = 0;

        //1、创建订单
        Order order = new Order();
        order.setCustomerId(orderDto.getCustomerId());
        order.setProductId(orderDto.getProductId());
        order.setAmount(orderDto.getAmount());
        order.setIndate(new Date());
        order.setId(orderDto.getOrderId());
        nRet = orderMapper.insert1(order);
        if (nRet <= 0) {
            throw new BizException(20001, "创建订单失败");
        }

        System.out.println("创建订单成功");
        return order.getId();
    }

    /**
     * 取消订单
     *
     * @param orderDto orderDto
     * @return
     */
    @Override
    public Boolean cancelOrder(OrderDto orderDto) {

        Order order = orderMapper.selectByPrimaryKey(orderDto.getOrderId());
        if (order == null || order.getId() <= 0) {
            throw new BizException(20002, "订单不存在");
        }

        int nRet = orderMapper.deleteByPrimaryKey(orderDto.getOrderId());

        return nRet > 0;
    }

    /**
     * 通过ID获取订单信息
     *
     * @param orderId
     * @return
     */
    @Override
    public Order getOrderById(Long orderId) {
        return orderMapper.selectByPrimaryKey(orderId);
    }

    /**
     * 获取最大订单ID
     *
     * @return
     */
    @Override
    public Long getMaxId() {
        return orderMapper.getMaxId();
    }


}
