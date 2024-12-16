package com.apiary.note;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class NoteMapper {

    public Note toEntity(NoteDTO dto) {
        Note note = new Note();
        note.setDate(dto.getDate());
        note.setText(dto.getText());
        note.setName(dto.getName());
        note.setSyrup(dto.getSyrup());
        note.setHoney(dto.getHoney());
        note.setId(dto.getId());
        return note;
    }

    public NoteDTO toDto(Note entity) {
        return NoteDTO.builder()
                .id(entity.getId())
                .date(entity.getDate())
                .name(entity.getName())
                .syrup(entity.getSyrup())
                .honey(entity.getHoney())
                .text(entity.getText())
                .hiveId(entity.getHive() != null ? entity.getHive().getId() : -1)
                .build();
    }

}
