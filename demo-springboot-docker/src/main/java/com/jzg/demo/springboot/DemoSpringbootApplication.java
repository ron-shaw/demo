package com.jzg.demo.springboot;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * SpringBoot启动类
 * <p>
 *     @ComponentScan 可以不配置，默认扫描当前类所在的包，因此建议放在顶级包下
 *     @MapperScan Mybatis的扫描包
 * </p>
 */
@SpringBootApplication
@ComponentScan(basePackages = "com.jzg.demo.springboot")
@MapperScan("com.jzg.demo.springboot.dao")
public class DemoSpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoSpringbootApplication.class, args);
	}
}
