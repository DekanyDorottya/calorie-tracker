package org.codecool.fitnesstracker.fitnesstracker.service;

import org.codecool.fitnesstracker.fitnesstracker.controller.dto.ActivityDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.CalorieDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.NewActivityDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.NewCalorieDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CalorieService {
    private List<CalorieDTO> userCalories = new ArrayList<>();

    public List<CalorieDTO> getAllCalories() {
        return userCalories;
    }

    public NewCalorieDTO addNewMeal(NewCalorieDTO meal) {
        LocalDateTime localDateTime = LocalDateTime.now();
        CalorieDTO calorieDTO = new CalorieDTO(meal.foodType(),meal.calories(), localDateTime);
        userCalories.add(calorieDTO);
        return meal;
    }


}
