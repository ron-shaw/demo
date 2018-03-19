package com.jzg.demo.biz.thread;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @description: Resource
 * @author: JZG
 * @date: 2017/12/28 16:00
 * @version: v1.0.0
 */
public class Resource {
    private List<Integer> resources  = new ArrayList<Integer>();

    /**
     * Getter for property 'end'.
     *
     * @return Value for property 'end'.
     */
    public int getEnd() {
        return end;
    }

    private int end;

    /**
     * Getter for property 'currentIndex'.
     *
     * @return Value for property 'currentIndex'.
     */
    public AtomicInteger getCurrentIndex() {
        return currentIndex;
    }

    private AtomicInteger currentIndex;

    public Resource(int end){
        this.end = end - 1;
        for (int i = 0; i < end; i++) {
            resources.add(i);
        }
        this.currentIndex = new AtomicInteger(0);
    }

    public synchronized int move(){
        return currentIndex.decrementAndGet();
    }
}
