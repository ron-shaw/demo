package com.jzg.dealer.manage.biz;



/*import com.jzg.advertise.service.api.sysuser.SysLoginLogService;
import com.jzg.advertise.service.api.sysuser.SysUserService;
import com.jzg.advertise.service.model.sysuser.SysLoginLog;
import com.jzg.advertise.service.model.sysuser.SysUser;
import com.jzg.advertise.service.dto.sysuser.SysSelectPageVo;
import com.jzg.advertise.service.dto.sysuser.UpdateSysUserVo;*/

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.jzg.dealer.manage.vo.SysUserVo;
import com.jzg.dealer.manage.util.CookieUtils;
import com.jzg.common.service.api.SysUserService;
import com.jzg.common.service.dto.UserInfoDto;
import com.jzg.framework.cache.redis.RedisCache;
import com.jzg.framework.core.vo.ResultVo;
import com.jzg.framework.core.vo.RetStatus;
import com.jzg.framework.utils.encrypt.Md5Encrypt;
import com.jzg.framework.utils.string.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

/**
 * 系统用户Biz
 * Created by wanglijun on 2017/2/24.
 */
@Component("sysUserBiz")
public class SysUserBiz {
    /**
     * 密码验证正则
     */
    private static final String PASSWORD_REG = "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,8}$";
    /**
     * 用户姓名校验 2-5 个中文
     */
    private static final String USER_NAME = "^[\\u4e00-\\u9fa5]{2,5}$";
    /**
     * 默认密码
     */
    private static final String DEFAULT_PASSWORD = "123456aa";
    /**
     * cookie key
     */
    private static final String COOKIE_LOGIN_KEY = "login_account";
    /**
     * token加密私钥
     */
    private static final String SECRET_KEY = "jzGadMinSyekUd";
    /**
     * redis key
     */
    private static final String REDIS_LOGIN_KEY = "jzgAdminLogin";
    /**
     * 系统用户登录日志
     *//*
    @Resource
    private SysLoginLogService sysLoginLogService;*/
    /**
     * redis缓存时间 半个小时
     */
    private static final int LOGIN_CACHE_TIME = 30 * 60;
    /**
     * 手机正则校验
     */
    private static final String PHONE_REG = "^[1][34578][0-9]{9}$";
    Logger logger = Logger.getLogger(SysUserBiz.class);
    /**
     * 用户服务
     */
    @Resource
    private SysUserService sysUserService;
    /**
     * redis 缓存
     */
    @Resource
    private RedisCache redisCache;

    public ResultVo isLogin(HttpServletRequest request) {
        ResultVo resultVo = new ResultVo();
        try {
            Cookie cookieByName = CookieUtils.getCookieByName(request, COOKIE_LOGIN_KEY);
            if (cookieByName != null && StringUtils.isNotNull(cookieByName.getValue())) {
                String cookieValue = cookieByName.getValue();
                String userObject = redisCache.get(cookieValue);
                UserInfoDto userInfo = JSON.parseObject(userObject, UserInfoDto.class);
                if (userInfo != null) {
                    resultVo.setData(true);
                    resultVo.setStatus(100);
                    resultVo.setMsg("用户已经登录");
                    redisCache.set(cookieValue, LOGIN_CACHE_TIME, userObject);

                } else {
                    resultVo.setData(false);
                    resultVo.setStatus(101);
                    resultVo.setMsg("无此用户");
                }
            } else {
                resultVo.setData(false);
                resultVo.setStatus(102);
                resultVo.setMsg("用户未登录");
            }
            return resultVo;
        } catch (Exception e) {
            logger.error(e.getMessage());
            resultVo.setData(false);
            resultVo.setStatus(500);
            resultVo.setMsg("验证用户名是否登陆异常！");
            return resultVo;
        }

    }

