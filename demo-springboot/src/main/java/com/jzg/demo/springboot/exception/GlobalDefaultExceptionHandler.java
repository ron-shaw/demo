package com.jzg.demo.springboot.exception;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;

/**
 * @description: GlobalDefaultExceptionHandler <p> 全局异常处理 </p>
 * @author: JZG
 * @date: 2018/3/8 10:21
 * @version:
 */
@ControllerAdvice
public class GlobalDefaultExceptionHandler {
    public static final String DEFAULT_ERROR_VIEW = "500";
    public static final String DEFAULT_NOT_FOUND_VIEW = "404";

    @ExceptionHandler({Exception.class})
    public ModelAndView formatErrorHandler(HttpServletRequest req, Exception e) throws Exception {
        ModelAndView mav = new ModelAndView();

        mav.addObject("exception", e);
        mav.addObject("url", req.getRequestURI());
        mav.addObject("timestamp", (new Date()).toString());
        if (e instanceof org.springframework.web.servlet.NoHandlerFoundException) {
            mav.addObject("error", "页面不存在");
            mav.setViewName(DEFAULT_NOT_FOUND_VIEW);
        } else {
            mav.addObject("error", "内部错误");
            mav.setViewName(DEFAULT_ERROR_VIEW);
        }
        return mav;
    }
}
