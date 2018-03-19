package com.jzg.demo.transaction.tcc.stock.service.impl;

import com.jzg.demo.transaction.tcc.stock.api.StockService;
import com.jzg.demo.transaction.tcc.stock.dao.ProductMapper;
import com.jzg.demo.transaction.tcc.stock.dao.StockMapper;
import com.jzg.demo.transaction.tcc.stock.model.Product;
import com.jzg.framework.core.exception.BizException;

import org.mengyun.tcctransaction.api.Compensable;
import org.mengyun.tcctransaction.dubbo.context.DubboTransactionContextEditor;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @description: StockServcieImpl
 * @author: JZG
 * @date: 2018/3/5 17:12
 * @version:
 */
@Service("stockService")
public class StockServcieImpl implements StockService {
    @Resource
    private StockMapper stockMapper;
    @Resource
    private ProductMapper productMapper;

    /**
     * 扣减库存
     *
     * @param productId productId
     * @param quantity  quantity
     */
    @Compensable(confirmMethod = "confirmDecrStock", cancelMethod = "cancelDecrStock", transactionContextEditor = DubboTransactionContextEditor.class)
    public boolean decrStock(Long productId, Integer quantity){
        System.out.println("进入 decrStock 尝试锁定库存");
        boolean bRet = false;

        Product product  = productMapper.getProductById(productId);
        if (product == null){
            throw new BizException(10001, "商品不存在");
        }

        bRet = stockMapper.decrStock(productId, quantity) > 0;

        System.out.println("完成 decrStock 尝试锁定库存" + (bRet ? "成功" : "失败"));
        return bRet;
    }

    /**
     * 确认扣减库存
     *
     * @param productId
     * @param quantity
     */
    public void confirmDecrStock(Long productId, Integer quantity) {
        System.out.println("进入 confirmDecrStock 确认扣减库存。");
        //TODO:实际应该是这里进行扣减，上面只是锁定

        int nRet = 1;

        System.out.println("完成 confirmDecrStock 确认扣减库存" + (nRet > 0 ? "成功" : "失败"));
    }

    /**
     * 取消扣减库存
     *
     * @param productId
     * @param quantity
     */
    public void cancelDecrStock(Long productId, Integer quantity) {
        System.out.println("进入 cancelDecrStock 取消扣减库存。");

        int nRet = stockMapper.incrStock(productId, quantity);

        System.out.println("完成 cancelDecrStock 取消扣减库存" + (nRet > 0 ? "成功" : "失败"));
    }
}
