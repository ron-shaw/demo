package com.jzg.dealer.manage.vo;

/**
 * Created by wanglijun on 2017/3/11.
 */
public class SysUserVo {
    /**
     * 登录名
     */
    private String userName;
    /**
     * 密码
     */
    private String password;
    /**
     * 验证码
     */
    private String verCode;
    /**
     * 用户类型
     */
    private Long type;

    /**
     * 登录令牌
     */
    private String token;

    /**
     * 获取用户登录名
     * @return 用户登录名
     */
    public String getUserName() {
        return userName;
    }

    /**
     * 设置用户登录名
     * @param userName 用户登录名
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * 获取用户登录密码
     * @return 用户登录密码
     */
    public String getPassword() {
        return password;
    }

    /**
     * 设置用户登录密码
     * @param password 用户登录密码
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * 获取验证码
     * @return 验证码
     */
    public String getVerCode() {
        return verCode;
    }

    /**
     * 设置验证码
     * @param verCode 验证码
     */
    public void setVerCode(String verCode) {
        this.verCode = verCode;
    }

    /**
     * 获取用户类型
     * @return 用户登录类型
     */
    public Long getType() {
        return type;
    }

    /**
     * 设置用户登录类型
     * @param type 用户登录类型
     */
    public void setType(Long type) {
        this.type = type;
    }

    /**
     * 获取登录令牌
     * @return 登录令牌
     */
    public String getToken() {
        return token;
    }

    /**
     * 设置登录令牌
     * @param token 登录令牌
     */
    public void setToken(String token) {
        this.token = token;
    }
}
