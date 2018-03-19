package com.jzg.demo.consumer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @description: Create By IDEA
 * @author: JZG
 * @date: 2017/5/10 21:09
 */
@Controller
@RequestMapping("")
public class IndexController {
    /**
     * 首页
     *
     * @return String
     */
    @RequestMapping("")
    public String index() {
        return "index";
    }
}
