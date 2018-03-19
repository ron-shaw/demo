package com.jzg.demo.springboot.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @description: IndexController
 * @author: JZG
 * @date: 2018/3/8 10:02
 * @version:
 */
@RestController
public class IndexController {



    @RequestMapping(value = "/", produces = "text/plain;charset=UTF-8")
    public String index(){
        return "Hello Spring Boot!";
    }

}
