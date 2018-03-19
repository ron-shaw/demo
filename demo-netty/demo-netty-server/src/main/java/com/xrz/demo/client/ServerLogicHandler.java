package com.xrz.demo.client;

import org.jboss.netty.channel.*;

/**
 * @description: ServerLogicHandler
 * @author: JZG
 * @date: 2018/1/31 16:21
 * @version: v1.0.0
 */
public class ServerLogicHandler extends SimpleChannelHandler {
    @Override
    public void channelConnected(ChannelHandlerContext ctx, ChannelStateEvent e) throws Exception {
        System.out.println("连接成功, channel: " + e.getChannel().toString());
    }

    @Override
    public void messageReceived(ChannelHandlerContext ctx, MessageEvent e) throws Exception {
        String msg = (String) e.getMessage();
        System.out.println("接收到了client的消息, msg: " + msg);

        Channel channel = e.getChannel();
        String str = "hi, client";

        //写消息发给client端
        channel.write(str);
        System.out.println("服务端发送数据: " + str + "完成");
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, ExceptionEvent e) throws Exception {
        e.getCause().printStackTrace();
        e.getChannel().close();
    }
}
