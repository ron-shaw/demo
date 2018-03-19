package com.jzg.demo.transaction.tcc.customer.api;

import com.jzg.demo.transaction.tcc.customer.model.Customer;
import com.jzg.demo.transaction.tcc.customer.model.CustomerBalance;

import org.mengyun.tcctransaction.api.Compensable;

import java.math.BigDecimal;

/**
 * @description: CustomerService
 * @author: JZG
 * @date: 2018/3/6 11:24
 * @version:
 */
public interface CustomerService {

    /**
     * 获取客户信息  通过客户ID
     *
     * @param customerId 客户ID
     * @return
     */
    Customer getCustomerById(Long customerId);


    /**
     * 通过客户ID  获取客户余额
     *
     * @param customerId 客户ID
     * @return
     */
    CustomerBalance getCustomerBalanceByCustomerId(Long customerId);


    /**
     * 扣减余额【首先冻结金额】
     *
     * @param customerId
     * @param amount
     * @return
     */
    @Compensable
    boolean decrBalance(Long customerId, BigDecimal amount);


    /**
     * 冻结金额转为扣减
     * @param customerId
     * @param amount
     * @return
     */
    boolean confirmDecrBalance(Long customerId, BigDecimal amount);

    /**
     * 冻结金额解冻
     * @param customerId
     * @param amount
     * @return
     */
    boolean cancelFrozenBalance(Long customerId, BigDecimal amount);

    /**
     * 增加余额
     *
     * @param customerId
     * @param amount
     * @return
     */
    boolean incrBalance(Long customerId, BigDecimal amount);
}
