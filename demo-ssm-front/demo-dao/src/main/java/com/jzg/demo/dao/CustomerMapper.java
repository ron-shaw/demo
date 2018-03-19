package com.jzg.demo.dao;

import com.jzg.demo.model.Customer;
import com.jzg.framework.dao.SqlServerBaseDao;

import java.util.List;

/**
 * CustomerMapper
 */
public interface CustomerMapper extends SqlServerBaseDao<Customer> {
    //TODO:自己实现的接口，下面添加

    /**
     * 创建客户1
     * @param customer 客户信息
     * @return 影响行数
     */
    Integer insertCustomer1(Customer customer);

    /**
     * 通过年龄获取客户列表
     * @param age 年龄
     * @return 客户列表
     */
    List<Customer> findCustomerByAge1(Integer age);

    /**
     * 通过ID获取客户信息
     * @param id 客户ID
     * @return 客户信息
     */
    Customer getCustomerById1(Long id);
}

