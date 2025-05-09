package com.dancelab.dancelab.service;

import java.util.List;

import com.dancelab.dancelab.model.DanceAnalysis;

public interface DanceAnalysisService {
    DanceAnalysis submitAnalysis(DanceAnalysis analysis);
    List<DanceAnalysis> getAllAnalysis();
    DanceAnalysis updateAnalysis(String id, DanceAnalysis updated);
    void deleteAnalysis(String id);
}
