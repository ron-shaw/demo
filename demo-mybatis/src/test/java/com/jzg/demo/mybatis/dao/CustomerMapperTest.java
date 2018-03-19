package com.jzg.demo.mybatis.dao;

import com.jzg.demo.mybatis.dto.CustomerDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.util.List;

/**
 * @description: CustomerMapperTest
 * @author: JZG
 * @date: 2018/1/19 19:08
 * @version: v1.0.0
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class CustomerMapperTest {

    @Resource
    CustomerMapper customerMapper;

    @Test
    public void findList() throws Exception {
        List<CustomerDto> customerDtos = customerMapper.findCustomerAndProductList();


        System.out.println("*************************************************");
        //for (CustomerDto customerDto : customerDtos) {
        //    System.out.println(customerDto.toString());
        //    for (Product product : customerDto.getProductList()) {
        //        System.out.println(product);
        //    }
        //}
        System.out.println(customerDtos.toString());
        System.out.println("*************************************************");
    }

}