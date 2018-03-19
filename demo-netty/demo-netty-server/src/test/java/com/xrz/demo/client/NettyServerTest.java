package com.xrz.demo.client;

import org.junit.Test;

import java.io.InputStreamReader;

/**
 * @description: NettyServerTest
 * @author: JZG
 * @date: 2018/1/31 16:34
 * @version: v1.0.0
 */
public class NettyServerTest {
    @Test
    public void test(){
        Thread thread = new Thread(new NettyServer());
        thread.start();

        /*try {
            Thread.sleep(1000000000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }*/

        InputStreamReader inputStreamReader = new InputStreamReader(System.in);
        System.out.println("等待输入，阻塞线程关闭，输入任意值关闭");
    }
}
