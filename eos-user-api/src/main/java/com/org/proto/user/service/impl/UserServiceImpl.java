package com.org.proto.user.service.impl;

import com.org.proto.user.model.User;
import com.org.proto.user.model.request.Login;
import com.org.proto.user.repository.UserRepository;
import com.org.proto.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Override
    public ResponseEntity addUser(final User user) {
        return ResponseEntity.ok(repository.save(user).getId());
    }

    @Override
    public ResponseEntity updateUser(final User user) {
        return ResponseEntity.ok(repository.save(user));
    }

    @Override
    public ResponseEntity getUser(final Long id) {
        return ResponseEntity.ok(repository.findById(id).get());
    }

    @Override
    public ResponseEntity getUser() {
        return ResponseEntity.ok(repository.findAll());
    }

    @Override
    public void deleteUser(final Long id) {
        repository.deleteById(id);
    }

    @Override
    public void deleteUser() {
        repository.deleteAll();
    }

    @Override
    public User login(final Login login) {
        var response = repository.findByUsernameAndPassword(login.getUsername(), login.getPassword());
        return response.isPresent() ? response.get() : null;
    }
}
