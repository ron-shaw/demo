package com.jzg.dealer.manage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by JZG on 2017/3/22.
 */
@Controller
@RequestMapping(value = {""})
public class IndexController {

    @RequestMapping(value = {"index_v1"})
    public String index1() {
        return "default/index";
    }
}