    public ResultVo isAuth(HttpServletRequest request) {
        ResultVo resultVo = new ResultVo();
        resultVo.setData(false);

        try {
            Cookie cookieByName = CookieUtils.getCookieByName(request, COOKIE_LOGIN_KEY);
            String cookieValue = cookieByName.getValue();
            String userObject = redisCache.get(cookieValue);
            UserInfoDto userInfo = JSON.parseObject(userObject, UserInfoDto.class);
            if (userInfo != null) {
                //验证权限
                String reqUrl = request.getServletPath();
                List<String> authurls = userInfo.getAuthUrls();
                if (authurls != null && authurls.size() > 0) {
                    for (String authurl : authurls) {
                        if (reqUrl.startsWith(authurl)) {
                            resultVo.setData(true);
                            break;
                        }
                    }
                }
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            resultVo.setStatus(500);
            resultVo.setMsg("验证用户名是权限异常！");
            return resultVo;
        }
        return resultVo;
    }


    /**
     * 系统用户登录
     *
     * @param sysUserVo
     * @param response
     * @return
     */
    public ResultVo<UserInfoDto> login(SysUserVo sysUserVo, HttpServletResponse response) {
        //根据登录名查询用户信息
        ResultVo<UserInfoDto> resVo = sysUserService.sysUserLogin(sysUserVo.getUserName(), sysUserVo.getPassword(), 24);
        if (RetStatus.Ok.getValue() == resVo.getStatus()) {
            UserInfoDto sysUser = resVo.getData();
            if (sysUser != null) {
                try {
                    //用户信息存cookie
                    String token = sysUser.getLogonid() + SECRET_KEY + new Date().getTime();
                    String md5Token = Md5Encrypt.toHexString(Md5Encrypt.encrypt(token, "utf-8"));
                    CookieUtils.addCookie(response, COOKIE_LOGIN_KEY, md5Token, 24 * 3600);
                    String loginInfo = JSON.toJSONStringWithDateFormat(sysUser, "yyyy-MM-dd HH:mm:ss", SerializerFeature.WriteDateUseDateFormat);
                    redisCache.set(md5Token, LOGIN_CACHE_TIME, loginInfo);
                } catch (Exception e) {
                    logger.error(e.getMessage());
                    resVo.setData(null);
                    resVo.setStatus(RetStatus.Exception.getValue());
                    resVo.setMsg("用户登录异常！");
                    return resVo;
                }
            }
        }
        return resVo;

    }


    /**
     * 验证用户名是否存在
     */
    public ResultVo checkLoginName(String logonid) {
        ResultVo resultVo = new ResultVo();
        //根据登录名查询用户信息
        try {
            resultVo = sysUserService.checkLoginName(logonid);

        } catch (Exception e) {
            logger.error("根据用户名，获取用户发生异常.logincode:" + logonid + "," + e.getMessage(), e);
            resultVo.setStatus(RetStatus.Exception.getValue());
            resultVo.setMsg("内部错误，请联系管理员");
        }
        return resultVo;
    }

    /**
     * 获取用户信息
     *
     * @param request
     * @return
     */
    public ResultVo<UserInfoDto> getUserInfo(HttpServletRequest request) {
        ResultVo resultVo = new ResultVo();
        try {
            Cookie cookieByName = CookieUtils.getCookieByName(request, COOKIE_LOGIN_KEY);
            if (cookieByName != null) {
                String cookieValue = cookieByName.getValue();
                String userObject = redisCache.get(cookieValue);
                UserInfoDto userInfo = JSON.parseObject(userObject, UserInfoDto.class);
                resultVo.setData(userInfo);
                resultVo.setStatus(RetStatus.Ok.getValue());
            }
            return resultVo;
        } catch (Exception e) {
            e.printStackTrace();
            resultVo.setData(false);
            resultVo.setStatus(500);
            resultVo.setMsg("获取用户信息异常！");
            return resultVo;
        }

    }


    /**
     * 用户退出
     *
     * @return 退出结果
     */
    public ResultVo logOut(HttpServletRequest request, HttpServletResponse response) {
        ResultVo resultVo = new ResultVo();
        try {
            Cookie cookieByName = CookieUtils.getCookieByName(request, COOKIE_LOGIN_KEY);
            if (cookieByName != null && cookieByName.getValue() != "") {
                String cookieValue = cookieByName.getValue();
                redisCache.delete(cookieValue);
                CookieUtils.addCookie(response, COOKIE_LOGIN_KEY, "", 0);
                resultVo.setData(true);
                resultVo.setStatus(RetStatus.Ok.getValue());
                resultVo.setMsg("退出登陆成功！");
            } else {
                resultVo.setData(true);
                resultVo.setStatus(RetStatus.Ok.getValue());
                resultVo.setMsg("退出登陆成功！");
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            resultVo.setData(true);
            resultVo.setStatus(500);
            resultVo.setMsg("退出登录异常！");
        }
        return resultVo;
    }


}
