package com.jzg.demo.consumer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.jzg.demo.consumer"})
public class DemoConsumeApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoConsumeApplication.class, args);
	}
}
