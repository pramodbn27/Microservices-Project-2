package com.org.proto.kart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class KartApplication {

    public static void main(String[] args) {
        SpringApplication.run(KartApplication.class, args);
    }

}
