package com.jzg.demo.transaction.tcc.customer.service.impl;

import com.jzg.demo.transaction.tcc.customer.api.CustomerService;
import com.jzg.demo.transaction.tcc.customer.dao.CustomerBalanceMapper;
import com.jzg.demo.transaction.tcc.customer.dao.CustomerMapper;
import com.jzg.demo.transaction.tcc.customer.model.Customer;
import com.jzg.demo.transaction.tcc.customer.model.CustomerBalance;
import com.jzg.framework.core.exception.BizException;

import org.mengyun.tcctransaction.api.Compensable;
import org.mengyun.tcctransaction.dubbo.context.DubboTransactionContextEditor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

import javax.annotation.Resource;

/**
 * @description: CustomerServiceImpl
 * @author: JZG
 * @date: 2018/3/6 11:47
 * @version:
 */
@Service("customerService")
public class CustomerServiceImpl implements CustomerService {

    @Resource
    private CustomerMapper customerMapper;
    @Resource
    private CustomerBalanceMapper customerBalanceMapper;

    /**
     * 获取客户信息  通过客户ID
     *
     * @param customerId 客户ID
     * @return
     */
    @Override
    public Customer getCustomerById(Long customerId) {
        return customerMapper.selectByPrimaryKey(customerId);
    }

    /**
     * 通过客户ID  获取客户余额
     *
     * @param customerId 客户ID
     * @return
     */
    @Override
    public CustomerBalance getCustomerBalanceByCustomerId(Long customerId) {
        return customerBalanceMapper.getCustomerBalanceByCustomerId(customerId);
    }

    /**
     * 扣减余额
     *
     * @param customerId
     * @param amount
     * @return
     */
    @Override
    @Compensable(confirmMethod = "confirmDecrBalance", cancelMethod = "cancelDecrBalance", transactionContextEditor = DubboTransactionContextEditor.class)
    public boolean decrBalance(Long customerId, BigDecimal amount) {
        System.out.println("进入decrBalance 冻结余额，尝试冻结");

        if (customerId == null || customerId <= 0 || amount == null || amount.doubleValue() <= 0) {
            throw new BizException(30001, "customerId或amount 参数非法");
        }

        CustomerBalance customerBalance = customerBalanceMapper.getCustomerBalanceByCustomerId(customerId);
        if (customerBalance == null || customerBalance.getId() <= 0) {
            return false;
        }

        //判断是否已冻结过

        //冻结余额
        int nRet = customerBalanceMapper.frozenBalance(customerId, amount);
        System.out.println("进入decrBalance 冻结余额，尝试冻结" + (nRet > 0 ? "成功" : "失败"));

        return nRet > 0;
    }

    /**
     * 冻结金额转为扣减
     *
     * @param customerId
     * @param amount
     * @return
     */
    public boolean confirmDecrBalance(Long customerId, BigDecimal amount) {
        System.out.println("进入confirmDecrBalance冻结余额转为扣减，确认支付");

        //冻结余额转为消费扣减
        int nRet = customerBalanceMapper.confirmDecrBalance(customerId, amount);

        System.out.println("进入confirmDecrBalance冻结余额转为扣减，确认支付" + (nRet > 0 ? "成功" : "失败"));

        return nRet > 0;
    }

    /**
     * 冻结金额解冻
     *
     * @param customerId
     * @param amount
     * @return
     */
    public boolean cancelFrozenBalance(Long customerId, BigDecimal amount) {
        System.out.println("进入cancelFrozenBalance冻结金额解冻");
        //取消冻结
        int nRet = customerBalanceMapper.cancelFrozenBalance(customerId, amount);
        System.out.println("进入cancelFrozenBalance冻结金额解冻，取消冻结" + (nRet > 0 ? "成功" : "失败"));

        return nRet > 0;
    }

    /**
     * 增加余额
     *
     * @param customerId
     * @param amount
     * @return
     */
    @Override
    public boolean incrBalance(Long customerId, BigDecimal amount) {
        if (customerId == null || customerId <= 0 || amount == null || amount.doubleValue() <= 0) {
            throw new BizException(30001, "customerId或amount 参数非法");
        }

        CustomerBalance customerBalance = customerBalanceMapper.getCustomerBalanceByCustomerId(customerId);
        if (customerBalance == null || customerBalance.getId() <= 0) {
            return false;
        }

        return customerBalanceMapper.incrBalance(customerId, amount) > 0;
    }
}
