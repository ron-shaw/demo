package com.jzg.dealer.manage.biz;

import com.github.pagehelper.PageInfo;
import com.jzg.framework.core.vo.ResultVo;
import com.jzg.payment.service.api.PayCallbackService;
import com.jzg.payment.service.dto.query.CallbackQueryPageDto;
import com.jzg.payment.service.model.PayCallback;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by JZG on 2017/7/25.
 */
@Component("payCallbackBiz")
public class PayCallbackBiz  {

    @Resource
    private PayCallbackService payCallbackService;


    public ResultVo<PageInfo<PayCallback>> getPageList(CallbackQueryPageDto param) {
        return payCallbackService.findCallbackPageList(param);
    }
}
