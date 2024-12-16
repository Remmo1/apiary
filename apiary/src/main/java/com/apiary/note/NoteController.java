package com.apiary.note;

import com.apiary.hive.HiveDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/works")
@AllArgsConstructor
@CrossOrigin
public class NoteController {

    private final NoteService noteService;

    @GetMapping
    public ResponseEntity<List<NoteDTO>> getNotes() {
        log.info("Getting all works");
        return ResponseEntity.ok(noteService.getWorks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteDTO> getNoteById(@PathVariable Long id) {
        log.info("Getting note (work) with id: {}", id);
        var found = noteService.findById(id);
        return found != null ? ResponseEntity.ok(found) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<NoteDTO> createNote(@RequestBody NoteDTO noteDTO) {
        log.info("Creating new note (work): {}", noteDTO.getName());
        return ResponseEntity.ok(noteService.save(noteDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteDTO> updateNote(@PathVariable Long id, @RequestBody NoteDTO noteDTO) {
        log.info("Updating note (work) with id: {}", id);
        if (!noteService.canUpdateOrDelete(id)) {
            return ResponseEntity.notFound().build();
        }
        noteDTO.setId(id); // Ensure ID is set from the path variable
        return ResponseEntity.ok(noteService.update(noteDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        log.info("Deleting note (work) with id: {}", id);
        if (!noteService.canUpdateOrDelete(id)) {
            return ResponseEntity.notFound().build();
        }
        noteService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
