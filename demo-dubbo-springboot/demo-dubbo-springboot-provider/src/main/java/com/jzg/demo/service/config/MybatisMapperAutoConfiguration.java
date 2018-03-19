package com.jzg.demo.service.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Properties;

import tk.mybatis.mapper.mapperhelper.MapperHelper;
import tk.mybatis.spring.mapper.MapperScannerConfigurer;

/**
 * @description: MyBatisMapperScannerConfig
 * @author: JZG
 * @date: 2018/3/19 11:08
 * @version:
 */
@Configuration
//@EnableConfigurationProperties({MybatisProperties.class, PageHelperProperties.class})
@AutoConfigureAfter(MybatisConfiguration.class)
public class MybatisMapperAutoConfiguration {
    private static final Logger LOGGER = LoggerFactory.getLogger(MybatisMapperAutoConfiguration.class);


    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer() {
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
        mapperScannerConfigurer.setSqlSessionFactoryBeanName("sqlSessionFactory");
        mapperScannerConfigurer.setBasePackage("com.jzg.demo.service.dao");
        //mapperScannerConfigurer.setBasePackage(mybatisProperties.getBasePackage());

        //初始化扫描器的相关配置，这里我们要创建一个Mapper的父类
        Properties properties = new Properties();
        MapperHelper mapperHelper = mapperScannerConfigurer.getMapperHelper();
        /*if (mybatisProperties.getMappers() != null && mybatisProperties.getMappers().size() > 0) {
            for (Class mapperClass : mybatisProperties.getMappers()) {
                //registerMapper(mapperClass);
                mapperHelper.registerMapper(mapperClass);
            }
        }*/
        properties.setProperty("mappers", "com.jzg.framework.dao.MysqlBaseDao");
        properties.setProperty("notEmpty", "false");
        properties.setProperty("IDENTITY", "MYSQL");

        mapperScannerConfigurer.setProperties(properties);

        return mapperScannerConfigurer;
    }
}
