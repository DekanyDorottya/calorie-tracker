package org.codecool.fitnesstracker.fitnesstracker.controller.dto;

import org.codecool.fitnesstracker.fitnesstracker.dao.model.FoodType;

import java.time.LocalDateTime;

public record CalorieDTO(FoodType foodType, int consumption, LocalDateTime mealDateTime) {
}
