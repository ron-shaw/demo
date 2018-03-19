package com.jzg.demo.biz;

import com.jzg.demo.service.api.CustomerService;
import com.jzg.demo.service.dto.query.CustomerQueryPageDto;
import com.jzg.demo.service.model.Customer;
import com.jzg.framework.core.vo.ResultListVo;
import com.jzg.framework.core.vo.ResultPageVo;
import com.jzg.framework.core.vo.ResultVo;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * @description: demo-parent
 * @author: JZG
 * @date: 2016/11/21 10:42
 */
@Component("frontCustomerBiz")
public class FrontCustomerBiz {
    /**
     * CustomerService
     */
    @Resource
    private CustomerService customerService;

    /**
     * 创建客户
     *
     * @param customer customer
     * @return ResultVo
     */
    public ResultVo<Boolean> create(Customer customer) {
        return customerService.create(customer);
    }

    /**
     * 通过用户ID更新用户信息
     *
     * @param customer customer
     * @return ResultVo
     */
    public ResultVo<Boolean> update(Customer customer) {
        return customerService.update(customer);
    }

    /**
     * 通用用户ID获取用户信息
     *
     * @param id id
     * @return ResultVo
     */
    public ResultVo<Customer> getCustomerById(long id) {
        return customerService.getCustomerById(id);
    }


    /**
     * 通过ID List批量获取客户信息
     *
     * @param ids ids
     * @return ResultListVo
     */
    public ResultListVo<Customer> findCustomerListByIds(List<Long> ids) {
        return customerService.findCustomerListByIds(ids);
    }

    /**
     * 分页获取客户列表
     *
     * @param queryPageDto queryPageDto
     * @return ResultPageVo
     */
    public ResultPageVo<Customer> findPageList(CustomerQueryPageDto queryPageDto) {
        return customerService.findPageList(queryPageDto);
    }
}
