package com.jzg.demo.mybatis;

import com.jzg.demo.mybatis.dao.ProductMapper;
import com.jzg.demo.mybatis.dto.ProductDto;
import com.jzg.demo.mybatis.model.Product;
import com.jzg.framework.utils.RandomUitls;
import com.jzg.framework.utils.date.DateTime;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * @description: ProductMapperTest
 * @author: JZG
 * @date: 2018/1/19 14:44
 * @version: v1.0.0
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class ProductMapperTest {
    @Resource
    private ProductMapper productMapper;

    @Test
    public void deleteByPrimaryKey() throws Exception {
        int nRet = productMapper.deleteByPrimaryKey(14L);
        System.out.println("删除商品：" + nRet);
    }

    @Test
    public void insert() throws Exception {
        Product product = new Product();
        product.setCustomerId(1L);
        product.setProductName("测试商品_" + RandomUitls.generateString(5));
        product.setIndate(new Date());
        int nRet = productMapper.insert(product);
        System.out.println(nRet);
        System.out.println("添加商品：" + product.toString());
    }

    @Test
    public void insert2() throws Exception {
        Product product = new Product();
        product.setCustomerId(1L);
        product.setProductName("测试商品");
        product.setIndate(new Date());
        int nRet = productMapper.insert2(product);
        System.out.println("添加同名商品，影响行数：" + nRet);
        if (nRet > 0) {
            System.out.println("添加商品：" + product.toString());
        }
    }


    @Test
    public void insertOrUpdate() throws Exception {
        Product product = new Product();
        product.setId(3L);
        product.setCustomerId(1L);
        product.setProductName("测试商品" + RandomUitls.generateString(5));
        product.setIndate(new Date());
        int nRet = productMapper.insertOrUpdate(product);
        System.out.println("存在则添加，不存在则修改0，影响行数：" + nRet);
        if (nRet > 0) {
            System.out.println("更新商品：" + product.toString());
        }
    }


    @Test
    public void selectByPrimaryKey() throws Exception {
        Product product = productMapper.selectByPrimaryKey(1L);
        System.out.println("获取商品" + product);
    }

    @Test
    public void selectAll() throws Exception {
        List<Product> products = productMapper.selectAll();
        System.out.println("获取商品列表：" + products);
    }

    @Test
    public void updateByPrimaryKey() throws Exception {
        Product product = new Product();
        product.setId(2L);
        product.setCustomerId(1L);
        product.setProductName("test_product_" + RandomUitls.generateString(5));
        product.setIndate(new Date());
        int nRet = productMapper.updateByPrimaryKey(product);
        System.out.println("修改商品：" + product);
    }


    /**
     * 测试自定义SQL语句块
     *
     * @throws Exception
     */
    @Test
    public void selectAll2() throws Exception {
        List<Product> products = productMapper.selectAll2();
        System.out.println("获取商品列表：" + products);
    }


    /**
     * 测试语法which  if 等
     *
     * @throws Exception
     */
    @Test
    public void findByCondition() throws Exception {
        List<Product> products = productMapper.findByCondition("test");
        System.out.println("获取商品列表带条件：" + products);
    }


    /**
     * 测试foreach语法
     */
    @Test
    public void findByIds() {
        List<Product> products = productMapper.findByIds(Arrays.asList(1L, 2L, 3L, 4L));
        System.out.println("通过ID列表获取商品：" + products);
    }

    /**
     * 批量插入
     */
    @Test
    public void insertBatch(){
        List<Product> products = new ArrayList<Product>();

        for (int i = 0; i < 2; i++) {
            Product product = new Product();
            product.setCustomerId(1L);
            product.setProductName("测试商品_" + RandomUitls.generateString(5));
            product.setIndate(new Date());

            products.add(product);
        }

        productMapper.insertBatch(products);
    }

    /**
     * 测试set语法
     */
    @Test
    public void updateById() {
        Product product = new Product();
        product.setId(2L);
        product.setCustomerId(1L);
        product.setProductName("test_product_" + RandomUitls.generateString(5));
        product.setIndate(new Date());
        int nRet = productMapper.updateById(product);
        System.out.println("修改商品：" + product);
    }


    /**
     * 测试一对多，测试association语法。一个用户有多个商品
     */
    @Test
    public void findProductAndCustomer(){
        List<ProductDto> products = productMapper.findProductAndCustomer();
        for (ProductDto product: products){
            System.out.println(product.toString());
        }
    }


    /**
     * 测试一对多，测试association语法。一个用户有多个商品
     */
    @Test
    public void findProductAndCustomer1(){
        List<ProductDto> products = productMapper.findProductAndCustomer1();
        for (ProductDto product: products){
            System.out.println(product.toString());
        }
    }
}