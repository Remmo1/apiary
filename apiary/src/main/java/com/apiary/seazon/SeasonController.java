package com.apiary.seazon;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seasons")
@AllArgsConstructor
public class SeasonController {

    private final SeasonService seasonService;

    @GetMapping
    public ResponseEntity<List<SeasonDTO>> getAllSeasons() {
        return ResponseEntity.ok(seasonService.findAll());
    }

    @PostMapping
    public ResponseEntity<SeasonDTO> createSeason(@RequestBody SeasonDTO seasonDTO) {
        return ResponseEntity.ok(seasonService.save(seasonDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeason(@PathVariable Long id) {
        if (!seasonService.canUpdateOrDelete(id)) {
            return ResponseEntity.notFound().build();
        }
        seasonService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
