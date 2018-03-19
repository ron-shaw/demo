package com.jzg.demo.service.config;

import com.github.pagehelper.PageHelper;

import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;

import java.util.Properties;

/**
 * @description: MybatisConfiguration
 * @author: JZG
 * @date: 2018/3/19 15:56
 * @version:
 */
public class MybatisConfiguration {
    private static final Logger LOGGER = LoggerFactory.getLogger(MybatisConfiguration.class);

    @Bean(name = "sqlSessionFactory")
    public SqlSessionFactory sqlSessionFactoryBean() throws Exception {
        SqlSessionFactoryBean factory = new SqlSessionFactoryBean();
        //factory.setDataSource(dataSource);
        factory.setVfs(SpringBootVFS.class);

        factory.setTypeAliasesPackage("com.jzg.demo.service.model");
        //factory.setTypeAliasesPackage(mybatisProperties.getTypeAliasesPackage());

        //分页插件设置
        PageHelper pageHelper = new PageHelper();

        Properties properties = new Properties();
        properties.setProperty("reasonable", "true");
        //properties.setProperty("reasonable", pageHelperProperties.getReasonable());
        properties.setProperty("supportMethodsArguments", "true");
        //properties.setProperty("supportMethodsArguments", pageHelperProperties.getSupportMethodsArguments());
        properties.setProperty("returnPageInfo", "check");
        //properties.setProperty("returnPageInfo", pageHelperProperties.getReturnPageInfo());
        properties.setProperty("params", "count=countSql");
        //properties.setProperty("returnPageInfo", pageHelperProperties.getParams());
        pageHelper.setProperties(properties);

        //添加分页插件
        factory.setPlugins(new Interceptor[]{pageHelper});

        ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        try {
            //基于注解扫描Mapper，不需配置xml路径
            factory.setMapperLocations(resolver.getResources("classpath:mapper/*.xml"));
            //factory.setMapperLocations(mybatisProperties.resolveMapperLocations());
            return factory.getObject();
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }
}
