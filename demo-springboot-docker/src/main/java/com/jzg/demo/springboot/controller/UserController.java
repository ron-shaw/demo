package com.jzg.demo.springboot.controller;

import com.jzg.demo.springboot.settings.UserSettings;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @description: IndexController
 * @author: JZG
 * @date: 2018/3/8 10:02
 * @version:
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    UserSettings userSettings;

    @RequestMapping(value = "/index")
    public String index(){
        return userSettings.toString();
    }
}
