package com.jzg.demo.service.biz;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jzg.demo.service.dao.CustomerMapper;
import com.jzg.demo.service.dto.query.CustomerQueryPageDto;
import com.jzg.demo.service.model.Customer;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import tk.mybatis.mapper.entity.Example;

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

    /*@Resource
    private SqlSessionFactory sqlSessionFactory;*/

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
        String strIds = StringUtils.arrayToDelimitedString(ids.toArray(), ",");
        List<Customer> customers = customerMapper.selectByIds(strIds);
        return customers;
    }

    /**
     * 分页获取客户列表
     *
     * @param queryPageVo queryPageVo
     * @return PageInfo
     */
    public PageInfo<Customer> findPageList(CustomerQueryPageDto queryPageVo) {

        Example example = new Example(Customer.class);
        example.createCriteria().andGreaterThan("id", queryPageVo.getLimitId());
        example.setOrderByClause("id");

        PageHelper.startPage(queryPageVo.getPageNo(), queryPageVo.getPageSize());
        List<Customer> list = customerMapper.selectByExample(example);
        PageInfo<Customer> pageInfo = new PageInfo(list);

        return pageInfo;
    }


    /*public void getCustomerInfo(){
        SqlSession sqlSession = sqlSessionFactory.openSession();
        try{

        }
        finally {
            sqlSession.close();
        }
    }*/

}
