package com.jzg.demo.biz.thread;

import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

/**
 * @description: CyclicBarrierThread
 * @author: JZG
 * @date: 2017/12/28 17:47
 * @version: v1.0.0
 */
public class CyclicBarrierThread implements Runnable {
    private int number;
    private CyclicBarrier cyclicBarrier;

    public CyclicBarrierThread(int number, CyclicBarrier cyclicBarrier) {
        this.number = number;
        this.cyclicBarrier = cyclicBarrier;
    }


    @Override
    public void run() {
        try {
            Thread.sleep(1000L);
            System.out.println("线程" + Thread.currentThread().getId() + "执行完成，数字：" + number);
            //业务已执行完，到达同步屏障
            cyclicBarrier.await();
            System.out.println("线程" + Thread.currentThread().getId() + "继续向下执行，数字：" + number);

        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (BrokenBarrierException e) {
            e.printStackTrace();
        }
    }
}
