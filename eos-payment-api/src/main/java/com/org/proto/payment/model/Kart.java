package com.org.proto.payment.model;

import java.util.Set;
import lombok.Data;

@Data
public class Kart {

    private Long id;

    private Set<Item> item;

}
