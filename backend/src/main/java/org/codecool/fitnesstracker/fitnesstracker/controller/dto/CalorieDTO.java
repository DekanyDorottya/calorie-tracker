package org.codecool.fitnesstracker.fitnesstracker.controller.dto;

import java.time.LocalDateTime;

public record CalorieDTO(String foodType, int calories, LocalDateTime mealDateTime) {
}
