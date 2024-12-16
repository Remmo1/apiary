package com.apiary.note;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class NoteDTO {
    private Long id;
    private Date date;
    private String name;
    private String text;
    private Long hiveId;
    private int honey;
    private int syrup;

    // Getters and Setters
}
