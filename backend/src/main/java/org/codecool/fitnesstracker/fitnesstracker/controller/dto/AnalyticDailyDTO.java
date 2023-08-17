package org.codecool.fitnesstracker.fitnesstracker.controller.dto;

import java.time.LocalDate;

public record AnalyticDailyDTO(int dailyActivity, int dailyCalorieConsumption, LocalDate activityDate) {
}
