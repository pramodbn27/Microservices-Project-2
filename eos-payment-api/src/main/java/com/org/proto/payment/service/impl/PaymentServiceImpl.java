package com.org.proto.payment.service.impl;

import com.org.proto.payment.model.Kart;
import com.org.proto.payment.model.Payment;
import com.org.proto.payment.repository.PaymentRepository;
import com.org.proto.payment.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository repository;

    @Value("${baseUrl}")
    private String url;

    private RestTemplate template = new RestTemplate();

    @Override
    public ResponseEntity requestPayment(final Payment item) {
        var getData = template
                .getForObject(url + "/kart/" + item.getKartId(), Kart.class);
        item.setSubTotal(getData.getItem().stream().mapToDouble(itm -> itm.getPrice()).sum());
        item.setGst(item.getSubTotal() * 0.18);
        item.setTotal(item.getSubTotal() + item.getGst());
        return ResponseEntity.ok().body(repository.save(item));
    }

    @Override
    public ResponseEntity getPayment() {
        var response = repository.findAll();
        return response.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity getPayment(final Long id) {
        var response = repository.findById(id);
        return response.isPresent() ? ResponseEntity.ok(response.get()) : ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity updatePayment(final Payment kart) {
        var item = repository.findById(kart.getId());
        if (!item.isPresent()) {
            return ResponseEntity.badRequest().body("Id is invalid");
        }
        var getData = template
                .getForObject(url + kart.getKartId(), Kart.class);
        kart.setSubTotal(getData.getItem().stream().mapToDouble(itm -> itm.getPrice()).sum());
        kart.setGst(kart.getSubTotal() * 0.18);
        kart.setTotal(kart.getSubTotal() + kart.getGst());
        return ResponseEntity.ok().body(repository.save(kart));
    }

    @Override
    public void deletePayment() {
        repository.deleteAll();
    }

    @Override
    public void deletePayment(final Long id) {
        repository.deleteById(id);
    }
}
