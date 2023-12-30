package com.org.proto.order.controller;

import com.org.proto.order.model.Order;
import com.org.proto.order.service.OrderService;
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
@RequestMapping("/v1/order")
public class OrderController {

    @Autowired
    private OrderService service;

    @PostMapping
    public ResponseEntity placeOrder(@RequestBody Order order) {
        if (!ObjectUtils.isEmpty(order.getId())) {
            return ResponseEntity.badRequest().body("Id is not required");
        }
        return service.placeOrder(order);
    }

    @GetMapping
    public ResponseEntity getOrder() {
        return service.getOrder();
    }

    @GetMapping("/{id}")
    public ResponseEntity getOrder(@PathVariable Long id) {
        return service.getOrder(id);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity getOrderByUserId(@PathVariable Long id) {
        return service.getOrderByUserId(id);
    }

    @PutMapping
    public ResponseEntity updateOrder(@RequestBody Order order) {
        if (ObjectUtils.isEmpty(order.getId())) {
            return ResponseEntity.badRequest().body("Id is required");
        }
        return service.updateOrder(order);
    }

    @DeleteMapping
    public void deleteOrder() {
        service.deleteOrder();
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        service.deleteOrder(id);
    }

}