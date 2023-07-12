package com.org.proto.payment.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "kart_id")
    private Long kartId;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "mode")
    private Mode mode;

    @Column(name = "vpa")
    private String vpa;

    @Column(name = "card_holder")
    private String cardHolder;

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "validation")
    private String validation;

    @Column(name = "cvv")
    private String cvv;

    @Column(name = "sub_total")
    private Double subTotal;

    @Column(name = "gst")
    private Double gst;

    @Column(name = "total")
    private Double total;

}

/**
 *
 * {
 *  "kartId": 2,
 *  "mode": "COD" // (COD, CARD, UPI, NET_BANKING)
 * }
 *
 */