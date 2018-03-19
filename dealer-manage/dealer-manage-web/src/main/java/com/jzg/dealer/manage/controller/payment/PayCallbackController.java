package com.jzg.dealer.manage.controller.payment;

import com.github.pagehelper.PageInfo;
import com.jzg.dealer.manage.biz.PayCallbackBiz;
import com.jzg.dealer.manage.controller.BaseController;
import com.jzg.framework.core.vo.ResultVo;
import com.jzg.payment.service.dto.query.CallbackQueryPageDto;
import com.jzg.payment.service.model.PayCallback;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * Created by JZG on 2017/7/25.
 */
@Controller
@RequestMapping("payCallback")
public class PayCallbackController extends BaseController {

    @Resource
    private PayCallbackBiz payCallbackBiz;

    @ResponseBody
    @RequestMapping(value = "getCallbackList")
    public ResultVo<PageInfo<PayCallback>> getCallbackList(CallbackQueryPageDto param) {
        ResultVo<PageInfo<PayCallback>> resList = payCallbackBiz.getPageList(param);
        return resList;
    }

}
