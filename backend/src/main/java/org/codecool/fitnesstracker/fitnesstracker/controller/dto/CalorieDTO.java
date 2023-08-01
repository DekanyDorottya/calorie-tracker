package org.codecool.fitnesstracker.fitnesstracker.controller.dto;

import java.time.LocalDateTime;

public record CalorieDTO(int calories, LocalDateTime mealDateTime) {
}
