package com.jzg.demo.mybatis.dto;

import com.jzg.demo.mybatis.model.Customer;
import com.jzg.demo.mybatis.model.Product;

public class ProductDto extends Product {
    private Customer customer;

    /**
     * Getter for property 'customer'.
     *
     * @return Value for property 'customer'.
     */
    public Customer getCustomer() {
        return customer;
    }

    /**
     * Setter for property 'customer'.
     *
     * @param customer Value to set for property 'customer'.
     */
    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    /*@Override
    public String toString() {
        return "ProductDto{" +
                "customer=" + customer +
                ", id=" + this.getId() +
                ", productName='" + this.getProductName() + '\'' +
                ", customerId=" + this.getCustomerId() +
                ", indate=" + this.getIndate() +
                '}';
    }*/


    @Override
    public String toString() {
        return "ProductDto{" +
                "customer=" + customer +
                "} " + super.toString();
    }
}