package com.dancelab.dancelab.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class DanceAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String routineTitle;
    private String userName;
    private String analysisResult;
    private String feedback;
    private boolean shared;

    @Temporal(TemporalType.TIMESTAMP)
    private Date submittedAt;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRoutineTitle() { return routineTitle; }
    public void setRoutineTitle(String routineTitle) { this.routineTitle = routineTitle; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getAnalysisResult() { return analysisResult; }
    public void setAnalysisResult(String analysisResult) { this.analysisResult = analysisResult; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public boolean isShared() { return shared; }
    public void setShared(boolean shared) { this.shared = shared; }

    public Date getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(Date submittedAt) { this.submittedAt = submittedAt; }
}
