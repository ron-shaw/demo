package com.jzg.dealer.manage.biz;


import com.jzg.dealer.manage.vo.PayTransactionResultVo;
import com.jzg.framework.core.vo.ResultPageVo;
import com.jzg.framework.utils.date.DateUtils;
import com.jzg.payment.service.api.PayTransactionService;
import com.jzg.payment.service.dto.query.PayQueryPageDto;
import com.jzg.payment.service.model.PayTransaction;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;
import org.springframework.test.context.TestExecutionListeners;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by JZG on 2017/7/25.
 */
@Component("payTransactionBiz")
public class PayTransactionBiz {

    @Resource
    private PayTransactionService payTransactionService;

    public ResultPageVo<PayTransactionResultVo> getPageByParam(PayQueryPageDto payQueryPageDto){
        ResultPageVo<PayTransaction> pageVo = payTransactionService.getPageByParam(payQueryPageDto);
        List<PayTransaction> payTransactionList = pageVo.getList();
        List<PayTransactionResultVo> payTransactionResultVoList = new ArrayList<PayTransactionResultVo>();

        PayTransactionResultVo payTransactionResultVo;
        if(payTransactionList != null){
            for(PayTransaction payTransaction : payTransactionList){
                payTransactionResultVo = new PayTransactionResultVo();
                BeanUtils.copyProperties(payTransaction, payTransactionResultVo);
                payTransactionResultVo.setTradeId(String.valueOf(payTransaction.getId()));
                payTransactionResultVo.setAmount(String.valueOf(payTransaction.getAmount()));
                payTransactionResultVo.setCreateTime(DateUtils.formatDate(payTransaction.getCreateTime()));
                payTransactionResultVoList.add(payTransactionResultVo);
            }
        }
        ResultPageVo<PayTransactionResultVo> resultPageVo = new ResultPageVo<PayTransactionResultVo>();
        BeanUtils.copyProperties(pageVo, resultPageVo);
        resultPageVo.setTotal((int) pageVo.getTotal());
        resultPageVo.setList(payTransactionResultVoList);
        return resultPageVo;

    }

}
