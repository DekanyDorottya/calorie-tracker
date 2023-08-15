package org.codecool.fitnesstracker.fitnesstracker.controller;

import org.codecool.fitnesstracker.fitnesstracker.controller.dto.CalorieDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.NewCalorieDTO;
import org.codecool.fitnesstracker.fitnesstracker.service.CalorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        System.out.println("get request arrived");

        return calorieService.getAllCalories();
    }

    @PostMapping("/")
    public ResponseEntity<NewCalorieDTO> addNewMeal(
            @RequestBody NewCalorieDTO meal,
            @RequestHeader("Authorization") String authorizationHeader) {
        System.out.println("request arrived");
        String token = authorizationHeader.replace("Bearer ", "");
        calorieService.addNewMeal(meal, token);
        return new ResponseEntity<>(meal, HttpStatus.CREATED);
    }
}
