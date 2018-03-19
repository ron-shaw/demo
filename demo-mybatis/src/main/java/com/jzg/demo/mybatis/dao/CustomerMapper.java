package com.jzg.demo.mybatis.dao;

import com.jzg.demo.mybatis.dto.CustomerDto;
import com.jzg.demo.mybatis.model.Customer;
import java.util.List;

public interface CustomerMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Customer record);

    Customer selectByPrimaryKey(Long id);

    List<Customer> selectAll();

    int updateByPrimaryKey(Customer record);







    List<CustomerDto> findCustomerAndProductList();
}