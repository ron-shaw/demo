package com.jzg.demo.biz.thread;

/**
 * @description: PrintThread
 * @author: JZG
 * @date: 2017/12/28 13:50
 * @version: v1.0.0
 */


public class PrintThread implements Runnable {
    private static Object objLock = new Object();
    private static int start = 0;
    private static final int THREAD_COUNT = 3;
    private static String[] arr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
    //private List<String> list = new ArrayList<String>( Arrays.asList("a", "b", "c","d","e","f","g",""));

    private int threadId;

    public PrintThread(int threadId) {
        this.threadId = threadId;
    }


    @Override
    public void run() {
        int end = arr.length;
        while (start < end) {
            synchronized (objLock) {
                while ((start % THREAD_COUNT != 0) || ((start % THREAD_COUNT == 0) && (start / THREAD_COUNT) % THREAD_COUNT != threadId)) {
                    try {
                        System.out.println("线程" + threadId + "等待");
                        objLock.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }

            synchronized (objLock) {
                System.out.println("线程" + threadId + "唤醒");

                int tmp = 0;
                while (tmp < THREAD_COUNT) {
                    if (start >= end) {
                        break;
                    }
                    System.out.println("线程" + threadId + "打印" + arr[start]);
                    start++;
                    tmp++;
                }

                //System.out.println("线程" + threadId + "打印完毕");
                objLock.notifyAll();
            }
        }
    }
}


/**
 * Created by xrongzhen on 2016/3/4.
 */
/*public class PrintThread implements Runnable {
    private static Object objLock = new Object();
    private int threadId = 0;
    private static Integer end = 100;
    private static Integer start = 0;
    private static final int interval = 5;

    public PrintThread(int threadId) {
        this.threadId = threadId;
    }


    @Override
    public void run() {
        while (start < end) {
            synchronized (objLock) {
                while ((start % interval != 0) || (start % interval == 0 && (start / interval) % 3 != threadId)) {
                    try {
                        objLock.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }

                int tmp = 0;
                while (tmp < interval && start < end) {
                    System.out.println("threadid-" + threadId + " print number: " + start);
                    start++;
                    tmp++;
                }

                objLock.notifyAll();
            }
        }
    }
}*/
