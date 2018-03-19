package com.jzg.dealer.manage.controller;

import org.springframework.web.bind.annotation.ModelAttribute;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by JZG on 2017/3/22.
 */
public class BaseController {
    /**
     * 请求
     */
    protected HttpServletRequest request;

    /**
     * 响应
     */
    protected HttpServletResponse response;

    /**
     * 请求与响应
     * @param request Http请求
     * @param response Http响应
     */
    @ModelAttribute
    protected void setReqAndResp(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;
        this.response = response;
    }
}
