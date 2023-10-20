package org.codecool.fitnesstracker.fitnesstracker.controller.dto;

import org.codecool.fitnesstracker.fitnesstracker.dao.model.FoodType;

import java.time.LocalDateTime;

public record NewCalorieDTO(long apiId, int consumption, LocalDateTime mealDateTime) {
}
