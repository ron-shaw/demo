package com.jzg.demo.transaction.tcc.stock.api;

import com.jzg.demo.transaction.tcc.stock.model.Product;
import com.jzg.framework.core.vo.ResultPageVo;

/**
 * @description: ProductService
 * @author: JZG
 * @date: 2018/1/22 16:49
 * @version: v1.0.0
 */
public interface ProductService {
    /**
     * 分页获取商品信息
     * @param pageIndex pageIndex
     * @param pageSize pageSize
     * @return
     */
    ResultPageVo<Product> findProductByPage(int pageIndex, int pageSize);


    /**
     * 分页获取商品信息（动态拼SQl）
     * @param pageIndex pageIndex
     * @param pageSize pageSize
     * @return
     */
    ResultPageVo<Product> findProductByPage1(int pageIndex, int pageSize);
}
