package com.jzg.demo.springmvc.model;

/**
 * @description: CustomerQueryVo
 * @author: JZG
 * @date: 2018/1/16 16:05
 * @version: v1.0.0
 */
public class CustomerQueryDto {

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

    /**
     * Getter for property 'start'.
     *
     * @return Value for property 'start'.
     */
    public int getStart() {
        return start;
    }

    /**
     * Setter for property 'start'.
     *
     * @param start Value to set for property 'start'.
     */
    public void setStart(int start) {
        this.start = start;
    }

    /**
     * Getter for property 'pageSize'.
     *
     * @return Value for property 'pageSize'.
     */
    public int getPageSize() {
        return pageSize;
    }

    /**
     * Setter for property 'pageSize'.
     *
     * @param pageSize Value to set for property 'pageSize'.
     */
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    private String loginName;
    private int start;
    private int pageSize;


}
