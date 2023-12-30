package com.org.proto.kart.controller;

import com.org.proto.kart.model.Kart;
import com.org.proto.kart.service.KartService;
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
@RequestMapping("/v1/kart")
public class KartController {

    @Autowired
    private KartService service;

    @PostMapping
    public ResponseEntity addItem(@RequestBody Kart kart) {
        if (!ObjectUtils.isEmpty(kart.getId())) {
            return ResponseEntity.badRequest().body("Id is not required");
        }
        return service.addItem(kart);
    }

    @GetMapping
    public ResponseEntity getItem() {
        return service.getItem();
    }

    @GetMapping("/{id}")
    public ResponseEntity getItem(@PathVariable Long id) {
        return service.getItem(id);
    }

    @PutMapping
    public ResponseEntity updateItem(@RequestBody Kart kart) {
        if (ObjectUtils.isEmpty(kart.getId())) {
            return ResponseEntity.badRequest().body("Id is required");
        }
        return service.updateItem(kart);
    }

    @DeleteMapping
    public void removeItem() {
        service.removeItem();
    }

    @DeleteMapping("/{id}")
    public void removeItem(@PathVariable Long id) {
        service.removeItem(id);
    }

}
