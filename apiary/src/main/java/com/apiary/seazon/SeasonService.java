package com.apiary.seazon;

import com.apiary.note.Note;
import com.apiary.note.NoteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SeasonService {

    private final SeasonRepository seasonRepository;
    private final NoteRepository noteRepository;
    private final SeasonMapper seasonMapper;

    public List<SeasonDTO> findAll() {
        var seasons = seasonRepository.findAll();
        seasons.forEach(s -> {
            var notesInSeason = noteRepository.findAll().stream()
                    .filter(n -> n.getDate().before(s.getEndDate()) && n.getDate().after(s.getStartDate())).toList();
            s.setSyrup(notesInSeason.stream().mapToInt(Note::getSyrup).sum());
            s.setHoney(notesInSeason.stream().mapToInt(Note::getHoney).sum());
        });

        return seasons.stream().map(seasonMapper::toDto).toList();
    }

    public SeasonDTO save(SeasonDTO seasonDTO) {
        seasonDTO.setHoney(0);
        seasonDTO.setSyrup(0);
        return seasonMapper.toDto(seasonRepository.save(seasonMapper.toEntity(seasonDTO)));
    }

    public void deleteById(Long seasonId) {
        seasonRepository.deleteById(seasonId);
    }

    public boolean canUpdateOrDelete(Long id) {
        var found = seasonRepository.findById(id);
        return found.isPresent();
    }

}
