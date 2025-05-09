package com.dancelab.dancelab.controller;

import com.dancelab.dancelab.model.DanceAnalysis;
import com.dancelab.dancelab.service.DanceAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analysis")
@CrossOrigin(origins = "*")
public class DanceAnalysisController {

    @Autowired
    private DanceAnalysisService service;

    @PostMapping
    public DanceAnalysis create(@RequestBody DanceAnalysis analysis) {
        return service.submitAnalysis(analysis);
    }

    @GetMapping
    public List<DanceAnalysis> getAll() {
        return service.getAllAnalysis();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody DanceAnalysis updated) {
        try {
            DanceAnalysis result = service.updateAnalysis(id, updated);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            service.deleteAnalysis(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
