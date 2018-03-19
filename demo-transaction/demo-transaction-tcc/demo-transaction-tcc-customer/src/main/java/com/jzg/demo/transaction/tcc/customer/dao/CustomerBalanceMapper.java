package com.jzg.demo.transaction.tcc.customer.dao;

import com.jzg.demo.transaction.tcc.customer.model.CustomerBalance;
import com.jzg.demo.transaction.tcc.customer.model.CustomerBalanceExample;

import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;

public interface CustomerBalanceMapper {
    long countByExample(CustomerBalanceExample example);

    int deleteByExample(CustomerBalanceExample example);

    int deleteByPrimaryKey(Long id);

    int insert(CustomerBalance record);

    int insertSelective(CustomerBalance record);

    List<CustomerBalance> selectByExample(CustomerBalanceExample example);

    CustomerBalance selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") CustomerBalance record, @Param("example") CustomerBalanceExample example);

    int updateByExample(@Param("record") CustomerBalance record, @Param("example") CustomerBalanceExample example);

    int updateByPrimaryKeySelective(CustomerBalance record);

    int updateByPrimaryKey(CustomerBalance record);

    /**
     * 通过cutomerId获取客户余额
     *
     * @param customerId
     * @return
     */
    CustomerBalance getCustomerBalanceByCustomerId(Long customerId);


    /**
     * 冻结账户可用余额
     * <p>可用余额减少，冻结余额增加</p>
     *
     * @param customerId
     * @param frozenAmount
     * @return
     */
    int frozenBalance(@Param("customerId") Long customerId, @Param("frozenAmount") BigDecimal frozenAmount);

    /**
     * 确认冻结的余额扣减
     * <p>冻结余额减少，总余额减少</p>
     *
     * @param customerId
     * @param frozenAmount
     * @return
     */
    int confirmDecrBalance(@Param("customerId") Long customerId, @Param("frozenAmount") BigDecimal frozenAmount);

    /**
     * 取消冻结余额
     * <p>冻结余额减少，可用余额增加</p>
     *
     * @param customerId
     * @param frozenAmount
     * @return
     */
    int cancelFrozenBalance(@Param("customerId") Long customerId, @Param("frozenAmount") BigDecimal frozenAmount);


    /**
     * 直接扣减金额
     *
     * @param customerId
     * @param amount
     * @return
     */
    int decrBalance(@Param("customerId") Long customerId, @Param("amount") BigDecimal amount);

    /**
     * 直接增加金额
     *
     * @param customerId
     * @param amount
     * @return
     */
    int incrBalance(@Param("customerId") Long customerId, @Param("amount") BigDecimal amount);
}