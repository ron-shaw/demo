package com.jzg.demo.transaction.tcc.order.api;


import com.jzg.demo.transaction.tcc.order.dto.OrderDto;
import com.jzg.demo.transaction.tcc.order.model.Order;

import org.mengyun.tcctransaction.api.Compensable;

/**
 * @description: ProductService
 * @author: JZG
 * @date: 2018/1/18 15:43
 * @version: v1.0.0
 */
public interface OrderService {
    /**
     * 创建订单
     * <p>
     * 1、创建订单
     * 2、扣减账户金额
     * 3、扣减库存
     * </p>
     * @param orderDto order
     * @return
     */
    @Compensable
    Long createOrder(OrderDto orderDto);

    /**
     * 取消订单
     * @param OrderDto orderDto
     * @return
     */
    Boolean cancelOrder(OrderDto orderDto);


    /**
     * 通过ID获取订单信息
     * @param orderId
     * @return
     */
    Order getOrderById(Long orderId);


    /**
     * 获取最大订单ID
     * @return
     */
    public Long getMaxId();
}
