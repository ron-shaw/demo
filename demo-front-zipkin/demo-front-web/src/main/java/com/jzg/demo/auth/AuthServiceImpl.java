package com.jzg.demo.auth;

import com.jzg.framework.web.auth.AuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @description: 登录权限控制服务
 * @author: JZG
 * @date: 2016/12/1 18:50
 */
@Service("authService")
public class AuthServiceImpl implements AuthService {
    /**
     * homeUrl地址
     */
    @Value("${home.url}")
    private String homeUrl;

    /**
     * 登录URL地址
     */
    @Value("${login.url}")
    private String loginUrl;

    /**
     * 用户是否已登录
     *
     * @return
     */
    @Override
    public boolean isLogin() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();

        //int nRet = CookieUtils.GetLoginUserInfo(request);
        //return nRet > 0;

        return true;
    }

    @Override
    public boolean login() {
        return true;
    }

    @Override
    public boolean logout() {
        return false;
    }

    @Override
    public boolean isAuth() {
        return true;
    }

    @Override
    public String getLoginUrl() {
        return loginUrl;
    }

    @Override
    public String getHomeUrl() {
        return homeUrl;
    }

    @Override
    public String getNoAuthUrl() {
        return null;
    }

    @Override
    public String getRedirectUrl(String s) {
        String redirectUrl = "";
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getRequestURI().equals(loginUrl)) {
            redirectUrl = homeUrl;
        } else {
            redirectUrl = String.format("%s?backurl=%s", loginUrl, s);
        }
        return redirectUrl;
    }

    @Override
    public boolean isAjax() {
        return true;
    }

    @Override
    public boolean isApi() {
        return false;
    }

    @Override
    public boolean isSign() {
        return false;
    }
}
