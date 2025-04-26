package com.dancelab.dancelab.controller;

import com.dancelab.dancelab.model.DanceAnalysis;
import com.dancelab.dancelab.service.DanceAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public DanceAnalysis update(@PathVariable Long id, @RequestBody DanceAnalysis updated) {
        return service.updateAnalysis(id, updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteAnalysis(id);
    }
}
