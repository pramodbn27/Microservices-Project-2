package com.org.proto.catalog.service;

import com.org.proto.catalog.model.CatalogItem;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

public interface CatalogService {
    ResponseEntity addItem(CatalogItem catalogItem);

    ResponseEntity addImage(Long id, MultipartFile multipartFile);

    ResponseEntity getItem();

    ResponseEntity getItem(Long id);

    ResponseEntity updateItem(CatalogItem catalogItem);

    ResponseEntity updateImage(Long id, MultipartFile multipartFile);

    void removeItem();

    void removeItem(Long  id);

}
