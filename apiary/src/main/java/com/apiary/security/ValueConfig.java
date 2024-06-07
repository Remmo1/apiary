package com.apiary.security;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class ValueConfig {

    @Value("${frontend.address}")
    private String frontendAddress;

}
