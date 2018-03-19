package com.jzg.demo.controller;

import com.github.pagehelper.PageInfo;
import com.jzg.demo.biz.CustomerBiz;
import com.jzg.demo.dto.CustomerQueryPageDto;
import com.jzg.demo.model.Customer;
import com.jzg.framework.core.vo.ResultPageVo;
import com.jzg.framework.core.vo.ResultVo;
import com.jzg.framework.core.vo.RetStatus;
import com.jzg.framework.exception.ExceptionHandling;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

/**
 * @description:用户控制器
 * @author: JZG
 * @date: 2016/11/21 10:41
 */
@Controller
@RequestMapping("customer")
public class CustomerController {
    /**
     * CustomerBiz
     */
    @Resource
    private CustomerBiz customerBiz;

    /**
     * 批量创建客户
     *
     * @param customers customers
     * @return boolean
     */
    public boolean createBatchCustomer(List<Customer> customers) {
        return customerBiz.createBatchCustomer(customers);
    }

    /**
     * 通过用户ID更新用户信息
     *
     * @param customer customer
     * @return boolean
     */
    public boolean updateCustomer(Customer customer) {
        return customerBiz.updateCustomer(customer);
    }

    /**
     * 通用用户ID获取用户信息
     *
     * @param id id
     * @return Customer
     */
    public Customer getCustomerById(long id) {
        return customerBiz.getCustomerById(id);
    }

    /**
     * 通过ID List批量获取客户信息
     *
     * @param ids ids
     * @return List
     */
    public List<Customer> findCustomerListByIds(List<Long> ids) {
        return customerBiz.findCustomerListByIds(ids);
    }

    /**
     * 创建客户1
     *
     * @param customer 客户信息
     * @return Id
     */
    public Integer insertCustomer1(Customer customer) {
        return customerBiz.insertCustomer1(customer);
    }

    /**
     * 通过年龄获取客户列表
     *
     * @param age 年龄
     * @return 客户列表
     */
    public List<Customer> findCustomerByAge1(Integer age) {
        return customerBiz.findCustomerByAge1(age);
    }

    /**
     * 通过ID获取客户信息
     *
     * @param id 客户ID
     * @return 客户信息
     */
    public Customer getCustomerById1(Long id) {
        return customerBiz.getCustomerById1(id);
    }

    /**
     * 通过客户ID获取客户信息
     *
     * @param id id
     * @return ResultVo
     */
    @ResponseBody
    @RequestMapping("getCustomerById")
    public ResultVo<Customer> getCustomerById(Long id) {
        ResultVo<Customer> resultVo = new ResultVo<Customer>();
        Customer customer = customerBiz.getCustomerById(id);
        resultVo.setData(customer);
        resultVo.setStatus(RetStatus.Ok.getValue());
        return resultVo;
    }

    /**
     * 创建客户
     *
     * @param customer customer
     * @return ResultVo
     */
    @ExceptionHandling
    @ResponseBody
    @RequestMapping("createCustomer")
    public ResultVo<Boolean> createCustomer(Customer customer) {
        ResultVo<Boolean> resultVo = new ResultVo<Boolean>();
        boolean nRet = customerBiz.createCustomer(customer);
        resultVo.setData(nRet);
        resultVo.setStatus(RetStatus.Ok.getValue());
        return resultVo;
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
            ResultPageVo<Customer> resultPageVo = new ResultPageVo<Customer>();
            PageInfo<Customer> pageInfo = customerBiz.findPageList(queryPageDto);

            resultPageVo.setPageNo(pageInfo.getPageNum());
            resultPageVo.setPageCount((int) pageInfo.getTotal());
            resultPageVo.setPageSize(pageInfo.getPageSize());
            resultPageVo.setList(pageInfo.getList());
            resultPageVo.setStatus(RetStatus.Ok.getValue());


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
        ResultPageVo<Customer> resultPageVo = new ResultPageVo<Customer>();
        PageInfo<Customer> pageInfo = customerBiz.findPageList(queryPageDto);

        resultPageVo.setPageNo(pageInfo.getPageNum());
        resultPageVo.setPageCount((int) pageInfo.getTotal());
        resultPageVo.setPageSize(pageInfo.getPageSize());
        resultPageVo.setList(pageInfo.getList());

        resultPageVo.setStatus(RetStatus.Ok.getValue());
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
