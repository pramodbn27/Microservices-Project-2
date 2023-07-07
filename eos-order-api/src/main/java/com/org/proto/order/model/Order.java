package com.org.proto.order.model;

import javax.persistence.*;

import lombok.Data;

import java.util.Set;

@Data
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "payment_id")
    private Long paymentId;

    @Column(name = "user_id")
    private Long userId;

    @OneToMany(
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "orders")
    private Set<Item> item;

}

/** order api
 *
 * {
 *  "paymentId": 1
 * }
 *
 */