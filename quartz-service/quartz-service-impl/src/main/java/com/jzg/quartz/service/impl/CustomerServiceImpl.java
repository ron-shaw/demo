package com.jzg.quartz.service.impl;

import com.github.pagehelper.PageInfo;
import com.jzg.quartz.service.api.CustomerService;
import com.jzg.quartz.service.biz.CustomerBiz;
import com.jzg.quartz.service.dto.query.CustomerQueryPageDto;
import com.jzg.quartz.service.model.Customer;
import com.jzg.framework.core.vo.ResultListVo;
import com.jzg.framework.core.vo.ResultPageVo;
import com.jzg.framework.core.vo.ResultVo;
import com.jzg.framework.core.vo.RetStatus;
import com.jzg.framework.exception.ExceptionHandling;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 客户服务
 * Created by JZG on 2016/11/16.
 */
@Service("customerService")
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
