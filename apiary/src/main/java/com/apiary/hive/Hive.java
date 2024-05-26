package com.apiary.hive;

import com.apiary.note.Note;
import com.apiary.corp.Corp;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Hive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String queen;

    @OneToMany(mappedBy = "hive", cascade = CascadeType.ALL)
    private List<Corp> corps;

    @OneToMany(mappedBy = "hive", cascade = CascadeType.ALL)
    private List<Note> notes;

    // Getters and Setters
}
