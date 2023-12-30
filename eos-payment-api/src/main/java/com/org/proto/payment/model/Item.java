package com.org.proto.payment.model;

import lombok.Data;

@Data
public class Item {

    private Long itemId;

    private Integer quantity;

    private Double price;
}
