package com.jzg.demo.transaction.jta.dao.db2;

import com.jzg.demo.transaction.jta.dto.CustomerDto;
import com.jzg.demo.transaction.tcc.customer.model.Customer;

import java.util.List;

public interface CustomerMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Customer record);

    Customer selectByPrimaryKey(Long id);

    List<Customer> selectAll();

    int updateByPrimaryKey(Customer record);







    List<CustomerDto> findCustomerAndProductList();
}