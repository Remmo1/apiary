package com.apiary.corp;

import com.apiary.hive.Hive;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Corp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int framesBlack;
    private int framesBrown;
    private int framesWhite;
    private int framesEmpty;

    @ManyToOne
    @JoinColumn(name = "hive_id")
    private Hive hive;

    // Getters and Setters
}
