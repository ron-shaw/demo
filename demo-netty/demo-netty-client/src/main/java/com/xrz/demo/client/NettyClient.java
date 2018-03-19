package com.xrz.demo.client;

import com.xrz.demo.common.Constants;
import org.jboss.netty.bootstrap.ClientBootstrap;
import org.jboss.netty.channel.ChannelPipeline;
import org.jboss.netty.channel.ChannelPipelineFactory;
import org.jboss.netty.channel.Channels;
import org.jboss.netty.channel.socket.ClientSocketChannelFactory;
import org.jboss.netty.channel.socket.nio.NioClientSocketChannelFactory;
import org.jboss.netty.handler.codec.frame.LineBasedFrameDecoder;
import org.jboss.netty.handler.codec.string.StringDecoder;
import org.jboss.netty.handler.codec.string.StringEncoder;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.util.Scanner;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @description: NettyClient
 * @author: JZG
 * @date: 2018/1/31 15:58
 * @version: v1.0.0
 */
public class NettyClient implements Runnable {
    /**
     * When an object implementing interface <code>Runnable</code> is used
     * to create a thread, starting the thread causes the object's
     * <code>run</code> method to be called in that separately executing
     * thread.
     * <p>
     * The general contract of the method <code>run</code> is that it may
     * take any action whatsoever.
     *
     * @see Thread#run()
     */
    @Override
    public void run() {
        ExecutorService bossExecutor = Executors.newFixedThreadPool(1);
        ExecutorService workerExecutor = Executors.newFixedThreadPool(10);

        ClientSocketChannelFactory clientSocketChannelFactory = new NioClientSocketChannelFactory(bossExecutor, workerExecutor);

        ClientBootstrap clientBootstrap = new ClientBootstrap(clientSocketChannelFactory);
        clientBootstrap.setPipelineFactory(new ChannelPipelineFactory() {
            public ChannelPipeline getPipeline() throws Exception {
                ChannelPipeline channelPipeline = Channels.pipeline();
                //可以添加多个同名解码器
                channelPipeline.addLast("frameDecoder", new LineBasedFrameDecoder(1024));
                channelPipeline.addLast("decoder", new StringDecoder());
                channelPipeline.addLast("encoder", new StringEncoder());
                channelPipeline.addLast("handler", new ClientLogicHandler());
                return channelPipeline;
            }
        });

        InetSocketAddress inetSocketAddress = new InetSocketAddress(Constants.HOST, Constants.PORT);
        clientBootstrap.connect(inetSocketAddress);
        System.out.println("client start success!");
    }


    public static void main(String[] args) {
        try {
            Scanner sc = new Scanner(System.in);
            System.out.println("输入第一个字符:");
            System.out.println("输入字符串：" + sc.next());


            BufferedReader strin = new BufferedReader(new InputStreamReader(System.in));
            System.out.print("请输入一个字符串：");
            String str = strin.readLine();
            System.out.println("第一个：" + str);
        } catch (IOException e) {
            e.printStackTrace();
        }


    }
}
