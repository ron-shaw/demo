package com.jzg.demo.springmvc.vo;

import com.jzg.demo.springmvc.model.Contact;
import com.jzg.demo.springmvc.model.Customer;

/**
 * @description: CustCompVo
 * @author: JZG
 * @date: 2018/1/17 11:47
 * @version: v1.0.0
 */
public class CustomerContactVo extends Customer {
    /**
     * Getter for property 'contact'.
     *
     * @return Value for property 'contact'.
     */
    public Contact getContact() {
        return contact;
    }

    /**
     * Setter for property 'contact'.
     *
     * @param contact Value to set for property 'contact'.
     */
    public void setContact(Contact contact) {
        this.contact = contact;
    }

    private Contact contact;
}
