package com.jzg.demo.transaction.tcc.web.biz;

import com.jzg.demo.transaction.tcc.customer.api.CustomerService;
import com.jzg.demo.transaction.tcc.order.api.OrderService;
import com.jzg.demo.transaction.tcc.order.dto.OrderDto;
import com.jzg.demo.transaction.tcc.stock.api.StockService;

import org.mengyun.tcctransaction.api.Compensable;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @description: OrderBiz
 * @author: JZG
 * @date: 2018/3/6 16:25
 * @version:
 */
@Component
public class OrderBiz {
    @Resource
    private OrderService orderService;

    @Resource
    private StockService stockService;

    @Resource
    private CustomerService customerService;

    @Compensable(confirmMethod = "confirmMakePayment", cancelMethod = "cancelMakePayment")
    public Long createOrder(OrderDto orderDto){
        //应该是生成临时订单，在confirm中生成订单
        Long orderId = orderService.createOrder(orderDto);

        try {
            stockService.decrStock(orderDto.getProductId(), orderDto.getQuantity());
            customerService.decrBalance(orderDto.getCustomerId(), orderDto.getAmount());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {

        }

        return orderId;
    }


    public void confirmOrder(OrderDto orderDto){
        System.out.println("进入 confirmOrder");

    }

    public void cancelOrder(OrderDto orderDto){
        System.out.println("进入 cancelOrder");
        boolean bRet = orderService.cancelOrder(orderDto);
        System.out.println("完成 cancelOrder" + (bRet ? "成功":"失败"));
    }
}
