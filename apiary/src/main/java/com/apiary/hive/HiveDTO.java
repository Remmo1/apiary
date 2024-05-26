package com.apiary.hive;

import com.apiary.corp.CorpDTO;
import com.apiary.note.NoteDTO;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class HiveDTO {
    private Long id;
    private String name;
    private String queen;
    private List<CorpDTO> corps;
    private List<NoteDTO> notes;

    // Getters and Setters
}
