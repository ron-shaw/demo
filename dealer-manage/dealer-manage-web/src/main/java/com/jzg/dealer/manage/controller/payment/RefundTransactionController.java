package com.jzg.dealer.manage.controller.payment;

import com.github.pagehelper.PageInfo;
import com.jzg.dealer.manage.biz.RefundTransactionBiz;
import com.jzg.dealer.manage.controller.BaseController;
import com.jzg.framework.core.vo.ResultVo;
import com.jzg.framework.exception.ExceptionHandling;
import com.jzg.payment.service.dto.query.RefundQueryPageDto;
import com.jzg.payment.service.model.RefundTransaction;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * Created by JZG on 2017/7/25.
 * 支付系统-退款交易
 */
@Controller
@RequestMapping("/payment/refund")
public class RefundTransactionController extends BaseController {

    /**
     * 退款交易Biz
     */
    @Resource
    private RefundTransactionBiz refundTransactionBiz;

    /**
     * 分页获取退款流水
     * @param param 参数
     * @return {}
     */
    @ExceptionHandling
    @RequestMapping(value = "list")
    public String list(RefundQueryPageDto param) {
        return "/payment/refund/list";
    }

    /**
     * 分页获取退款流水
     * @param param 参数
     * @return {}
     */
    @ResponseBody
    @ExceptionHandling
    @RequestMapping(value = "getRefundList")
    public ResultVo<PageInfo<RefundTransaction>> getRefundList(RefundQueryPageDto param) {
        return refundTransactionBiz.getRefundList(param);
    }
}
