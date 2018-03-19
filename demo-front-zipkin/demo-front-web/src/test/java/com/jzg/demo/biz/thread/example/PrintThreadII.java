package com.jzg.demo.biz.thread.example;

import java.util.concurrent.CountDownLatch;

/**
 * @description: PrintObject
 * @author: JZG
 * @date: 2017/12/29 9:28
 * @version: v1.0.0
 */
public class PrintThreadII implements Runnable {
    private static int position = 65;
    private static final int end = 90;
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


    public PrintThreadII(int threadId, int threadCount, Object objLock, CountDownLatch countDownLatch) {
        this.threadId = threadId;
        this.threadCount = threadCount;
        this.objLock = objLock;
        this.countDownLatch = countDownLatch;
    }

    @Override
    public void run() {
        while (position <= end) {
            synchronized (objLock) {
                while (position % threadCount != threadId) {
                    try {
                        if (position <= end) {
                            //System.out.println("thread " + threadId + " wait print:" + position );
                            objLock.wait();
                        }else{
                            //System.out.println("thread " + threadId + " not wait print:" + position );
                            break;
                        }
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }


                if (position <= end) {
                    //处理业务逻辑，打印三个数
                    System.out.println("thread " + threadId + " print:" + position + "-" + (char) position);
                    addPosition();
                }

                objLock.notifyAll();
                //System.out.println("thread " + threadId + " print:" + position + " notifyAll ");
            }
        }
        System.out.println("thread " + threadId + "退出");
        countDownLatch.countDown();
    }

    public int addPosition(){
        synchronized (objLock) {
            return position++;
        }
    }
}
