package com.jzg.demo.biz.thread.example;

import org.junit.Test;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @description: PrintTest
 * @author: JZG
 * @date: 2017/12/29 14:02
 * @version: v1.0.0
 */
public class PrintThreadTest {

    @Test
    public void test() {
        Resource resourceObject = new Resource();
        Object objLock = new Object();

        int threadCount = 3;

        CountDownLatch countDownLatch = new CountDownLatch(threadCount);
        CompleteThread completeThread = new CompleteThread(countDownLatch);

        for (int i = 0; i < threadCount; i++) {
            PrintThread printThread = new PrintThread(i, threadCount, resourceObject, objLock, countDownLatch);

            Thread thread = new Thread(printThread);
            thread.start();
        }
        Thread thread = new Thread(completeThread);
        thread.start();


        try {
            Thread.sleep(1000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }



    @Test
    public void test1() {
        Object objLock = new Object();

        int threadCount = 3;

        CountDownLatch countDownLatch = new CountDownLatch(threadCount);


        ExecutorService executorService = Executors.newFixedThreadPool(4);
        for (int i = 0; i < threadCount; i++) {
            PrintThreadII printThread = new PrintThreadII(i, threadCount, objLock, countDownLatch);
            executorService.execute(printThread);
        }

        CompleteThread completeThread = new CompleteThread(countDownLatch);
        executorService.execute(completeThread);

        try {
            Thread.sleep(10000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
