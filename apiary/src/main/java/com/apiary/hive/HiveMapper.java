package com.apiary.hive;

import com.apiary.corp.CorpMapper;
import com.apiary.note.NoteMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class HiveMapper {

    private final CorpMapper corpMapper;
    private final NoteMapper noteMapper;

    public Hive toEntity(HiveDTO dto) {
        Hive hive = new Hive();
        hive.setId(dto.getId());
        hive.setName(dto.getName());
        hive.setQueen(dto.getQueen());
        hive.setCorps(dto.getCorps().stream().map(corpMapper::toEntity).toList());
        hive.setNotes(dto.getNotes().stream().map(noteMapper::toEntity).toList());
        return hive;
    }

    public HiveDTO toDto(Hive entity) {
        return HiveDTO.builder()
                .id(entity.getId())
                .queen(entity.getQueen())
                .name(entity.getName())
                .corps(entity.getCorps().stream().map(corpMapper::toDto).toList())
                .notes(entity.getNotes().stream().map(noteMapper::toDto).toList())
                .build();
    }

}
