package com.jzg.demo.transaction.jta.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jzg.demo.transaction.jta.dao.db1.ProductMapper;
import com.jzg.demo.transaction.tcc.customer.model.Product;
import com.jzg.framework.core.vo.ResultPageVo;
import com.jzg.framework.core.vo.RetStatus;

import org.springframework.stereotype.Service;

import java.util.List;

import javax.annotation.Resource;

/**
 * @description: ProductServiceImpl
 * @author: JZG
 * @date: 2018/1/22 16:50
 * @version: v1.0.0
 */
@Service("productService")
public class ProductServiceImpl implements ProductService {

    @Resource
    public ProductMapper productMapper;

    /**
     * 分页获取商品信息
     *
     * @param pageIndex pageIndex
     * @param pageSize  pageSize
     * @return
     */
    @Override
    public ResultPageVo<Product> findProductByPage(int pageIndex, int pageSize) {
        ResultPageVo<Product> resultPageVo = new ResultPageVo<Product>();

        PageHelper.startPage(pageIndex, pageSize);
        List<Product> productList = productMapper.selectAll();
        PageInfo<Product> pageInfo = new PageInfo<Product>(productList);

        resultPageVo.setPageNo(pageInfo.getPageNum());
        resultPageVo.setPageCount((int) pageInfo.getPages());
        resultPageVo.setTotal((int) pageInfo.getTotal());
        resultPageVo.setPageSize(pageInfo.getPageSize());
        resultPageVo.setList(pageInfo.getList());

        resultPageVo.setStatus(RetStatus.Ok.getValue());
        return resultPageVo;
    }

    /**
     * 分页获取商品信息（动态拼SQl）
     *
     * @param pageIndex pageIndex
     * @param pageSize  pageSize
     * @return
     */
    @Override
    public ResultPageVo<Product> findProductByPage1(int pageIndex, int pageSize) {
        ResultPageVo<Product> resultPageVo = new ResultPageVo<Product>();

        if (pageIndex <= 0 || pageSize <= 0){
            resultPageVo.setStatus(500);
            return resultPageVo;
        }

        int total = productMapper.findProductByPageCount1(null);
        List<Product> products = productMapper.findProductByPage1(pageIndex - 1, pageSize, null);

        resultPageVo.setPageNo(pageIndex);
        resultPageVo.setPageCount(total/pageSize);
        resultPageVo.setTotal(total);
        resultPageVo.setPageSize(pageSize);
        resultPageVo.setList(products);

        resultPageVo.setStatus(RetStatus.Ok.getValue());
        return resultPageVo;
    }
}
