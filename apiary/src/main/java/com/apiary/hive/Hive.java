package com.apiary.hive;

import com.apiary.note.Note;
import com.apiary.corp.Corp;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Hive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String queen;

    @OneToMany(mappedBy = "hive", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Corp> corps = new ArrayList<>();

    @OneToMany(mappedBy = "hive", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Note> notes = new ArrayList<>();

    public void setCorps(List<Corp> corps) {
        if (this.corps != null) {
            this.corps.clear();
        }
        if (corps != null) {
            corps.forEach(child -> child.setHive(this));
            this.corps.addAll(corps);
        }
    }

    public void setNotes(List<Note> notes) {
        if (this.notes != null) {
            this.notes.clear();
        }
        if (notes != null) {
            notes.forEach(child -> child.setHive(this));
            this.notes.addAll(notes);
        }
    }

}
