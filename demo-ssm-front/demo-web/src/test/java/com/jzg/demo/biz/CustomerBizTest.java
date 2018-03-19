package com.jzg.demo.biz;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageInfo;
import com.jzg.demo.dto.CustomerQueryPageDto;
import com.jzg.demo.model.Customer;
import com.jzg.framework.core.vo.ResultPageVo;
import com.jzg.framework.core.vo.RetStatus;
import com.jzg.framework.utils.RandomUitls;
import org.junit.Before;
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
 * @description: Create By IDEA
 * @author: JZG
 * @date: 2017/12/11 11:13
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath*:/spring/spring-context.xml")
public class CustomerBizTest {

    @Resource
    private CustomerBiz customerBiz;

    @Before
    public void setUp() throws Exception {
        /*ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext(new String[]{"spring/spring-context.xml"});
        applicationContext.start();*/
    }

    @Test
    public void createCustomer() throws Exception {
        Customer customer = getNewCustomer();
        boolean bRet = customerBiz.createCustomer(customer);
        System.out.println("bRet:" + bRet);

        System.out.println("******************创建新客户*********************");
        System.out.println(customer.toString());
    }

    @Test
    public void createBatchCustomer() throws Exception {
        List<Customer> customerList = new ArrayList<Customer>();
        customerList.add(getNewCustomer());
        customerList.add(getNewCustomer());
        customerList.add(getNewCustomer());
        customerList.add(getNewCustomer());
        customerList.add(getNewCustomer());

        boolean bRet = customerBiz.createBatchCustomer(customerList);

        System.out.println("******************批量创建客户*********************");
        System.out.println("批量创建用户：" + bRet);
    }

    @Test
    public void updateCustomer() throws Exception {
        Customer customer = getNewCustomer();
        customer.setId(25L);
        customerBiz.updateCustomer(customer);
    }

    @Test
    public void getCustomerById() throws Exception {
        Long customerId = 25L;
        Customer customer = customerBiz.getCustomerById(customerId);

        System.out.println("******************通过ID获取客户信息*********************");
        System.out.println(customer.toString());
    }

    @Test
    public void findCustomerListByIds() throws Exception {
        List<Long> customerIds = Arrays.<Long>asList(1L, 2L, 3L, 4L, 5L);
        List<Customer> customers = customerBiz.findCustomerListByIds(customerIds);

        System.out.println("******************通过ID列表获取客户信息*********************");
        System.out.println(customers.toString());
    }

    @Test
    public void findPageList() throws Exception {
        ResultPageVo<Customer> resultPageVo = new ResultPageVo<Customer>();
        CustomerQueryPageDto customerQueryPageDto = new CustomerQueryPageDto();
        PageInfo<Customer> pageInfo = customerBiz.findPageList(customerQueryPageDto);

        resultPageVo.setPageNo(pageInfo.getPageNum());
        resultPageVo.setPageCount((int) pageInfo.getTotal());
        resultPageVo.setPageSize(pageInfo.getPageSize());
        resultPageVo.setList(pageInfo.getList());
        resultPageVo.setStatus(RetStatus.Ok.getValue());

        System.out.println("******************分页获取客户信息*********************");
        System.out.println(JSON.toJSONString(resultPageVo));
    }

    @Test
    public void insertCustomer1() throws Exception {
        Customer customer = getNewCustomer();
        Integer nRet = customerBiz.insertCustomer1(customer);
        System.out.println("******************创建新客户*********************");
        System.out.println("nRet:" + nRet);
        System.out.println(customer.toString());
    }

    @Test
    public void findCustomerByAge1() throws Exception {
        Integer age = 1;
        List<Customer> customers = customerBiz.findCustomerByAge1(1);
        System.out.println("******************批量获取客户列表*********************");
        System.out.println(customers.toString());
    }

    @Test
    public void getCustomerById1() throws Exception {
        Long customerId = 25L;
        Customer customer = customerBiz.getCustomerById1(customerId);
        System.out.println("******************通过ID获取客户信息*********************");
        System.out.println(customer.toString());
    }




    private Customer getNewCustomer(){
        Customer customer = new Customer();
        customer.setIndate(new Date());
        customer.setLoginName("test_" + RandomUitls.generateInteger(10));
        customer.setAge(Integer.parseInt(RandomUitls .generateInteger(2)));
        return customer;
    }
}