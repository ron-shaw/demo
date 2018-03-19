package com.jzg.demo.biz;

import com.jzg.demo.service.api.CustomerService;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

/**
 * Created by xrongzhen on 2015/12/13.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath*:spring/spring-context.xml")
public class CustomerServiceTest {
    private static Logger logger = LoggerFactory.getLogger("DemoTest");

    @Resource
    private CustomerService customerService;



}
