package com.jzg.demo.springboot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @description: IndexController
 * @author: JZG
 * @date: 2018/3/8 10:02
 * @version:
 */
@Controller
public class IndexController {


    @ResponseBody
    @RequestMapping(value = "/", produces = "text/plain;charset=UTF-8")
    public String index(){
        return "Hello Spring Boot!";
    }


    /*@RequestMapping(value = "404")
    public String notFound(){
        return "404";
    }

    @RequestMapping(value = "500")
    public String error(){
        return "500";
    }*/
}
