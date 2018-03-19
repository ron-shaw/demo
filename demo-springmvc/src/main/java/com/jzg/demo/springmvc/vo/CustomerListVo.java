package com.jzg.demo.springmvc.vo;

import com.jzg.demo.springmvc.model.Customer;

import java.util.List;

/**
 * @description: CustomerListVo
 * @author: JZG
 * @date: 2018/1/17 12:03
 * @version: v1.0.0
 */
public class CustomerListVo {
    /**
     * Getter for property 'customers'.
     *
     * @return Value for property 'customers'.
     */
    public List<Customer> getCustomers() {
        return customers;
    }

    /**
     * Setter for property 'customers'.
     *
     * @param customers Value to set for property 'customers'.
     */
    public void setCustomers(List<Customer> customers) {
        this.customers = customers;
    }

    private List<Customer> customers;
}
