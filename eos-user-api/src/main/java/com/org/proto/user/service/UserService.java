package com.org.proto.user.service;

import com.org.proto.user.model.User;
import com.org.proto.user.model.request.Login;
import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity addUser(User user);

    ResponseEntity updateUser(User user);

    ResponseEntity getUser(Long id);

    ResponseEntity getUser();

    void deleteUser(Long id);

    void deleteUser();

    User login(Login login);

}
