package com.jzg.demo.transaction.jta.dto;

import com.jzg.demo.transaction.tcc.customer.model.Customer;
import com.jzg.demo.transaction.tcc.customer.model.Product;

import java.util.List;

/**
 * @description: CustomerDto
 * @author: JZG
 * @date: 2018/1/19 18:55
 * @version: v1.0.0
 */
public class CustomerDto extends Customer {
    public List<Product> getProductList() {
        return productList;
    }

    public void setProductList(List<Product> productList) {
        this.productList = productList;
    }

    private List<Product> productList;

    @Override
    public String toString() {
        return "CustomerDto{" +
                "productList=" + productList +
                "} " + super.toString();
    }
}
