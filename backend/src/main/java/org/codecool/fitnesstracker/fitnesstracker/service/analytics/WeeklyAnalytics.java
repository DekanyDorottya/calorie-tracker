package org.codecool.fitnesstracker.fitnesstracker.service.analytics;

import java.time.LocalDate;

public class WeeklyAnalytics implements AnalyticDuration {
    private static final String DURATION = "weekly";
    @Override
    public String getDuration() {
        return DURATION;
    }

    @Override
    public LocalDate getStartingDate() {
        return LocalDate.now().minusDays(7);
    }
}
