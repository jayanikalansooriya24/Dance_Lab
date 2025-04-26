package com.dancelab.dancelab.service;

import com.dancelab.dancelab.model.DanceAnalysis;
import com.dancelab.dancelab.repository.DanceAnalysisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class DanceAnalysisServiceImpl implements DanceAnalysisService {

    @Autowired
    private DanceAnalysisRepository repository;

    @Override
    public DanceAnalysis submitAnalysis(DanceAnalysis analysis) {
        analysis.setSubmittedAt(new Date());
        return repository.save(analysis);
    }

    @Override
    public List<DanceAnalysis> getAllAnalysis() {
        return repository.findAll();
    }

    @Override
    public DanceAnalysis updateAnalysis(Long id, DanceAnalysis updated) {
        DanceAnalysis existing = repository.findById(id).orElseThrow();
        existing.setRoutineTitle(updated.getRoutineTitle());
        existing.setAnalysisResult(updated.getAnalysisResult());
        existing.setFeedback(updated.getFeedback());
        existing.setShared(updated.isShared());
        return repository.save(existing);
    }

    @Override
    public void deleteAnalysis(Long id) {
        repository.deleteById(id);
    }
}
