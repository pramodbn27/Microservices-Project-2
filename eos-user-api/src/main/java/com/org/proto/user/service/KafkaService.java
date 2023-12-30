package com.org.proto.user.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class KafkaService {

    @KafkaListener(topics = "${topic.name.consumer}", groupId = "${spring.kafka.group-id}")
    public void consume(ConsumerRecord<String, String> payload){
        log.info("Topic: {}", payload.topic());
        log.info("Order: {}", payload.value());
    }

}

