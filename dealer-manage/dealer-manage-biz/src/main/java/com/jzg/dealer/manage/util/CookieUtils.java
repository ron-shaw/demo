package com.jzg.dealer.manage.util;
import com.jzg.framework.utils.encrypt.Md5Encrypt;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by JZG on 2017/3/23.
 */
public class CookieUtils {
    public static int GetLoginUserInfo(HttpServletRequest request) {
        int intUserId = 0;
        //HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        try {
            Cookie cookie = getCookieByName(request, "jingzhengu_Userinfo");
            if (cookie != null && cookie.getValue() != "") {
                String cookieValue = URLDecoder.decode(cookie.getValue(), "UTF-8");
                String[] arrCookieValue = cookieValue.split("\\|");
                String oldAfterMd5 = arrCookieValue[arrCookieValue.length - 1];
                String newBeforeMd5 = "";
                for (int i = 0; i < arrCookieValue.length - 1; i++) {
                    newBeforeMd5 += arrCookieValue[i];
                }
                newBeforeMd5 += "G32$R93@D3*L432%Z2#Q4!3S3&B4";
                byte[] byts = Md5Encrypt.encrypt(newBeforeMd5, "UTF-8");
                String md5After = Md5Encrypt.toHexString(byts).toUpperCase();
                if (md5After.equals(oldAfterMd5)) {
                    intUserId = Integer.parseInt(arrCookieValue[0]);
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return intUserId;
    }

    /**
     * 根据名字获取cookie
     *
     * @param request
     * @param name    cookie名字
     * @return
     */
    public static Cookie getCookieByName(HttpServletRequest request, String name) {
        Map<String, Cookie> cookieMap = ReadCookieMap(request);
        if (cookieMap.containsKey(name)) {
            Cookie cookie = (Cookie) cookieMap.get(name);
            return cookie;
        } else {
            return null;
        }
    }

    /**
     * 将cookie封装到Map里面
     *
     * @param request
     * @return
     */
    private static Map<String, Cookie> ReadCookieMap(HttpServletRequest request) {
        Map<String, Cookie> cookieMap = new HashMap<String, Cookie>();
        Cookie[] cookies = request.getCookies();
        if (null != cookies) {
            for (Cookie cookie : cookies) {
                cookieMap.put(cookie.getName(), cookie);
            }
        }
        return cookieMap;
    }

    //添加cookie
    public static void addCookie(HttpServletResponse response, String name, String value, int maxAge) {

        Cookie cookie = new Cookie(name, value);

        cookie.setPath("/");

        if (maxAge >= 0) cookie.setMaxAge(maxAge);

        response.addCookie(cookie);

    }
}