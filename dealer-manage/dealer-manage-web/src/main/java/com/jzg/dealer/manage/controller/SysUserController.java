package com.jzg.dealer.manage.controller;


import com.jzg.common.service.dto.UserInfoDto;
import com.jzg.dealer.manage.biz.SysUserBiz;
import com.jzg.dealer.manage.vo.SysUserVo;
import com.jzg.framework.core.vo.ResultVo;
import com.jzg.framework.core.vo.RetStatus;
import com.jzg.framework.exception.ExceptionHandling;
import com.jzg.framework.utils.string.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;

/**
 * 系统用户Controller
 * Created by JZG on 2017/3/22.
 */
@Controller
@RequestMapping(value = "/sysUser")
public class SysUserController extends BaseController {
    private static final Logger logger = Logger.getLogger(SysUserController.class);

    @Resource
    private SysUserBiz sysUserBiz;

    /**
     * 登录首页
     */
    @RequestMapping("/login")
    public ModelAndView loginPage(String backurl) throws Exception {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("backurl", StringUtils.isNotNull(backurl) ? backurl : "");
        modelAndView.setViewName("/login");
        return modelAndView;
    }

    /**
     * 用户名是否存在checkLoginName
     */
    @ResponseBody
    @ExceptionHandling
    @RequestMapping(value = "/checkLoginName", method = RequestMethod.POST)
    public ResultVo checkLoginName(String logincode) {
        return sysUserBiz.checkLoginName(logincode);
    }


    /**
     * 系统用户登录
     *
     * @param sysUserVo 用户登录信息
     * @return 登录结果
     */

    @ResponseBody
    @ExceptionHandling
    @RequestMapping(value = "/loginJZG", method = RequestMethod.POST)
    public ResultVo login(SysUserVo sysUserVo) {
        return sysUserBiz.login(sysUserVo, super.response);
    }

    /**
     * @return
     * @throws Exception
     */
    @ExceptionHandling
    @RequestMapping(value = "/index")
    public ModelAndView loginIn() throws Exception {
        ModelAndView modelAndView = new ModelAndView();

        ResultVo<UserInfoDto> resultVo = sysUserBiz.getUserInfo(super.request);
        if (resultVo != null && resultVo.getStatus() == RetStatus.Ok.getValue()) {
            UserInfoDto userInfoDto = resultVo.getData();
            modelAndView.addObject("menus", userInfoDto.getMenuDtos());
            modelAndView.addObject("username", userInfoDto.getName());
            modelAndView.addObject("userInfo", userInfoDto);
        }
        modelAndView.setViewName("index");
        return modelAndView;
    }


    @ResponseBody
    @ExceptionHandling
    @RequestMapping(value = "/getUserInfo", method = RequestMethod.POST)
    public ResultVo<UserInfoDto> getUserInfo() {
        ResultVo<UserInfoDto> userInfo = sysUserBiz.getUserInfo(super.request);
        return userInfo;
    }

    /**
     * 用户退出
     *
     * @return 退出结果
     */
    @ResponseBody
    @ExceptionHandling
    @RequestMapping(value = "logout")
    public ResultVo logOut() {
        return sysUserBiz.logOut(super.request, super.response);
    }


    @RequestMapping("/menuList")
    public ModelAndView getMenuList() {
        ModelAndView modelAndView = new ModelAndView();
        ResultVo<UserInfoDto> resultVo = sysUserBiz.getUserInfo(super.request);
        if (resultVo != null && resultVo.getStatus() == RetStatus.Ok.getValue()) {
            UserInfoDto userInfoDto = resultVo.getData();
            modelAndView.addObject("menus", userInfoDto.getMenuDtos());
            modelAndView.addObject("username", userInfoDto.getName());

        }
        modelAndView.setViewName("/home/menuList");
        return modelAndView;
    }


}
