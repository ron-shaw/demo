package com.jzg.demo.springmvc.vo;

import com.jzg.demo.springmvc.model.Customer;

import java.util.Map;

/**
 * @description: CustomerListVo
 * @author: JZG
 * @date: 2018/1/17 12:03
 * @version: v1.0.0
 */
public class CustomerMapVo {

    public Map<String, Customer> getCustomerMap() {
        return customerMap;
    }

    public void setCustomerMap(Map<String, Customer> customerMap) {
        this.customerMap = customerMap;
    }

    private Map<String, Customer> customerMap;
}
