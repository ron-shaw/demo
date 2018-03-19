package com.jzg.dealer.manage.vo;

import com.jzg.framework.core.vo.BaseQueryPageVo;

/**
 * Created by JZG on 2017/7/25.
 * 支付流水请求的ParamVo
 */
public class PayTransactionParamVo extends BaseQueryPageVo {

    /** 开始时间 **/
    private String startTime;
    /** 结束时间 **/
    private String endTime;
    /** 商户订单号 **/
    private String mchOrderNo;
    /** 支付流水号 **/
    private String tradeId;
    /** 支付状态 **/
    private String status;
    /** 支付平台 **/
    private String payPlat;

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

    public String getMchOrderNo() {
        return mchOrderNo;
    }

    public void setMchOrderNo(String mchOrderNo) {
        this.mchOrderNo = mchOrderNo;
    }

    public String getTradeId() {
        return tradeId;
    }

    public void setTradeId(String tradeId) {
        this.tradeId = tradeId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPayPlat() {
        return payPlat;
    }

    public void setPayPlat(String payPlat) {
        this.payPlat = payPlat;
    }
}
