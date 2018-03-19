package com.jzg.demo.biz.thread;

import org.junit.Test;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @description: Create By IDEA
 * @author: JZG
 * @date: 2017/12/27 17:21
 */
public class TempTest {
    private static final int THREAD_COUNT = 3;
    private static int start = 0;
    private static String[] arr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");

    @Test
    public void test() {
        ExecutorService executorService = Executors.newFixedThreadPool(THREAD_COUNT);

        for (int i = 0; i < THREAD_COUNT; i++) {
            executorService.execute(new PrintThread(i));
            //new Thread(new PrintThread(i)).start();
        }
        executorService.shutdown();


        /*try {
            Thread.sleep(100000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }*/
        System.out.println("执行完毕");
    }


    @Test
    public void test1() {
        ExecutorService executorService = Executors.newFixedThreadPool(THREAD_COUNT);
        PrintThreadOne[] printThreadOnes = new PrintThreadOne[THREAD_COUNT];

        Resource resource = new Resource(100);

        for (int i = 0; i < THREAD_COUNT; i++) {
            PrintObject printObject = new PrintObject(i, THREAD_COUNT, resource);
            printThreadOnes[i] = new PrintThreadOne(printObject);
            executorService.execute(printThreadOnes[i]);
        }


        try {
            Thread.sleep(100000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

