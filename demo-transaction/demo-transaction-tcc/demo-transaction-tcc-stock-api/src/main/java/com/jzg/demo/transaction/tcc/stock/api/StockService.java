package com.jzg.demo.transaction.tcc.stock.api;

import org.mengyun.tcctransaction.api.Compensable;

/**
 * @description: StockService
 * @author: JZG
 * @date: 2018/3/5 17:12
 * @version:
 */
public interface StockService {

    /**
     * 尝试扣减库存
     *
     * @param productId productId
     * @param quantity  quantity
     * @return
     */
    @Compensable
    boolean decrStock(Long productId, Integer quantity);


    /**
     * 确认扣减库存
     *
     * @param productId
     * @param quantity
     */
    void confirmDecrStock(Long productId, Integer quantity);

    /**
     * 取消扣减库存
     *
     * @param productId
     * @param quantity
     */
    void cancelDecrStock(Long productId, Integer quantity);

}
