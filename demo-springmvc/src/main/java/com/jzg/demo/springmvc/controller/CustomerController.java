package com.jzg.demo.springmvc.controller;

import com.jzg.demo.springmvc.dao.CustomerMapper;
import com.jzg.demo.springmvc.model.Customer;
import com.jzg.demo.springmvc.model.CustomerQueryDto;
import com.jzg.demo.springmvc.vo.CustomerQueryVo;
import com.jzg.demo.springmvc.vo.CustomerRegisterVo;
import com.jzg.framework.utils.RandomUitls;
import com.jzg.framework.utils.bean.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @description: CustomerController
 * @author: JZG
 * @date: 2018/1/16 15:52
 * @version: v1.0.0
 */
@Controller
@RequestMapping("/customer")
public class CustomerController {

    /**
     * customerMapper
     */
    @Resource
    private CustomerMapper customerMapper;

    /**
     * 访问用户注册页面
     *
     * @return
     */
    @RequestMapping("toAdd.html")
    public String toAdd() {
        return "customer/add";
    }

    /**
     * 访问用户注册页面【JS请求页面】
     *
     * @return
     */
    @RequestMapping("toAdd2.html")
    public String toAdd2() {
        return "customer/addAjax";
    }

    /**
     * 修改用户信息
     * 【参数正则】
     *
     * @param id 用户ID
     * @return
     */
    @RequestMapping("toUpdate.html")
    public ModelAndView toUpdate(Long id) {
        ModelAndView modelAndView = new ModelAndView();

        Customer customer = new Customer();
        //TODO: 获取用户信息
        //customer.setId(id);
        //customer.setAge(2);
        //customer.setLoginName("张三");
        //customer.setIndate(new Date());
        customer = customerMapper.selectByPrimaryKey(id);
        if (customer != null) {
            modelAndView.addObject(customer);
        }
        modelAndView.setViewName("customer/update");

        return modelAndView;
    }

    /**
     * 查看用户信息
     *
     * @param id ID
     * @return
     */
    @RequestMapping("toInfo/{id:\\d{1,11}}.html")
    public ModelAndView toInfo(@PathVariable("id") Long id) {
        ModelAndView modelAndView = new ModelAndView();

        Customer customer = new Customer();
        //TODO: 获取用户信息
        //customer.setId(id);
        //customer.setAge(2);
        //customer.setLoginName("张三");
        //customer.setIndate(new Date());
        customer = customerMapper.selectByPrimaryKey(id);

        if (customer != null) {
            modelAndView.addObject(customer);
        }
        modelAndView.setViewName("customer/info");
        return modelAndView;
    }

    /**
     * 访问用户列表页面
     *
     * @return
     */
    @RequestMapping("toList.html")
    public ModelAndView toList() {
        ModelAndView modelAndView = new ModelAndView();
        List<Customer> customers = customerMapper.selectAll();
        modelAndView.addObject("customers", customers);
        modelAndView.setViewName("customer/list");
        return modelAndView;
    }


    /**
     * 创建用户
     *
     * @param customerRegisterVo customerRegisterVou
     * @return
     */
    @ResponseBody
    @RequestMapping("add")
    public Customer add(CustomerRegisterVo customerRegisterVo) {
        Customer customer = BeanUtils.toBean(Customer.class, customerRegisterVo);
        //TODO: 注册用户
        customer.setAge(Integer.parseInt(RandomUitls.generateInteger(2)));
        customer.setIndate(new Date());

        int nRet = customerMapper.insert(customer);

        return customer;
    }

    /**
     * 创建用户【演示@RequestParam】
     * 等同String name = request.getParameter("loginName")
     *
     * @param name name
     * @return
     */
    @ResponseBody
    @RequestMapping("add1")
    public Customer add1(@RequestParam(value = "loginName", required = true) String name) {
        Customer customer = new Customer();
        customer.setLoginName(name);
        customer.setAge(Integer.parseInt(RandomUitls.generateInteger(2)));
        customer.setIndate(new Date());

        int nRet = customerMapper.insert(customer);
        return customer;
    }

    /**
     * 创建用户【演示consumes】
     *
     * @param customer customer
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "add2", method = RequestMethod.POST, consumes = "application/json")
    public Customer add2(@RequestBody Customer customer) {
        try {
            //customer.setId(111224L);
            if (customer.getAge() == null) {
                customer.setAge(Integer.parseInt(RandomUitls.generateInteger(2)));
            }
            if (customer.getIndate() == null) {
                customer.setIndate(new Date());
            }
            int nRet = customerMapper.insert(customer);
        } catch (Exception ex) {
            System.out.println(ex);
        }
        return customer;
    }


    /**
     * 编辑用户【演示consumes】
     *
     * @param customer customer
     * @return
     */
    @RequestMapping(value = "update", method = RequestMethod.POST)
    public ModelAndView update(Customer customer) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("customer/success");

        if (customer.getId() == 0) {
            modelAndView.addObject("msg", "ID不存在");
            return modelAndView;
        }

        Customer cust = customerMapper.selectByPrimaryKey(customer.getId());
        if (cust == null) {
            modelAndView.addObject("msg", "此用户不存在");
            return modelAndView;
        }

        int nRet = customerMapper.updateByPrimaryKey(customer);
        if (nRet > 0) {
            modelAndView.addObject("msg", "修改成功");
        } else {
            modelAndView.addObject("msg", "修改失败");
        }


        return modelAndView;
    }


    /**
     * 获取用户列表
     *
     * @param customerQueryVo customerQueryVo
     * @return
     */
    @ResponseBody
    @RequestMapping("list")
    public List<Customer> getCustomerList(CustomerQueryVo customerQueryVo) {
        //TODO: 分页获取用户列表
        CustomerQueryDto customerQueryDto = BeanUtils.toBean(CustomerQueryDto.class, customerQueryVo);
        int pageSize = 0;
        int pageIndex = 0;
        if (customerQueryVo.getPageSize() == null || customerQueryVo.getPageSize() <= 0) {
            pageSize = 10;
        } else {
            pageSize = customerQueryVo.getPageSize();
        }

        if (customerQueryVo.getPageIndex() == null || customerQueryVo.getPageIndex() <= 0) {
            pageIndex = 1;
        } else {
            pageIndex = customerQueryVo.getPageIndex();
        }


        Integer start = (pageIndex - 1) * pageSize;
        customerQueryDto.setStart(start);
        customerQueryDto.setPageSize(pageSize);
        List<Customer> customers = customerMapper.findCustomerByPage(customerQueryDto);

        return customers;
    }
}
