package com.jzg.demo.springboot.model;

/**
 * @description: Customer
 * @author: JZG
 * @date: 2018/3/8 14:19
 * @version:
 */
import java.util.Date;

/**
 * @author: JZG
 * @description: Customer
 * @date: 2016/11/22 19:07
 */
public class Customer {
    private Long id;

    private String loginName;

    private Integer age;

    private Date indate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName == null ? null : loginName.trim();
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Date getIndate() {
        return indate;
    }

    public void setIndate(Date indate) {
        this.indate = indate;
    }


    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", loginName='" + loginName + '\'' +
                ", age=" + age +
                ", indate=" + indate +
                '}';
    }
}