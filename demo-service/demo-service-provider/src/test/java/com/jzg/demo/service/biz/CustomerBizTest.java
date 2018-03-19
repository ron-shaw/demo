package com.jzg.demo.service.biz;

import com.github.pagehelper.PageInfo;
import com.jzg.demo.service.dto.query.CustomerQueryPageDto;
import com.jzg.demo.service.model.Customer;
import org.apache.commons.lang.math.RandomUtils;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by JZG on 2016/11/16.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath*:/spring/spring-context.xml")
public class CustomerBizTest {
    @Resource
    private CustomerBiz customerBiz;

    @Test
    public void createCustomer() throws Exception {
        try {
            Customer customer = new Customer();
            customer.setAge(1);
            customer.setLoginName("test" + RandomUtils.nextInt(100000000));
            customer.setIndate(new Date());
            boolean bRet = customerBiz.createCustomer(customer);
            Assert.assertEquals(true, bRet);

            System.out.println("insert result:" + bRet + "    " + customer.toString());
            System.out.println("*************************************************************************");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @Test
    public void createBatchCustomer() throws Exception {
        try {
            List<Customer> customers = new ArrayList<Customer>();
            Customer customer = new Customer();
            customer.setAge(1);
            customer.setLoginName("test" + RandomUtils.nextInt(100000000));
            customer.setIndate(new Date());
            customers.add(customer);

            Customer customer1 = new Customer();
            customer1.setAge(1);
            customer1.setLoginName("test" + RandomUtils.nextInt(100000000));
            customer1.setIndate(new Date());
            customers.add(customer1);

            boolean bRet = customerBiz.createBatchCustomer(customers);
            Assert.assertEquals(true, bRet);

            System.out.println("insert result:" + bRet + "    " + customer.toString());
            System.out.println("*************************************************************************");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void updateCustomer() throws Exception {
        Customer customer = new Customer();
        customer.setId(1L);
        customer.setAge(19);
        customer.setLoginName("test" + RandomUtils.nextInt(100000000));
        boolean bRet =  customerBiz.updateCustomer(customer);
        Assert.assertEquals(true, bRet);

        System.out.println("result:" + bRet);
        System.out.println("*************************************************************************");
    }

    @Test
    public void getCustomerById() throws Exception {
        Customer customer = customerBiz.getCustomerById(1L);
        System.out.println("getCustomerById result:" + customer.getLoginName().toString());
        System.out.println("*************************************************************************");
    }

    @Test
    public void findCustomerListByIds() throws Exception {
        List<Long> ids = new ArrayList<Long>();
        ids.add(1L);
        ids.add(4L);
        ids.add(7L);
        ids.add(10L);
        List<Customer> customers = customerBiz.findCustomerListByIds(ids);
        System.out.println("getCustomerById result:" + customers.toString());
        System.out.println("*************************************************************************");
    }

    @Test
    public void findPageList() throws Exception {
        try {
            int pageSize = 10;
            int pageNo = 1;
            CustomerQueryPageDto customerQueryPageVo = new CustomerQueryPageDto();
            customerQueryPageVo.setLimitId(2);

            PageInfo<Customer> pageInfo = customerBiz.findPageList(customerQueryPageVo);

            System.out.println(pageInfo.toString());
            System.out.println("*************************************************************************");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}