package com.jzg.demo.springmvc;

import com.alibaba.fastjson.JSON;
import com.jzg.demo.springmvc.dao.CustomerMapper;
import com.jzg.demo.springmvc.model.Customer;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;

/**
 * @description: UserDaoTest
 * @author: JZG
 * @date: 2018/1/17 16:01
 * @version: v1.0.0
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath*:applicationContext.xml")
public class UserDaoTest {
    @Resource
    private SqlSessionFactory sqlSessionFactory;

    @Test
    public void test(){
        SqlSession sqlSession = sqlSessionFactory.openSession();
        CustomerMapper customerMapper = sqlSession.getMapper(CustomerMapper.class);
        List<Customer> customerList = customerMapper.selectAll();

        System.out.println(JSON.toJSONString(customerList));
        sqlSession.close();
    }



    @Test
    public void test1(){
        List<String> list = Arrays.asList("beijing", "shanghai", "guangzhou");
        System.out.println(list.toString());
    }

}
