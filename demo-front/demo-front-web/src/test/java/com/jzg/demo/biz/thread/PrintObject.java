package com.jzg.demo.biz.thread;

/**
 * @description: PrintThread
 * @author: JZG
 * @date: 2017/12/28 13:50
 * @version: v1.0.0
 */
public class PrintObject {
    private int threadNum;
    private int threadId;
    private Resource resource;
    public Resource getResource() {
        return resource;
    }
    private int end;
    public int getEnd() {
        return end;
    }



    public PrintObject(int threadId, int threadNum, Resource resource) {
        this.threadId = threadId;
        this.threadNum = threadNum;
        this.resource = resource;
        this.end = resource.getEnd();
    }


    public synchronized void consume() {
        int start = resource.getCurrentIndex().intValue();
        while (start < resource.getEnd()) {
            while ((start % threadNum != 0) || ((start % threadNum == 0) && (start / threadNum) % threadNum != threadId)) {
                try {
                    System.out.println("线程" + threadId + "等待");
                    wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }

            //其他业务逻辑
            int tmp = 0;
            while (tmp < threadNum) {
                if (resource.getCurrentIndex().intValue() >= resource.getEnd()) {
                    break;
                }
                System.out.println("线程" + threadId + "打印" + start);
                resource.move();
                tmp++;
            }

            notifyAll();
        }
    }
}


