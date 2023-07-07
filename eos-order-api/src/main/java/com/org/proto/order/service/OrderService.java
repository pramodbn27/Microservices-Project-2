package com.org.proto.order.service;

import com.org.proto.order.model.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

public interface OrderService {

    ResponseEntity placeOrder(Order order);

    ResponseEntity getOrder();

    ResponseEntity getOrder(Long id);

    ResponseEntity getOrderByUserId(Long id);

    ResponseEntity updateOrder(Order order);

    void deleteOrder();

    void deleteOrder(Long id);

}
