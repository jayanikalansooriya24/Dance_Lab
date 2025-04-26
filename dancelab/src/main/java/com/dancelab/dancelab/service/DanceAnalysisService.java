package com.dancelab.dancelab.service;

import com.dancelab.dancelab.model.DanceAnalysis;
import java.util.List;

public interface DanceAnalysisService {
    DanceAnalysis submitAnalysis(DanceAnalysis analysis);
    List<DanceAnalysis> getAllAnalysis();
    DanceAnalysis updateAnalysis(Long id, DanceAnalysis updated);
    void deleteAnalysis(Long id); // Corrected method signature
}
