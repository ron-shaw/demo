package com.jzg.demo.transaction.tcc.web;

import com.jzg.demo.transaction.tcc.order.api.OrderService;
import com.jzg.demo.transaction.tcc.order.dto.OrderDto;
import com.jzg.demo.transaction.tcc.order.model.Order;
import com.jzg.demo.transaction.tcc.web.biz.OrderBiz;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import java.math.BigDecimal;

import javax.annotation.Resource;

/**
 * @description: OrderController
 * @author: JZG
 * @date: 2018/3/6 16:24
 * @version:
 */
@Controller
@RequestMapping("/order")
public class OrderController {

    @Resource
    private OrderBiz orderBiz;

    @Resource
    private OrderService orderService;


    @RequestMapping(value = "/")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView("/index");
        return mv;
    }

    @RequestMapping(value = "/create/")
    public RedirectView placeOrder(@RequestParam String amount,
                                   @RequestParam long customerId,
                                   @RequestParam long productId) {

        Long maxId = orderService.getMaxId();
        OrderDto orderDto = new OrderDto();
        orderDto.setCustomerId(customerId);
        orderDto.setProductId(productId);
        orderDto.setAmount(new BigDecimal(amount));
        orderDto.setQuantity(1);
        orderDto.setOrderId(maxId + 1);
        Long orderId = orderBiz.createOrder(orderDto);


        return new RedirectView("/payresult/" + orderId);
    }

    @RequestMapping(value = "/payresult/{orderId}")
    public ModelAndView payResult(@PathVariable("orderId") Long orderId){
        ModelAndView modelAndView = new ModelAndView("pay_success");
        Order order = orderService.getOrderById(orderId);

        modelAndView.addObject("order", order);

        return modelAndView;
    }
}
