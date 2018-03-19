package com.jzg.demo.biz.thread.example;

import java.util.concurrent.CountDownLatch;

/**
 * @description: PrintObject
 * @author: JZG
 * @date: 2017/12/29 9:28
 * @version: v1.0.0
 */
public class PrintThread implements Runnable {
    private Resource resourceObject;
    private Object objLock;
    private CountDownLatch countDownLatch;

    //region threadCount
    public int getThreadCount() {
        return threadCount;
    }

    public void setThreadCount(int threadCount) {
        this.threadCount = threadCount;
    }

    private int threadCount;
    //endregion

    //region threadId
    private int threadId;

    public int getThreadId() {
        return threadId;
    }

    public void setThreadId(int threadId) {
        this.threadId = threadId;

    }
    //endregion


    public PrintThread(int threadId, int threadCount, Resource resourceObject, Object objLock, CountDownLatch countDownLatch) {
        this.threadId = threadId;
        this.threadCount = threadCount;
        this.resourceObject = resourceObject;
        this.objLock = objLock;
        this.countDownLatch = countDownLatch;
    }

    @Override
    public void run() {
        while (resourceObject.getPostiton() <= resourceObject.getEnd()) {
            synchronized (objLock) {
                while (resourceObject.getPostiton() % threadCount != threadId) {
                    try {
                        if (resourceObject.getPostiton() <= resourceObject.getEnd()) {
                            System.out.println("thread " + threadId + " wait print:" + resourceObject.getPostiton() );
                            objLock.wait();
                        }else{
                            System.out.println("thread " + threadId + " not wait print:" + resourceObject.getPostiton() );
                            break;
                        }
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }

                /*try {
                    Thread.sleep(1000L);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }*/

                if (resourceObject.getPostiton() <= resourceObject.getEnd()) {
                    //处理业务逻辑，打印三个数
                    System.out.println("thread " + threadId + " print:" + resourceObject.getPostiton() + "-" + (char) resourceObject.getPostiton());
                    resourceObject.addPosition();
                }

                objLock.notifyAll();
                System.out.println("thread " + threadId + " print:" + resourceObject.getPostiton() + " notifyAll ");
            }
        }
        System.out.println("thread " + threadId + "退出");
        countDownLatch.countDown();
    }
}
