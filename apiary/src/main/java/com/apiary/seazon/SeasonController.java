package com.apiary.seazon;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/seasons")
@AllArgsConstructor
@CrossOrigin
public class SeasonController {

    private final SeasonService seasonService;

    @GetMapping
    public ResponseEntity<List<SeasonDTO>> getAllSeasons() {
        log.info("Getting all seasons");
        return ResponseEntity.ok(seasonService.findAll());
    }

    @PostMapping
    public ResponseEntity<SeasonDTO> createSeason(@RequestBody SeasonDTO seasonDTO) {
        log.info("Creating new season: {}", seasonDTO.getName());
        return ResponseEntity.ok(seasonService.save(seasonDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeason(@PathVariable Long id) {
        log.info("Deleting season with id: {}", id);
        if (!seasonService.canUpdateOrDelete(id)) {
            return ResponseEntity.notFound().build();
        }
        seasonService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
