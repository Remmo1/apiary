package com.apiary.seazon;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class SeasonDTO {
    private Long id;
    private String name;
    private Date startDate;
    private Date endDate;
    private int honey;
    private int syrup;

    // Getters and Setters
}
