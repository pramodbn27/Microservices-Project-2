package com.org.proto.payment.controller;

import com.org.proto.payment.model.Payment;
import com.org.proto.payment.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/payment")
public class PaymentController {

    @Autowired
    private PaymentService service;

    @PostMapping
    public ResponseEntity requestPayment(@RequestBody Payment payment) {
        if (!ObjectUtils.isEmpty(payment.getId())) {
            return ResponseEntity.badRequest().body("Id is not required");
        }
        return service.requestPayment(payment);
    }

    @GetMapping
    public ResponseEntity getPayment() {
        return service.getPayment();
    }

    @GetMapping("/{id}")
    public ResponseEntity getPayment(@PathVariable Long id) {
        return service.getPayment(id);
    }

    @PutMapping
    public ResponseEntity updatePayment(@RequestBody Payment payment) {
        if (ObjectUtils.isEmpty(payment.getId())) {
            return ResponseEntity.badRequest().body("Id is required");
        }
        return service.updatePayment(payment);
    }

    @DeleteMapping
    public void deletePayment() {
        service.deletePayment();
    }

    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) {
        service.deletePayment(id);
    }

}
