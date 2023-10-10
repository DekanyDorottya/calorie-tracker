package org.codecool.fitnesstracker.fitnesstracker.controller.dto;

import org.codecool.fitnesstracker.fitnesstracker.dao.model.CalorieType;

public record NewCalorieDTO(CalorieType calorieType, int consumption) {
}
