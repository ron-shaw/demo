package com.jzg.demo.test1.controller;

import com.jzg.demo.test1.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @description: UserController
 * @author: JZG
 * @date: 2018/1/18 13:50
 * @version: v1.0.0
 */
@Controller
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/")
    public String index(){
        return "index";
    }


    @ResponseBody
    @RequestMapping("add")
    public User addUser(User user){
        return user;
    }
}
