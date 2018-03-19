package com.jzg.dealer.manage.biz;

import com.github.pagehelper.PageInfo;
import com.jzg.framework.core.vo.ResultVo;
import com.jzg.payment.service.api.RefundTransactionService;
import com.jzg.payment.service.dto.query.RefundQueryPageDto;
import com.jzg.payment.service.model.RefundTransaction;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by JZG on 2017/7/25.
 */
@Component("refundTransactionBiz")
public class RefundTransactionBiz {

    /**
     * 退款交易服务
     */
    @Resource
    private RefundTransactionService refundTransactionService;

    /**
     * 分页获取退款交易记录
     * @param param 参数
     * @return {}
     */
    public ResultVo<PageInfo<RefundTransaction>> getRefundList(RefundQueryPageDto param) {
        return refundTransactionService.findPageList(param);
    }
}
