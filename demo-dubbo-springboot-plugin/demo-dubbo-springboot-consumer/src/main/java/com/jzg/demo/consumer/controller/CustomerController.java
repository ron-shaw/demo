package com.jzg.demo.consumer.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.jzg.demo.service.api.CustomerService;
import com.jzg.demo.service.dto.query.CustomerQueryPageDto;
import com.jzg.demo.service.model.Customer;
import com.jzg.framework.core.vo.ResultPageVo;
import com.jzg.framework.core.vo.ResultVo;
import com.jzg.framework.core.vo.RetStatus;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

/**
 * @description:用户控制器
 * @author: JZG
 * @date: 2016/11/21 10:41
 */
@Controller
@RequestMapping("customer")
public class CustomerController {
    /**
     * CustomerService
     */
    @Reference
    private CustomerService customerService;

    /**
     * 通过客户ID获取客户信息
     *
     * @param id id
     * @return ResultVo
     */
    @ResponseBody
    @RequestMapping("getCustomerById")
    public ResultVo<Customer> getCustomerById(Long id) {
        return customerService.getCustomerById(id);
    }

    /**
     * 创建客户
     *
     * @param customer customer
     * @return ResultVo
     */
    @ResponseBody
    @RequestMapping("createCustomer")
    public ResultVo<Boolean> createCustomer(Customer customer) {
        return customerService.create(customer);
    }

    /**
     * 分页获取客户列表
     *
     * @param queryPageDto queryPageDto
     * @return ModelAndView
     */
    @RequestMapping("toPageList")
    public ModelAndView toPageList(CustomerQueryPageDto queryPageDto) {
        ModelAndView modelAndView = new ModelAndView();
        try {
            ResultPageVo<Customer> resultPageVo = customerService.findPageList(queryPageDto);

            if (resultPageVo.getStatus() != RetStatus.Ok.getValue()) {
                modelAndView.setViewName("500");
            } else {
                modelAndView.setViewName("/customer/list");
                modelAndView.addObject("list", resultPageVo.getList());
            }
        } catch (Exception ex) {
            modelAndView.setViewName("500");
        }

        return modelAndView;
    }

    /**
     * 分页获取用户信息
     *
     * @param queryPageDto queryPageDto
     * @return ResultPageVo
     */
    @ResponseBody
    @RequestMapping("findPageList")
    public ResultPageVo<Customer> findPageList(CustomerQueryPageDto queryPageDto) {
        ModelAndView modelAndView = new ModelAndView();
        ResultPageVo<Customer> resultPageVo = customerService.findPageList(queryPageDto);
        return resultPageVo;
    }


    /**
     * 获取用户数据
     *
     * @param date date
     * @return ResultVo
     */
    @ResponseBody
    @RequestMapping("getCustomerDate")
    public ResultVo<Date> getCustomerDate(Date date) {
        ResultVo<Date> resultVo = new ResultVo<Date>();
        resultVo.setData(date);
        resultVo.setStatus(RetStatus.Ok.getValue());
        return resultVo;
    }


    /**
     * 登录
     *
     * @param request request
     * @return String
     */
    @RequestMapping("/toLogin")
    public String toLogin(HttpServletRequest request) {
        return "login";
    }


    /**
     * 用户登录
     *
     * @param username username
     * @param password password
     * @return ResultVo
     */
    @ResponseBody
    @RequestMapping("/login")
    public ResultVo<Customer> login(String username, String password) {
        ResultVo<Customer> resultVo = new ResultVo<Customer>();
        Customer customer = new Customer();
        customer.setLoginName(username);
        customer.setIndate(new Date());
        resultVo.setStatus(RetStatus.Ok.getValue());
        return resultVo;
    }

    /**
     * 订单列表
     *
     * @param request request
     * @return String
     */
    @RequestMapping("/myindex")
    public String toIndex(HttpServletRequest request) {
        return "order/list";
    }
}
