package com.jzg.demo.mybatis.dto;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @description: ProductVo
 * @author: JZG
 * @date: 2018/1/18 15:55
 * @version: v1.0.0
 */
public class OrderDto implements Serializable {
    private Long customerId;
    private Long productId;
    private Integer quantity;
    private BigDecimal amount;

    public OrderDto(Long customerId, Long productId, Integer quantity, BigDecimal amount) {
        this.customerId = customerId;
        this.productId = productId;
        this.quantity = quantity;
        this.amount = amount;
    }


    /**
     * Getter for property 'amount'.
     *
     * @return Value for property 'amount'.
     */
    public BigDecimal getAmount() {
        return amount;
    }

    /**
     * Setter for property 'amount'.
     *
     * @param amount Value to set for property 'amount'.
     */
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }



    /**
     * Getter for property 'customerId'.
     *
     * @return Value for property 'customerId'.
     */
    public Long getCustomerId() {
        return customerId;
    }

    /**
     * Setter for property 'customerId'.
     *
     * @param customerId Value to set for property 'customerId'.
     */
    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    /**
     * Getter for property 'productId'.
     *
     * @return Value for property 'productId'.
     */
    public Long getProductId() {
        return productId;
    }

    /**
     * Setter for property 'productId'.
     *
     * @param productId Value to set for property 'productId'.
     */
    public void setProductId(Long productId) {
        this.productId = productId;
    }

    /**
     * Getter for property 'quantity'.
     *
     * @return Value for property 'quantity'.
     */
    public Integer getQuantity() {
        return quantity;
    }

    /**
     * Setter for property 'quantity'.
     *
     * @param quantity Value to set for property 'quantity'.
     */
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
