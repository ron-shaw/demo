package com.jzg.demo.biz.thread;

import java.util.concurrent.Callable;
import java.util.concurrent.CountDownLatch;

/**
 * @description: CountDownLatchThread
 * @author: JZG
 * @date: 2017/12/28 17:00
 * @version: v1.0.0
 */
public class CountDownLatchThread implements Callable {
    private Integer number;
    private CountDownLatch countDownLatch;

    public CountDownLatchThread(Integer number, CountDownLatch countDownLatch) {
        this.number = number;
        this.countDownLatch = countDownLatch;
    }

    @Override
    public Object call() throws Exception {
        //子线程业务逻辑，最后统一合并
        Thread.sleep(1000L);
        countDownLatch.countDown();
        System.out.println("线程" + Thread.currentThread().getId() + "执行完成，数字：" + number);

        return number;
    }
}
