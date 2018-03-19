package com.jzg.demo.service.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @description: PageHelperProperties
 * @author: JZG
 * @date: 2018/3/19 11:19
 * @version:
 */
@Component
@ConfigurationProperties(prefix = PageHelperProperties.PAGER_HELPER)
public class PageHelperProperties {
    public static final String PAGER_HELPER = "pagehelper";

    private String reasonable;
    private String supportMethodsArguments;
    private String returnPageInfo;
    private String params;

    /**
     * Getter for property 'reasonable'.
     *
     * @return Value for property 'reasonable'.
     */
    public String getReasonable() {
        return reasonable;
    }

    /**
     * Setter for property 'reasonable'.
     *
     * @param reasonable Value to set for property 'reasonable'.
     */
    public void setReasonable(String reasonable) {
        this.reasonable = reasonable;
    }

    /**
     * Getter for property 'supportMethodsArguments'.
     *
     * @return Value for property 'supportMethodsArguments'.
     */
    public String getSupportMethodsArguments() {
        return supportMethodsArguments;
    }

    /**
     * Setter for property 'supportMethodsArguments'.
     *
     * @param supportMethodsArguments Value to set for property 'supportMethodsArguments'.
     */
    public void setSupportMethodsArguments(String supportMethodsArguments) {
        this.supportMethodsArguments = supportMethodsArguments;
    }

    /**
     * Getter for property 'returnPageInfo'.
     *
     * @return Value for property 'returnPageInfo'.
     */
    public String getReturnPageInfo() {
        return returnPageInfo;
    }

    /**
     * Setter for property 'returnPageInfo'.
     *
     * @param returnPageInfo Value to set for property 'returnPageInfo'.
     */
    public void setReturnPageInfo(String returnPageInfo) {
        this.returnPageInfo = returnPageInfo;
    }

    /**
     * Getter for property 'params'.
     *
     * @return Value for property 'params'.
     */
    public String getParams() {
        return params;
    }

    /**
     * Setter for property 'params'.
     *
     * @param params Value to set for property 'params'.
     */
    public void setParams(String params) {
        this.params = params;
    }



}
