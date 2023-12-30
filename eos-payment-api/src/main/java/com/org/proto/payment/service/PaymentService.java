package com.org.proto.payment.service;

import com.org.proto.payment.model.Payment;
import org.springframework.http.ResponseEntity;

public interface PaymentService {
    ResponseEntity requestPayment(Payment payment);

    ResponseEntity getPayment();

    ResponseEntity getPayment(Long id);

    ResponseEntity updatePayment(Payment payment);

    void deletePayment();

    void deletePayment(Long id);

}
