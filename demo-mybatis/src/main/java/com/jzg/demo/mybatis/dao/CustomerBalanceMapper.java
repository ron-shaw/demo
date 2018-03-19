package com.jzg.demo.mybatis.dao;

import com.jzg.demo.mybatis.model.CustomerBalance;
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