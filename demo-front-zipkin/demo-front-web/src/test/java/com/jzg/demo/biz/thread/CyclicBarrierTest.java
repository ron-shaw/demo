package com.jzg.demo.biz.thread;

import org.junit.Test;

import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @description: CyclicBarrierTest
 * @author: JZG
 * @date: 2017/12/28 17:47
 * @version: v1.0.0
 */
public class CyclicBarrierTest {
    @Test
    public void test() {
        final int threadCount = 10;
        ExecutorService executorService = Executors.newFixedThreadPool(10);
        CyclicBarrier cyclicBarrier = new CyclicBarrier(threadCount);

        for (int i = 0; i < threadCount; i++) {
            final int tmp = i;
            executorService.execute(new CyclicBarrierThread(tmp, cyclicBarrier));
        }

        System.out.println("屏障等待的数量" + cyclicBarrier.getNumberWaiting());

        /*try {
            Thread.sleep(100000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }*/
        executorService.shutdown();
    }
}
