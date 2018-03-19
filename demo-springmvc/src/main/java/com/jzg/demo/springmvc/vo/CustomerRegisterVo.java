package com.jzg.demo.springmvc.vo;

/**
 * @description: CustomerRegisterVo
 * @author: JZG
 * @date: 2018/1/16 16:01
 * @version: v1.0.0
 */
public class CustomerRegisterVo {
    /**
     * Getter for property 'id'.
     *
     * @return Value for property 'id'.
     */
    public Long getId() {
        return id;
    }

    /**
     * Setter for property 'id'.
     *
     * @param id Value to set for property 'id'.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Getter for property 'loginName'.
     *
     * @return Value for property 'loginName'.
     */
    public String getLoginName() {
        return loginName;
    }

    /**
     * Setter for property 'loginName'.
     *
     * @param loginName Value to set for property 'loginName'.
     */
    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    private Long id;
    private String loginName;
}
