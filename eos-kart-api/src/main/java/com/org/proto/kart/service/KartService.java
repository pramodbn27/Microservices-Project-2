package com.org.proto.kart.service;

import com.org.proto.kart.model.Kart;
import org.springframework.http.ResponseEntity;

public interface KartService {
    ResponseEntity addItem(Kart item);

    ResponseEntity getItem();

    ResponseEntity getItem(Long id);

    ResponseEntity updateItem(Kart item);

    void removeItem();

    void removeItem(Long id);

}
