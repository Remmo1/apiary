package com.apiary.note;

import com.apiary.hive.Hive;
import com.apiary.hive.HiveDTO;
import com.apiary.hive.HiveRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class NoteService {

    private final NoteMapper noteMapper;
    private final NoteRepository noteRepository;
    private final HiveRepository hiveRepository;

    public List<NoteDTO> getWorks() {
        return noteRepository.findAll().stream().map(noteMapper::toDto).toList();
    }

    public NoteDTO findById(Long id) {
        var found = noteRepository.findById(id);
        return found.map(noteMapper::toDto).orElse(null);
    }

    public NoteDTO save(NoteDTO note) {
        var save = noteMapper.toEntity(note);

        Optional<Hive> hiveById = hiveRepository.findById(note.getHiveId());
        if (hiveById.isPresent()) {
            save.setHive(hiveById.get());
        } else {
            save.setHive(null);
        }

        noteRepository.save(save);
        return noteMapper.toDto(save);
    }

    public boolean canUpdateOrDelete(Long noteId) {
        var found = noteRepository.findById(noteId);
        return found.isPresent();
    }
    public NoteDTO update(NoteDTO noteDTO) {
        var toUpdate = noteMapper.toEntity(noteDTO);

        Optional<Hive> hiveById = hiveRepository.findById(noteDTO.getHiveId());
        hiveById.ifPresent(toUpdate::setHive);

        var updated = noteRepository.save(toUpdate);
        return noteMapper.toDto(updated);
    }

    public void deleteById(Long id) {
        noteRepository.deleteById(id);
    }

}
