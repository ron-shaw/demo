package com.jzg.demo.biz.thread.example;

import java.util.concurrent.CountDownLatch;

/**
 * @description: CompleteThread
 * @author: JZG
 * @date: 2017/12/29 14:11
 * @version: v1.0.0
 */
public class CompleteThread implements Runnable {
    private CountDownLatch countDownLatch;

    public CompleteThread(CountDownLatch countDownLatch) {
        this.countDownLatch = countDownLatch;
    }

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
        try {
            countDownLatch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("完成打印");
    }
}
