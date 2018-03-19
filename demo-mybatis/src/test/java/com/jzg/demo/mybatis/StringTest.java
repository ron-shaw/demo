package com.jzg.demo.mybatis;

import org.junit.Test;

/**
 * @description: StringTest
 * @author: JZG
 * @date: 2018/1/23 15:04
 * @version: v1.0.0
 */
public class StringTest {

    @Test
    public void test(){
        String str = "abc";
        String str0 = "abc";
        String str1 = new String("abc");
        System.out.println("str:" + str + "   str.intern():" + str.intern());
        System.out.println("str1:" + str1 + "   str1.intern():" + str1.intern());
        System.out.println("str==str0:" + str == str0);
        System.out.println("str==str1:" + str == str1);
        System.out.println("str==str1.intern():" + str == str1.intern());
    }
}
