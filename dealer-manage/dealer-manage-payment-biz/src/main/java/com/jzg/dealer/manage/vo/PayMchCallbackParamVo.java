package com.jzg.dealer.manage.vo;

import com.jzg.framework.core.vo.BaseQueryPageVo;

/**
 * Created by JZG on 2017/7/26.
 * 合作商户回调记录VO
 */
public class PayMchCallbackParamVo extends BaseQueryPageVo {

    /** 开始时间 **/
    private String startTime;
    /** 结束时间 **/
    private String endTime;
    /** 支付流水/退款流水 **/
    private Long tradeId;
    /** 交易类型：支付/退款 **/
    private int tradeType;

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Long getTradeId() {
        return tradeId;
    }

    public void setTradeId(Long tradeId) {
        this.tradeId = tradeId;
    }

    public int getTradeType() {
        return tradeType;
    }

    public void setTradeType(int tradeType) {
        this.tradeType = tradeType;
    }
}
