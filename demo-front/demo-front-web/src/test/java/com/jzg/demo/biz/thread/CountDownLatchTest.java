package com.jzg.demo.biz.thread;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

/**
 * @description: CountDownLatchTest
 * @author: JZG
 * @date: 2017/12/28 16:33
 * @version: v1.0.0
 */
public class CountDownLatchTest   {
    @Test
    public void test() {

        final int threadCount = 1000;
        final CountDownLatch countDownLatch = new CountDownLatch(threadCount);

        ExecutorService executorService = Executors.newFixedThreadPool(10);
        List<Future> futures = new ArrayList<Future>();
        List<Integer> numbers = new ArrayList<Integer>();

        for (int i = 0; i < threadCount; i++) {
            final int tmp = i;
            Future future = executorService.submit(new CountDownLatchThread(tmp, countDownLatch));
            futures.add(future);

        }
        executorService.shutdown();
        try {
            countDownLatch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }



        for (Future future : futures) {
            try {
                Object obj = future.get();
                numbers.add(Integer.parseInt(obj.toString()));
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
        }


        int sums = 0;
        for (int i = 0; i < numbers.size(); i++) {
            sums = numbers.get(i) + sums;
        }
        System.out.println(sums);
    }


}
