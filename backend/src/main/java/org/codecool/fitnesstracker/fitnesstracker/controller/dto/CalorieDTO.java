package org.codecool.fitnesstracker.fitnesstracker.controller.dto;

import org.codecool.fitnesstracker.fitnesstracker.dao.model.CalorieType;

import java.time.LocalDateTime;

public record CalorieDTO(CalorieType calorieType, int consumption, LocalDateTime mealDateTime) {
}
