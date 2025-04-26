package com.dancelab.dancelab.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class DanceEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String location;

    @Temporal(TemporalType.DATE)
    private Date eventDate;

    private String judgingCriteria;
    private String schedule;
    private boolean isCanceled;

    // Getters and Setters 👇

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Date getEventDate() { return eventDate; }
    public void setEventDate(Date eventDate) { this.eventDate = eventDate; }

    public String getJudgingCriteria() { return judgingCriteria; }
    public void setJudgingCriteria(String judgingCriteria) { this.judgingCriteria = judgingCriteria; }

    public String getSchedule() { return schedule; }
    public void setSchedule(String schedule) { this.schedule = schedule; }

    public boolean isCanceled() { return isCanceled; }
    public void setCanceled(boolean canceled) { isCanceled = canceled; }
}
