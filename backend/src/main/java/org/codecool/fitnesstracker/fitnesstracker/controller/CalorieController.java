package org.codecool.fitnesstracker.fitnesstracker.controller;

import org.codecool.fitnesstracker.fitnesstracker.controller.dto.CalorieDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.NewCalorieDTO;
import org.codecool.fitnesstracker.fitnesstracker.service.CalorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("calories")
public class CalorieController {
    public final CalorieService calorieService;

    @Autowired
    public CalorieController(CalorieService calorieService) {
        this.calorieService = calorieService;
    }

    @GetMapping("/all")
    public List<CalorieDTO> getAllCalories() {
        return calorieService.getAllCalories();
    }

    @PostMapping("/")
    public void addNewMeal(@RequestBody NewCalorieDTO meal) {
        calorieService.addNewMeal(meal);
    }
}
