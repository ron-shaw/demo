package com.jzg.demo.transaction.tcc.stock.dao;

import com.jzg.demo.transaction.tcc.stock.model.Product;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProductMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Product record);

    Product selectByPrimaryKey(Long id);

    List<Product> selectAll();

    int updateByPrimaryKey(Product record);



    @Select("SELECT * FROM `product` WHERE id = #{productId}")
    @ResultMap("BaseResultMap")
    Product getProductById(@Param("productId") Long productId);



    int insert1(Product record);
    int insert2(Product record);
    int insertOrUpdate(Product record);

    /**
     * 自定义SQL片段
     * @return
     */
    List<Product> selectAll2();


    /**
     * 测试choose if等语法
     * @param productName productName
     * @return
     */
    @Transactional
    List<Product> findByCondition(@Param("productName") String productName);


    /**
     * 测试foreach语法
     * @param ids
     * @return
     */
    List<Product> findByIds(@Param("ids") List<Long> ids);


    /**
     * 批量插入商品
     * @return
     */
    int insertBatch(List<Product> productList);

    /**
     * 测试set语法
     * @param product
     * @return
     */
    int updateById(Product product);



    List<Product> findProductByPage1(@Param("pageIndex") int pageIndex, @Param("pageSize") int pageSize, @Param("loginName") String loginName);
    int findProductByPageCount1(@Param("loginName") String loginName);
}