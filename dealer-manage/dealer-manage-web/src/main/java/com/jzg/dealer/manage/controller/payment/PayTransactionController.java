package com.jzg.dealer.manage.controller.payment;

import com.alibaba.dubbo.rpc.RpcException;
import com.jzg.dealer.manage.biz.PayTransactionBiz;
import com.jzg.dealer.manage.vo.PayTransactionParamVo;
import com.jzg.dealer.manage.vo.PayTransactionResultVo;
import com.jzg.framework.core.vo.ResultPageVo;
import com.jzg.framework.core.vo.RetStatus;
import com.jzg.framework.utils.date.DateUtils;
import com.jzg.framework.utils.string.StringUtils;
import com.jzg.payment.service.api.PayTransactionService;
import com.jzg.payment.service.dto.query.PayQueryPageDto;
import com.jzg.payment.service.model.PayTransaction;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.text.ParseException;

/**
 * Created by JZG on 2017/7/25.
 * 支付流水Controller
 */
@Controller
@RequestMapping("/manage/payment/pay")
public class PayTransactionController {

    @Resource
    private PayTransactionBiz payTransactionBiz;

    @RequestMapping
    public ModelAndView index() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("payment/pay/list");
        return modelAndView;
    }

    @ResponseBody
    @RequestMapping("/list")
    public ResultPageVo<PayTransactionResultVo> list(PayTransactionParamVo paramVo) {
        ResultPageVo<PayTransactionResultVo> resultPageVo;
        PayQueryPageDto payQueryPageDto = new PayQueryPageDto();
        BeanUtils.copyProperties(paramVo, payQueryPageDto);
        try {
            if (StringUtils.isNotNull(paramVo.getStartTime())) {
                payQueryPageDto.setStartTime(DateUtils.parseDate(paramVo.getStartTime(), "yyyy-MM-dd"));
            }
            if (StringUtils.isNotNull(paramVo.getEndTime())) {
                payQueryPageDto.setEndTime(DateUtils.parseDate(paramVo.getEndTime(), "yyyy-MM-dd"));
            }
            resultPageVo = payTransactionBiz.getPageByParam(payQueryPageDto);
        } catch (ParseException parseExec) {
            resultPageVo = new ResultPageVo<PayTransactionResultVo>();
            resultPageVo.setStatus(RetStatus.Failure.getValue());
            resultPageVo.setMsg("日期格式有误");
        } catch (RpcException rpcExce) {
            resultPageVo = new ResultPageVo<PayTransactionResultVo>();
            resultPageVo.setStatus(RetStatus.Failure.getValue());
            resultPageVo.setMsg("服务器错误");
        }

        return resultPageVo;
    }


}
