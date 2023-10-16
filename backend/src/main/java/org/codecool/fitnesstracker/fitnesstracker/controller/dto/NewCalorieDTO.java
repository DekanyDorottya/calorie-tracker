package org.codecool.fitnesstracker.fitnesstracker.controller.dto;

import org.codecool.fitnesstracker.fitnesstracker.dao.model.FoodType;

public record NewCalorieDTO(FoodType foodType, int consumption) {
}
