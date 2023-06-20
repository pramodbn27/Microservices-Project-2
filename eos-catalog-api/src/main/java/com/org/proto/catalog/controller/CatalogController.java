package com.org.proto.catalog.controller;

import com.org.proto.catalog.model.CatalogItem;
import com.org.proto.catalog.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/v1/catalog")
public class CatalogController {

    @Autowired
    private CatalogService service;

    @PostMapping
    public ResponseEntity addItem(@RequestBody CatalogItem catalogItem) {
        if(!ObjectUtils.isEmpty(catalogItem.getId())) {
            return ResponseEntity.badRequest().build();
        }
        return service.addItem(catalogItem);
    }

    @PutMapping(value = "/add-image/{id}", consumes = {
            MediaType.MULTIPART_FORM_DATA_VALUE
    })
    public ResponseEntity addImage(@PathVariable("id") Long id,
                                   @RequestParam(value = "item_photo") MultipartFile multipartFile) {
        if(ObjectUtils.isEmpty(id)) {
            return ResponseEntity.badRequest().build();
        }
        return service.addImage(id, multipartFile);
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
    public ResponseEntity updateItem(@RequestBody CatalogItem catalogItem) {
        return service.updateItem(catalogItem);
    }

    @PutMapping("/update-image/{id}")
    public ResponseEntity updateImage(@PathVariable("id") Long id, @RequestParam(value = "item_photo", required = true) MultipartFile multipartFile) {
        if(!ObjectUtils.isEmpty(id)) {
            return ResponseEntity.badRequest().build();
        }
        return service.updateImage(id, multipartFile);
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
