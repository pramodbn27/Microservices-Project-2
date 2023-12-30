package com.org.proto.user.controller;

import com.org.proto.user.model.User;
import com.org.proto.user.model.request.Login;
import com.org.proto.user.service.UserService;
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
@RequestMapping("/v1/user")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public ResponseEntity addUser(@RequestBody User user) {
        if (!ObjectUtils.isEmpty(user.getId())) {
            return ResponseEntity.badRequest().body("Id is not required");
        }
        return service.addUser(user);
    }

    @GetMapping
    public ResponseEntity getUser() {
        return service.getUser();
    }

    @GetMapping("/{id}")
    public ResponseEntity getUser(@PathVariable Long id) {
        return service.getUser(id);
    }

    @PostMapping("/login")
    public User login(@RequestBody Login login) {
        return service.login(login);
    }

    @PutMapping
    public ResponseEntity updateUser(@RequestBody User user) {
        if (ObjectUtils.isEmpty(user.getId())) {
            return ResponseEntity.badRequest().body("Id is required");
        }
        return service.updateUser(user);
    }

    @DeleteMapping
    public void deleteUser() {
        service.deleteUser();
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        service.deleteUser(id);
    }

}