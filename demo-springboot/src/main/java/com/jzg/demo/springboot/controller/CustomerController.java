package com.jzg.demo.springboot.controller;

import com.jzg.demo.springboot.dao.CustomerMapper;
import com.jzg.demo.springboot.model.Customer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

import javax.annotation.Resource;

/**
 * @description: CustomerController
 * @author: JZG
 * @date: 2018/3/8 14:40
 * @version:
 */
@Controller
@RequestMapping("customer")
public class CustomerController {
    @Resource
    CustomerMapper customerMapper;

    @ResponseBody
    @RequestMapping(value = "info/{id}")
    public Customer getCustomerById(@PathVariable("id") Long id) {
        Customer customer = null;
        try {
            customer = customerMapper.selectByPrimaryKey(id);
        } catch (Exception ex) {
            System.out.println(ex);
        }
        return customer;
    }

    /**
     * 测试异常是否抛出
     * @return
     */
    @RequestMapping(value = "index1")
    public String index1() {
        Customer customer = null;
        double a = 1 / 0;
        return "index";
    }

    @RequestMapping(value = "list")
    public ModelAndView findCustomerList() {
        ModelAndView modelAndView = new ModelAndView();
        List<Customer> customers = customerMapper.selectAll();
        modelAndView.setViewName("customer/list");
        modelAndView.addObject("list", customers);
        return modelAndView;
    }
}
