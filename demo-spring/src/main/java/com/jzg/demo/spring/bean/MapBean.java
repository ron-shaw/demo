package com.jzg.demo.spring.bean;

import java.util.Map;

/**
 * @description: DataSource
 * @author: JZG
 * @date: 2018/1/12 16:30
 * @version: v1.0.0
 */
public class MapBean {


    /**
     * Getter for property 'keyVals'.
     *
     * @return Value for property 'keyVals'.
     */
    public Map<String, String> getKeyVals() {
        return keyVals;
    }

    /**
     * Setter for property 'keyVals'.
     *
     * @param keyVals Value to set for property 'keyVals'.
     */
    public void setKeyVals(Map<String, String> keyVals) {
        this.keyVals = keyVals;
    }

    private Map<String, String> keyVals;


    @Override
    public String toString() {
        return "MapBean{" +
                "keyVals=" + keyVals +
                '}';
    }
}
