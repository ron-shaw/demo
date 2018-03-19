package com.jzg.demo.springmvc.dao;

import com.jzg.demo.springmvc.model.Customer;
import com.jzg.demo.springmvc.model.CustomerQueryDto;

import java.util.List;

public interface CustomerMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Customer record);

    Customer selectByPrimaryKey(Long id);

    List<Customer> selectAll();

    int updateByPrimaryKey(Customer record);


    //TODO: 自定义
    List<Customer> findCustomerByPage(CustomerQueryDto customerQueryDto);
}