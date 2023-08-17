package org.codecool.fitnesstracker.fitnesstracker.controller.dto;

import java.time.LocalDateTime;
import java.util.List;

public record CalorieForAnalyticsDTO(int calorie, LocalDateTime consumptionTime) {
}
