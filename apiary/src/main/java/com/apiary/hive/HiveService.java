package com.apiary.hive;

import com.apiary.corp.Corp;
import com.apiary.corp.CorpMapper;
import com.apiary.corp.CorpRepository;
import com.apiary.note.NoteMapper;
import com.apiary.note.NoteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class HiveService {

    private final HiveRepository hiveRepository;
    private final CorpRepository corpRepository;
    private final NoteRepository noteRepository;
    private final HiveMapper hiveMapper;
    private final CorpMapper corpMapper;
    private final NoteMapper noteMapper;

    public List<HiveDTO> findAll() {
        return hiveRepository.findAll().stream().map(hiveMapper::toDto).toList();
    }

    public HiveDTO findById(Long id) {
        var found = hiveRepository.findById(id);
        return found.map(hiveMapper::toDto).orElse(null);
    }

    public HiveDTO save(HiveDTO hive) {
        Hive save = hiveMapper.toEntity(hive);
        save.getCorps().forEach(c -> c.setHive(save));
        save.getNotes().forEach(n -> n.setHive(save));
        hiveRepository.save(save);
        return hiveMapper.toDto(save);
    }

    public HiveDTO update(HiveDTO hiveDTO) {
        var toUpdate = hiveRepository.findById(hiveDTO.getId()).orElseThrow(() ->
                new RuntimeException("Hive doesn't exist"));
        toUpdate.setCorps(hiveDTO.getCorps().stream().map(corpMapper::toEntity).toList());
        toUpdate.setNotes(hiveDTO.getNotes().stream().map(noteMapper::toEntity).toList());

        var updated = hiveRepository.save(toUpdate);
        return hiveMapper.toDto(updated);
    }


    public boolean canUpdateOrDelete(Long hiveId) {
        var found = hiveRepository.findById(hiveId);
        return found.isPresent();
    }

    public void deleteById(Long id) {
        hiveRepository.deleteById(id);
    }
}

