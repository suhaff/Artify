package com.artify.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String fullName;
    private int age;
    private String email;
    private String username;
    private String password;
}
