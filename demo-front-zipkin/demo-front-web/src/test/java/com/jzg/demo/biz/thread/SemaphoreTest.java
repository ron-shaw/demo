package com.jzg.demo.biz.thread;

import org.junit.Test;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;

/**
 * @description: SemaphoreTest
 * @author: JZG
 * @date: 2017/12/28 16:57
 * @version: v1.0.0
 */
public class SemaphoreTest {

    @Test
    public void test() {
        Semaphore semaphore = new Semaphore(4);

        ExecutorService executorService = Executors.newFixedThreadPool(10);
        for (int i = 0; i < 100; i++) {
            executorService.execute(new SemaphoreThread(i, semaphore));
        }

        executorService.shutdown();
        //从信号量中获取4个许可，并且在获得许可之前，一直将线程阻塞
        semaphore.acquireUninterruptibly(4);
        System.out.println("使用完毕，开始清扫。");
        semaphore.release(4);
    }


}
