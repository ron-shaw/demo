package com.xrz.demo.client;

import org.jboss.netty.channel.*;

/**
 * @description: ClientLogicHandler
 * @author: JZG
 * @date: 2018/1/31 16:26
 * @version: v1.0.0
 */
public class ClientLogicHandler extends SimpleChannelHandler {
    @Override
    public void channelConnected(ChannelHandlerContext ctx, ChannelStateEvent e) throws Exception {
        System.out.println("客户端连接成功!");
        String str = "hi server!";
        //异步
        e.getChannel().write(str);
    }

    @Override
    public void writeComplete(ChannelHandlerContext ctx, WriteCompletionEvent e) throws Exception {
        System.out.println("客户端写消息完成");
    }

    @Override
    public void messageReceived(ChannelHandlerContext ctx, MessageEvent e) throws Exception {
        String msg = (String) e.getMessage();
        System.out.println("客户端接收到消息, msg: " + msg);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, ExceptionEvent e) throws Exception {
        e.getCause().printStackTrace();
        e.getChannel().close();
    }
}
