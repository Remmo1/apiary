package com.apiary.hive;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/hives")
@AllArgsConstructor
public class HiveController {

    private final HiveService hiveService;

    @GetMapping
    public List<HiveDTO> getAllHives() {
        log.info("Getting all hives");
        return hiveService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<HiveDTO> getHiveById(@PathVariable Long id) {
        log.info("Getting hive with id: {}", id);
        var found = hiveService.findById(id);
        return found != null ? ResponseEntity.ok(found) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<HiveDTO> createHive(@RequestBody HiveDTO hiveDTO) {
        log.info("Creating new hive: {}", hiveDTO.getName());
        return ResponseEntity.ok(hiveService.save(hiveDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<HiveDTO> updateHive(@PathVariable Long id, @RequestBody HiveDTO hiveDTO) {
        log.info("Updating hive with id: {}", id);
        if (!hiveService.canUpdateOrDelete(id)) {
            return ResponseEntity.notFound().build();
        }
        hiveDTO.setId(id); // Ensure ID is set from the path variable
        return ResponseEntity.ok(hiveService.update(hiveDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHive(@PathVariable Long id) {
        log.info("Deleting hive with id: {}", id);
        if (!hiveService.canUpdateOrDelete(id)) {
            return ResponseEntity.notFound().build();
        }
        hiveService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
