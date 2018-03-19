package com.jzg.demo.biz.thread;

/**
 * @description: PrintTH
 * @author: JZG
 * @date: 2017/12/28 15:41
 * @version: v1.0.0
 */
public class PrintThreadOne implements Runnable {

    private PrintObject printObject;


    public PrintThreadOne(PrintObject printObject){
        this.printObject = printObject;
    }

    /**
     * When an object implementing interface <code>Runnable</code> is used
     * to create a thread, starting the thread causes the object's
     * <code>run</code> method to be called in that separately executing
     * thread.
     * <p>
     * The general contract of the method <code>run</code> is that it may
     * take any action whatsoever.
     *
     * @see Thread#run()
     */
    @Override
    public void run() {
        //while (printObject.getResource().getCurrentIndex().intValue() < printObject.getEnd()) {
            printObject.consume();
        //}
    }
}
