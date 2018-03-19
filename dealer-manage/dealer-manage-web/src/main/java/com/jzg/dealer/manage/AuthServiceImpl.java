package com.jzg.dealer.manage;

import com.jzg.dealer.manage.biz.SysUserBiz;
import com.jzg.framework.core.vo.ResultVo;
import com.jzg.framework.web.auth.AuthService;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * @description: 登录权限控制服务
 * @author: JZG
 * @date: 2016/12/1 18:50
 */
@Service("authService")
public class AuthServiceImpl implements AuthService {
    /**
     * 系统用户Biz
     */
    @Resource
    private SysUserBiz sysUserBiz;

    //校验用户是否登录
    @Override
    public boolean isLogin() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        ResultVo loginVo = sysUserBiz.isLogin(request);
        if (loginVo == null) {
            return false;
        }
        return (Boolean) loginVo.getData();
      // return true;
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
       /* HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        ResultVo loginVo = sysUserBiz.isAuth(request);
        if (loginVo == null) {
            return false;
        }
        return (Boolean) loginVo.getData();*/
       return true;
    }

    @Override
    public String getLoginUrl() {
        return "/sysUser/login";
    }

    @Override
    public String getHomeUrl() {
        return null;
    }

    @Override
    public String getNoAuthUrl() {
        return null;
    }

    @Override
    public String getRedirectUrl(String s) {
        String redirectUrl = "";
       /* HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        if (request.getRequestURI().equals(loginUrl)) {
            redirectUrl = homeUrl;
        }else {
            redirectUrl = String.format("%s?backurl=%s", loginUrl, s);
        }*/
        return redirectUrl;
    }

    public boolean isAjax() {
        return false;
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
