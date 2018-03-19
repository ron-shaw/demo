package com.jzg.demo.service.api;

import com.jzg.demo.service.dto.query.CustomerQueryPageDto;
import com.jzg.demo.service.model.Customer;
import com.jzg.framework.core.vo.ResultListVo;
import com.jzg.framework.core.vo.ResultPageVo;
import com.jzg.framework.core.vo.ResultVo;

import java.util.List;

/**
 * 客户服务接口
 * Created by JZG on 2016/11/16.
 */
public interface CustomerService {
    /**
     * 创建客户
     *
     * @param customer customer
     * @return ResultVo
     */
    ResultVo<Boolean> create(Customer customer);

    /**
     * 通过用户ID更新用户信息
     *
     * @param customer customer
     * @return ResultVo
     */
    ResultVo<Boolean> update(Customer customer);

    /**
     * 通用用户ID获取用户信息
     *
     * @param id id
     * @return ResultVo
     */
    ResultVo<Customer> getCustomerById(long id);


    /**
     * 通过ID List批量获取客户信息
     *
     * @param ids ids
     * @return ResultListVo
     */
    ResultListVo<Customer> findCustomerListByIds(List<Long> ids);

    /**
     * 分页获取客户列表
     *
     * @param queryPageVo queryPageVo
     * @return ResultPageVo
     */
    ResultPageVo<Customer> findPageList(CustomerQueryPageDto queryPageVo);
}
