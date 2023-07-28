package com.org.proto.user.model.request;

import lombok.Data;

@Data
public class Login {
    private String username;
    private String password;
}
