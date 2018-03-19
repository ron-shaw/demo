package com.jzg.demo.mybatis.service;

import com.jzg.demo.mybatis.model.Product;
import com.jzg.framework.core.vo.ResultPageVo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

/**
 * @description: ProductServiceImplTest
 * @author: JZG
 * @date: 2018/1/22 17:01
 * @version: v1.0.0
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext-pager.xml")
public class ProductServiceImplTest {
    @Resource
    private ProductService productService;

    @Test
    public void findProductByPage() throws Exception {
        ResultPageVo<Product> resultPageVo = productService.findProductByPage(1, 10);

        System.out.println("总页数：" + resultPageVo.getPageCount());
        for (Product product : resultPageVo.getList()) {
            System.out.println(product);
        }
    }


    @Test
    public void findProductByPage1() throws Exception {
        ResultPageVo<Product> resultPageVo = productService.findProductByPage1(1, 10);

        System.out.println("总页数：" + resultPageVo.getPageCount());
        for (Product product : resultPageVo.getList()) {
            System.out.println(product);
        }
    }
}