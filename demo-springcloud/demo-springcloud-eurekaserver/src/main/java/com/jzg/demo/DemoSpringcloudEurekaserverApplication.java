package com.jzg.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableEurekaServer
@SpringBootApplication
public class DemoSpringcloudEurekaserverApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoSpringcloudEurekaserverApplication.class, args);
	}
}
