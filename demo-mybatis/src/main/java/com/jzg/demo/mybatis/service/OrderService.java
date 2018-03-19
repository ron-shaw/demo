package com.jzg.demo.mybatis.service;

import com.jzg.demo.mybatis.dto.OrderDto;

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
    Long createOrder(OrderDto orderDto);

    /**
     * 取消订单
     * @param orderId orderId
     * @return
     */
    Boolean cancelOrder(Long orderId);

    /**
     * 增加库存
     * @param productId productId
     * @param quantity quantity
     * @return
     */
    Boolean incrStock(Long productId, int quantity);

    /**
     * 减少库存
     * @param productId productId
     * @param quantity quantity
     * @return
     */
    Boolean desrStock(Long productId, int quantity);
}
