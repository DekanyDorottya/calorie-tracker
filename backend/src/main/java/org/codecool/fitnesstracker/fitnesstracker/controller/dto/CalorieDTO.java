package org.codecool.fitnesstracker.fitnesstracker.controller.dto;

import org.codecool.fitnesstracker.fitnesstracker.dao.model.FoodType;

import java.time.LocalDateTime;

public record CalorieDTO(String FoodType, double calorie, double carbohydrate, double protein, double fat, int consumption, LocalDateTime mealDateTime) {
}
