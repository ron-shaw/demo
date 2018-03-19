package com.jzg.demo.biz.thread;

import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.Semaphore;

/**
 * @description: SemaphoreThread
 * @author: JZG
 * @date: 2017/12/28 17:06
 * @version: v1.0.0
 */
public class SemaphoreThread implements Runnable {
    private Semaphore semaphore;
    private Integer name;

    public SemaphoreThread(Integer name, Semaphore semaphore) {
        this.name = name;
        this.semaphore = semaphore;
    }

    @Override
    public void run() {
        if (semaphore.availablePermits() > 0) {
            System.out.println("线程" + Thread.currentThread().getId() + "进入，人员：" + name + "可用资源大于0");
        }else {
            System.out.println("线程" + Thread.currentThread().getId() + "进入，人员：" + name + "可用资源小于于0");
        }

        try {
            semaphore.acquire();
            //执行业务逻辑
            Thread.sleep(1000L);
            System.out.println("线程" + Thread.currentThread().getId() + "执行完成，人员：" + name);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            semaphore.release();
        }


    }
}
