package com.jzg.demo.springmvc.model;

/**
 * @description: Contact
 * @author: JZG
 * @date: 2018/1/17 11:45
 * @version: v1.0.0
 */
public class Contact {
    /**
     * Getter for property 'mobile'.
     *
     * @return Value for property 'mobile'.
     */
    public String getMobile() {
        return mobile;
    }

    /**
     * Setter for property 'mobile'.
     *
     * @param mobile Value to set for property 'mobile'.
     */
    public Contact setMobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    /**
     * Getter for property 'address'.
     *
     * @return Value for property 'address'.
     */
    public String getAddress() {
        return address;
    }

    /**
     * Setter for property 'address'.
     *
     * @param address Value to set for property 'address'.
     */
    public Contact setAddress(String address) {
        this.address = address;
        return this;
    }

    private String mobile;
    private String address;
}
