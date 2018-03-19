package com.jzg.demo;

/**
 * Hello world!
 */
public class App {
    public static void main(String[] args) {
        String str = "abc";
        String str0 = "abc";
        String str1 = new String("abc");
        String str3 = new String("def");
        String str4 = "def";

        System.out.println("str:" + str + "   str.intern():" + str.intern());
        System.out.println("str1:" + str1 + "   str1.intern():" + str1.intern());
        System.out.println("str==str0:" + (str == str0));
        System.out.println("str==str1:" + (str == str1));
        System.out.println("str==str1.intern():" + (str == str1.intern()));

        System.out.println("str4==str3:" + (str4 == str3));
        System.out.println("str4==str3.intern():" + (str4 == str3.intern()));

        //1.7的执行结果： 1.8相同
        /*str:abc   str.intern():abc
        str1:abc   str1.intern():abc
        str==str0:true
        str==str1:false
        str==str1.intern():true*/
    }
}
