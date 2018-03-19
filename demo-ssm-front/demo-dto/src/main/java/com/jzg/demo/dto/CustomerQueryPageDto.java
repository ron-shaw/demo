package com.jzg.demo.dto;

import com.jzg.framework.core.dto.BaseQueryPageDto;

/**
 * 自定义DTO
 * Created by JZG on 2016/11/16.
 */
public class CustomerQueryPageDto extends BaseQueryPageDto {
    /**
     * limitId
     */
    private int limitId;

    /**
     * 获取limitId
     * @return limitId
     */
    public int getLimitId() {
        return limitId;
    }

    /**
     * 设置limitId
     * @param limitId limitId
     */
    public void setLimitId(int limitId) {
        this.limitId = limitId;
    }
}
