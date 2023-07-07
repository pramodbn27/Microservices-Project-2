package com.org.proto.order.service.impl;

import com.org.proto.order.model.Order;
import com.org.proto.order.repository.OrderRepository;
import com.org.proto.order.service.KafkaService;
import com.org.proto.order.service.OrderService;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository repository;

    @Autowired
    private KafkaService eventService;

    private static final String SUCCESS_MSG = "Order No. %s\ncreated successfully\non %s";

    @Override
    public ResponseEntity placeOrder(final Order order) {
        var response = repository.save(order);
        eventService.produce(String.format(SUCCESS_MSG, response.getId(), new Date()));
        return ResponseEntity.ok(String.format(SUCCESS_MSG, response.getId(), new Date()));
    }

    @Override
    public ResponseEntity getOrder() {
        return ResponseEntity.ok(repository.findAll());
    }

    @Override
    public ResponseEntity getOrder(final Long id) {
        return ResponseEntity.ok(repository.findById(id).get());
    }

    @Override
    public ResponseEntity getOrderByUserId(Long id) {
        return ResponseEntity.ok(repository.findByUserId(id));
    }

    @Override
    public ResponseEntity updateOrder(final Order order) {
        return ResponseEntity.ok(repository.save(order));
    }

    @Override
    public void deleteOrder() {
        repository.deleteAll();
    }

    @Override
    public void deleteOrder(final Long id) {
        repository.deleteById(id);
    }
}
