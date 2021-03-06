package com.jzg.demo.transaction.jta.dao.db1;

import com.jzg.demo.transaction.tcc.customer.model.Stock;

import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface StockMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Stock record);

    Stock selectByPrimaryKey(Long id);

    List<Stock> selectAll();

    int updateByPrimaryKey(Stock record);


    /**
     * 扣减库存
     *
     * @param productId productId
     * @param quantity  quantity
     * @return
     */
    int decrStock(@Param("productId") Long productId, @Param("quantity") Integer quantity);


    /**
     * 增加库存
     *
     * @param productId productId
     * @param quantity  quantity
     * @return
     */
    int incrStock(@Param("productId") Long productId, @Param("quantity") Integer quantity);
}