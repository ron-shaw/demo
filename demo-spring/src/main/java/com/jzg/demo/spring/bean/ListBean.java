package com.jzg.demo.spring.bean;

import java.util.List;
import java.util.Map;

/**
 * @description: DataSource
 * @author: JZG
 * @date: 2018/1/12 16:30
 * @version: v1.0.0
 */
public class ListBean {
    /**
     * Getter for property 'ips'.
     *
     * @return Value for property 'ips'.
     */
    public List<String> getIps() {
        return ips;
    }

    /**
     * Setter for property 'ips'.
     *
     * @param ips Value to set for property 'ips'.
     */
    public void setIps(List<String> ips) {
        this.ips = ips;
    }

    private List<String> ips;

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





    @Override
    public String toString() {
        return "ListBean{" +
                "ips=" + ips +
                ", customers=" + customers +
                '}';
    }

}
