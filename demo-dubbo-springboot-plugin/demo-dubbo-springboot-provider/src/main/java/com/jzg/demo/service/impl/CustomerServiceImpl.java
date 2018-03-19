package com.jzg.demo.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.PageInfo;
import com.jzg.demo.service.api.CustomerService;
import com.jzg.demo.service.biz.CustomerBiz;
import com.jzg.demo.service.dto.query.CustomerQueryPageDto;
import com.jzg.demo.service.model.Customer;
import com.jzg.framework.core.vo.ResultListVo;
import com.jzg.framework.core.vo.ResultPageVo;
import com.jzg.framework.core.vo.ResultVo;
import com.jzg.framework.core.vo.RetStatus;
import com.jzg.framework.exception.ExceptionHandling;

import org.springframework.stereotype.Component;

import java.util.List;

import javax.annotation.Resource;

/**
 * 客户服务
 * Created by JZG on 2016/11/16.
 */
@Service
@Component
public class CustomerServiceImpl implements CustomerService {
    /**
     * CustomerBiz
     */
    @Resource
    private CustomerBiz customerBiz;

    /**
     * 创建客户
     *
     * @param customer customer
     * @return ResultVo
     */
    @Override
    @ExceptionHandling
    public ResultVo<Boolean> create(Customer customer) {
        ResultVo<Boolean> resultVo = new ResultVo<Boolean>();
        boolean nRet = customerBiz.createCustomer(customer);
        resultVo.setData(nRet);
        resultVo.setStatus(RetStatus.Ok.getValue());
        return resultVo;
    }

    /**
     * 通过用户ID更新用户信息
     *
     * @param customer customer
     * @return ResultVo
     */
    @Override
    @ExceptionHandling
    public ResultVo<Boolean> update(Customer customer) {
        ResultVo<Boolean> resultVo = new ResultVo<Boolean>();
        boolean nRet = customerBiz.updateCustomer(customer);
        resultVo.setData(nRet);
        resultVo.setStatus(RetStatus.Ok.getValue());
        return resultVo;
    }

    /**
     * 通用用户ID获取用户信息
     *
     * @param id
     * @return ResultVo
     */
    @Override
    @ExceptionHandling
    public ResultVo<Customer> getCustomerById(long id) {
        ResultVo<Customer> resultVo = new ResultVo<Customer>();
        Customer customer = customerBiz.getCustomerById(id);
        resultVo.setData(customer);
        resultVo.setStatus(RetStatus.Ok.getValue());
        return resultVo;
    }

    /**
     * 通过ID List批量获取客户信息
     *
     * @param ids ids
     * @return ResultListVo
     */
    @Override
    @ExceptionHandling
    public ResultListVo<Customer> findCustomerListByIds(List<Long> ids) {
        ResultListVo<Customer> resultListVo = new ResultListVo<Customer>();
        List<Customer> customers = customerBiz.findCustomerListByIds(ids);

        resultListVo.setList(customers);
        resultListVo.setStatus(RetStatus.Ok.getValue());
        return resultListVo;
    }

    /**
     * 分页获取客户列表
     *
     * @param queryPageVo queryPageVo
     * @return ResultPageVo
     */
    @Override
    @ExceptionHandling
    public ResultPageVo<Customer> findPageList(CustomerQueryPageDto queryPageVo) {
        ResultPageVo<Customer> resultPageVo = new ResultPageVo<Customer>();
        PageInfo<Customer> pageInfo = customerBiz.findPageList(queryPageVo);

        resultPageVo.setPageNo(pageInfo.getPageNum());
        resultPageVo.setPageCount((int) pageInfo.getTotal());
        resultPageVo.setPageSize(pageInfo.getPageSize());
        resultPageVo.setList(pageInfo.getList());

        resultPageVo.setStatus(RetStatus.Ok.getValue());
        return resultPageVo;
    }
}
