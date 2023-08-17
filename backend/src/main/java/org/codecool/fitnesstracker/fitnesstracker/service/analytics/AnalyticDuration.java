package org.codecool.fitnesstracker.fitnesstracker.service.analytics;

import org.codecool.fitnesstracker.fitnesstracker.controller.dto.AnalyticDailyDTO;
import org.codecool.fitnesstracker.fitnesstracker.dao.model.User;
import org.codecool.fitnesstracker.fitnesstracker.service.CalorieService;

import java.time.LocalDate;
import java.util.List;

public interface AnalyticDuration {
    String getDuration();

    LocalDate getStartingDate();

    List<AnalyticDailyDTO> getAnalytics(CalorieService calorieService, int userBaseLineCalorieRequirement, User user);
}
