package com.apiary.note;

import com.apiary.hive.Hive;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date;
    private String text;
    private int honey;
    private int syrup;

    @ManyToOne
    @JoinColumn(name = "hive_id")
    private Hive hive;

    // Getters and Setters
}

