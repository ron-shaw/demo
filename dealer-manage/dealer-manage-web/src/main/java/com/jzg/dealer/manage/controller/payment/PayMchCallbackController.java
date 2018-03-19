package com.jzg.dealer.manage.controller.payment;

import com.jzg.dealer.manage.vo.PayMchCallbackParamVo;
import com.jzg.framework.core.vo.ResultPageVo;
import com.jzg.framework.core.vo.RetStatus;
import com.jzg.framework.utils.date.DateUtils;
import com.jzg.framework.utils.string.StringUtils;
import com.jzg.payment.service.api.PayMchCallbackService;
import com.jzg.payment.service.dto.query.MchCallbackQueryPageDto;
import com.jzg.payment.service.model.PayMchCallback;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * Created by JZG on 2017/7/25.
 * 合作商户回调记录Controller
 */
@Controller
@RequestMapping("/payment/mch_callback")
public class PayMchCallbackController {


    @Resource
    private PayMchCallbackService payMchCallbackService;

    @RequestMapping
    public String index() {
        return "/payment/pay/pay_index";
    }

    @ResponseBody
    @RequestMapping("/list")
    public ResultPageVo<PayMchCallback> list(PayMchCallbackParamVo paramVo) {
        ResultPageVo<PayMchCallback> resultPageVo;
        MchCallbackQueryPageDto mchCallbackQueryPageDto = new MchCallbackQueryPageDto();
        BeanUtils.copyProperties(paramVo, mchCallbackQueryPageDto);
        try {
            if (StringUtils.isNotNull(paramVo.getStartTime())) {
                mchCallbackQueryPageDto.setStartTime(DateUtils.parseDate(paramVo.getStartTime(), "yyyy-MM-dd"));
            }
            if (StringUtils.isNotNull(paramVo.getEndTime())) {
                mchCallbackQueryPageDto.setEndTime(DateUtils.parseDate(paramVo.getEndTime(), "yyyy-MM-dd"));
            }
            resultPageVo = payMchCallbackService.getPageByParam(mchCallbackQueryPageDto);
        } catch (Exception e) {
            resultPageVo = new ResultPageVo<PayMchCallback>();
            resultPageVo.setStatus(RetStatus.Failure.getValue());
            resultPageVo.setMsg("日期格式有误");
        }

        return resultPageVo;
    }
}
