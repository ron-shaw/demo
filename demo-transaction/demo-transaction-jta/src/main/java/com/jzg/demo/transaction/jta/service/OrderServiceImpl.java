package com.jzg.demo.transaction.jta.service;

import com.jzg.demo.transaction.jta.dao.db2.OrderMapper;
import com.jzg.demo.transaction.jta.dao.db1.ProductMapper;
import com.jzg.demo.transaction.jta.dao.db1.StockMapper;
import com.jzg.demo.transaction.jta.dao.db2.CustomerBalanceMapper;
import com.jzg.demo.transaction.jta.dto.OrderDto;
import com.jzg.demo.transaction.tcc.customer.model.Order;
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

    @Resource
    private ProductMapper productMapper;

    @Resource
    private StockMapper stockMapper;

    @Resource
    private CustomerBalanceMapper customerBalanceMapper;

    /**
     * 创建订单
     * <p>
     * 1、创建订单
     * 2、扣减账户金额
     * 3、扣减库存
     * </p>
     *
     * @param orderDto order
     * @return
     */
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT)
    public Long createOrder(OrderDto orderDto) {
        int nRet = 0;

        //1、创建订单
        Order order = new Order();
        //Order order = new Order(orderDto.getCustomerId(), orderDto.getProductId(), orderDto.getAmount(), new Date());
        order.setCustomerId(orderDto.getCustomerId());
        order.setProductId(orderDto.getProductId());
        order.setAmount(orderDto.getAmount());
        order.setIndate(new Date());
        nRet = orderMapper.insert(order);
        if (nRet <= 0) {
            throw new BizException(500, "创建订单失败");
        }

        //2、扣减金额
        nRet = customerBalanceMapper.decrBalance(orderDto.getCustomerId(), orderDto.getAmount());
        if (nRet <= 0) {
            throw new BizException(501, "扣减金额失败");
        }

        //3、扣减库存
        nRet = stockMapper.decrStock(orderDto.getProductId(), orderDto.getQuantity());
        if (nRet <= 0) {
            throw new BizException(502, "扣减库存失败");
        }

        System.out.println("创建订单成功");
        return order.getId();
    }

    /**
     * 取消订单
     *
     * @param orderId orderId
     * @return
     */
    public Boolean cancelOrder(Long orderId) {



        return null;
    }

    /**
     * 增加库存
     *
     * @param productId productId
     * @param quantity  quantity
     * @return
     */
    public Boolean incrStock(Long productId, int quantity) {
        return null;
    }

    /**
     * 减少库存
     *
     * @param productId productId
     * @param quantity  quantity
     * @return
     */
    public Boolean desrStock(Long productId, int quantity) {
        return null;
    }
}
