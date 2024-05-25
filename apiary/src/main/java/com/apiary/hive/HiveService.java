package com.apiary.hive;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class HiveService {

    private final HiveRepository hiveRepository;
    private final HiveMapper hiveMapper;

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

    public HiveDTO update(HiveDTO hive) {
        var found = hiveRepository.findById(hive.getId());
        if (found.isPresent()) {
            var hiveFromDb = found.get();
            hiveFromDb.getCorps().clear();
            hiveFromDb.getNotes().clear();

            var save = hiveRepository.save(hiveMapper.toEntity(hive));
            return hiveMapper.toDto(save);
        }
        return null;
    }

    public boolean canUpdateOrDelete(Long hiveId) {
        var found = hiveRepository.findById(hiveId);
        return found.isPresent();
    }

    public void deleteById(Long id) {
        hiveRepository.deleteById(id);
    }
}

