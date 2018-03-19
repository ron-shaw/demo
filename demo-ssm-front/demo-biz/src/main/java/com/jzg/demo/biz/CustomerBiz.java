package com.jzg.demo.biz;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jzg.demo.dao.CustomerMapper;
import com.jzg.demo.dto.CustomerQueryPageDto;
import com.jzg.demo.model.Customer;
import org.springframework.stereotype.Component;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by JZG on 2016/11/16.
 */
@Component("customerBiz")
public class CustomerBiz {
    /**
     * CustomerMapper
     */
    @Resource
    private CustomerMapper customerMapper;

    /**
     * 创建客户
     *
     * @param customer customer
     * @return boolean
     */
    public boolean createCustomer(Customer customer) {
        int nRet = customerMapper.insert(customer);
        return nRet > 0;
    }

    /**
     * 批量创建客户
     *
     * @param customers customers
     * @return boolean
     */
    public boolean createBatchCustomer(List<Customer> customers) {
        int nRet = customerMapper.insertList(customers);
        return nRet > 0;
    }

    /**
     * 通过用户ID更新用户信息
     *
     * @param customer customer
     * @return boolean
     */
    public boolean updateCustomer(Customer customer) {
        int nRet = customerMapper.updateByPrimaryKeySelective(customer);
        return nRet > 0;
    }

    /**
     * 通用用户ID获取用户信息
     *
     * @param id id
     * @return Customer
     */
    public Customer getCustomerById(long id) {
        Customer customer = customerMapper.selectByPrimaryKey(id);
        return customer;
    }


    /**
     * 通过ID List批量获取客户信息
     *
     * @param ids ids
     * @return List
     */
    public List<Customer> findCustomerListByIds(List<Long> ids) {
        if (ids.size() <= 0) {
            return new ArrayList<Customer>();
        }

        //方法一：
        /*String strIds = StringUtils.arrayToDelimitedString(ids.toArray(), ",");
        List<Customer> customers = customerMapper.selectByIds(strIds);*/


        //方法二：
        Example example = new Example(Customer.class);
        example.createCriteria().andIn("id", ids);
        List<Customer> customers = customerMapper.selectByExample(example);

        return customers;
    }

    /**
     * 分页获取客户列表
     *
     * @param queryPageDto queryPageDto
     * @return PageInfo
     */
    public PageInfo<Customer> findPageList(CustomerQueryPageDto queryPageDto) {

        Example example = new Example(Customer.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andGreaterThan("id", queryPageDto.getLimitId());
        //criteria.andBetween("indate", queryPageDto.getStartTime(), queryPageDto.getEndTime());
        example.setOrderByClause("id desc");

        PageHelper.startPage(queryPageDto.getPageNo(), queryPageDto.getPageSize());
        List<Customer> list = customerMapper.selectByExample(example);
        PageInfo<Customer> pageInfo = new PageInfo(list);

        return pageInfo;
    }


    /**
     * 创建客户1
     *
     * @param customer 客户信息
     * @return Id
     */
    public Integer insertCustomer1(Customer customer) {
        return customerMapper.insertCustomer1(customer);
    }

    /**
     * 通过年龄获取客户列表
     *
     * @param age 年龄
     * @return 客户列表
     */
    public List<Customer> findCustomerByAge1(Integer age) {
        return customerMapper.findCustomerByAge1(age);
    }

    /**
     * 通过ID获取客户信息
     *
     * @param id 客户ID
     * @return 客户信息
     */
    public Customer getCustomerById1(Long id) {
        return customerMapper.getCustomerById1(id);
    }

}
