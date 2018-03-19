package com.jzg.demo.biz.thread.example;

/**
 * @description: ResourceObject
 * @author: JZG
 * @date: 2017/12/29 13:47
 * @version: v1.0.0
 */
public class Resource {
    public Resource() {
        this.postiton = 65;
        this.end = 90;
    }

    public Resource(int postiton, int end) {
        this.postiton = postiton;
        this.end = end;
    }

    private volatile int postiton;
    private volatile int end;

    public int getEnd() {
        return end;
    }
    public void setEnd(int end) {
        this.end = end;
    }



    public int getPostiton() {
        return postiton;
    }
    public void setPostiton(int postiton) {
        this.postiton = postiton;
    }


    public synchronized int addPosition() {
        return postiton++;
    }
}
