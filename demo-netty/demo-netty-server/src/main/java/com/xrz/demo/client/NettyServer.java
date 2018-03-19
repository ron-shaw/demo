package com.xrz.demo.client;

import com.xrz.demo.common.Constants;
import org.jboss.netty.bootstrap.ServerBootstrap;
import org.jboss.netty.channel.ChannelFactory;
import org.jboss.netty.channel.ChannelPipeline;
import org.jboss.netty.channel.ChannelPipelineFactory;
import org.jboss.netty.channel.Channels;
import org.jboss.netty.channel.socket.nio.NioServerSocketChannelFactory;
import org.jboss.netty.handler.codec.frame.LengthFieldBasedFrameDecoder;
import org.jboss.netty.handler.codec.frame.LengthFieldPrepender;
import org.jboss.netty.handler.codec.frame.LineBasedFrameDecoder;
import org.jboss.netty.handler.codec.string.StringDecoder;
import org.jboss.netty.handler.codec.string.StringEncoder;

import java.net.InetSocketAddress;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @description: NettyServer
 * @author: JZG
 * @date: 2018/1/31 15:44
 * @version: v1.0.0
 */
public class NettyServer implements Runnable {

    public static final int WORKER_THREADS = 10;

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
        ExecutorService serverExecutor = Executors.newFixedThreadPool(1);
        ExecutorService workerExecutor = Executors.newFixedThreadPool(WORKER_THREADS);

        ChannelFactory channelFactory = new NioServerSocketChannelFactory(serverExecutor, workerExecutor, Constants.DEFAULT_IO_THREADS);
        ServerBootstrap serverBootstrap = new ServerBootstrap(channelFactory);
        serverBootstrap.setPipelineFactory(new ChannelPipelineFactory() {
            @Override
            public ChannelPipeline getPipeline() throws Exception {
                ChannelPipeline channelPipeline = Channels.pipeline();
                //行最大长度1024
                channelPipeline.addLast("frameDecoder", new LineBasedFrameDecoder(1024));
                channelPipeline.addLast("decoder", new StringDecoder());
                channelPipeline.addLast("encoder", new StringEncoder());
                channelPipeline.addLast("handler", new ServerLogicHandler());
                return channelPipeline;
            }
        });


        InetSocketAddress inetSocketAddress = new InetSocketAddress(Constants.HOST, Constants.PORT);
        serverBootstrap.bind(inetSocketAddress);
    }


    /**
     * 主函数
     * @param args args
     */
    public static void main(String[] args) {
        new NettyServer().run();
    }
}
