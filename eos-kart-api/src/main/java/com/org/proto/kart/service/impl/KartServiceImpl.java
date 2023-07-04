package com.org.proto.kart.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.org.proto.kart.model.Item;
import com.org.proto.kart.model.Kart;
import com.org.proto.kart.repository.KartRepository;
import com.org.proto.kart.service.KartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
@Transactional
public class KartServiceImpl implements KartService {

    @Autowired
    private KartRepository repository;

    @Value("${baseUrl}")
    private String url;

    private RestTemplate template = new RestTemplate();

    @Override
    public ResponseEntity addItem(final Kart items) {
        var data = items.getItem();
        for(Item item : data) {
            data.remove(item);
            var getData = template
                    .getForObject(url+ "/catalog/" + item.getItemId(), JsonNode.class);
            item.setPrice(getData.findPath("amount").asDouble() * item.getQuantity());
            item.setCost(getData.findPath("amount").asDouble());
            item.setItemName(getData.findPath("itemName").asText());
            data.add(item);
        }
        items.setItem(data);
        var response = repository.save(items);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity getItem() {
        var response = repository.findAll();
        return response.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity getItem(final Long id) {
        var response = repository.findById(id);
        return response.isPresent() ? ResponseEntity.ok(response.get()) : ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity updateItem(final Kart items) {
        var kart = repository.findById(items.getId());
        if (!kart.isPresent()) {
            return ResponseEntity.badRequest().body("Id is invalid");
        }
        var data = items.getItem();
        items.getItem().stream().forEach(item -> {
            data.remove(item);
            var getData = template
                    .getForObject(url + item.getItemId(), JsonNode.class);
            item.setPrice(getData.findPath("amount").asDouble() * item.getQuantity());
            item.setCost(getData.findPath("amount").asDouble());
            data.add(item);
        });
        repository.save(items);
        return ResponseEntity.ok().build();
    }

    @Override
    public void removeItem() {
        repository.deleteAll();
    }

    @Override
    public void removeItem(final Long id) {
        repository.deleteById(id);
    }
}
