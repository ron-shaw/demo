package com.jzg.demo.transaction.jta.dao.db2;

import com.jzg.demo.transaction.tcc.customer.model.CustomerBalance;

import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;

public interface CustomerBalanceMapper {
    int deleteByPrimaryKey(Long id);

    int insert(CustomerBalance record);

    CustomerBalance selectByPrimaryKey(Long id);

    List<CustomerBalance> selectAll();

    int updateByPrimaryKey(CustomerBalance record);


    /**
     * 扣减金额
     * @param customerId
     * @param amount
     * @return
     */
    int decrBalance(@Param("customerId") Long customerId, @Param("amount") BigDecimal amount);


}