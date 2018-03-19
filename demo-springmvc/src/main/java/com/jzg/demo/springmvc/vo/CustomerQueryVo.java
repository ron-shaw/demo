package com.jzg.demo.springmvc.vo;

/**
 * @description: CustomerQueryVo
 * @author: JZG
 * @date: 2018/1/16 16:05
 * @version: v1.0.0
 */
public class CustomerQueryVo {
    private String loginName;

    private Integer pageIndex;
    private Integer pageSize;

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
     * Getter for property 'pageIndex'.
     *
     * @return Value for property 'pageIndex'.
     */
    public Integer getPageIndex() {
        return pageIndex;
    }

    /**
     * Setter for property 'pageIndex'.
     *
     * @param pageIndex Value to set for property 'pageIndex'.
     */
    public void setPageIndex(Integer pageIndex) {
        this.pageIndex = pageIndex;
    }

    /**
     * Getter for property 'pageSize'.
     *
     * @return Value for property 'pageSize'.
     */
    public Integer getPageSize() {
        return pageSize;
    }

    /**
     * Setter for property 'pageSize'.
     *
     * @param pageSize Value to set for property 'pageSize'.
     */
    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }
}
