package org.codecool.fitnesstracker.fitnesstracker.service;

import org.codecool.fitnesstracker.fitnesstracker.controller.dto.CalorieDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.NewCalorieDTO;
import org.codecool.fitnesstracker.fitnesstracker.dao.model.Calorie;
import org.codecool.fitnesstracker.fitnesstracker.dao.model.CalorieRepository;
import org.codecool.fitnesstracker.fitnesstracker.dao.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CalorieService {
    private final CalorieRepository calorieRepository;
    private final UserService userService;

    @Autowired
    public CalorieService(CalorieRepository calorieRepository, UserService userService) {
        this.calorieRepository = calorieRepository;
        this.userService = userService;
    }

    public List<CalorieDTO> getAllCalories() {
        return null;
    }

    public void addNewMeal(NewCalorieDTO meal, String jwtToken) {
        LocalDateTime localDateTime = LocalDateTime.now();
        String userEmail = userService.getEmailFromJwtToken(jwtToken);
        User user = userService.findUserByEmail(userEmail);
        CalorieDTO calorieDTO = new CalorieDTO(meal.foodType(), meal.calories(), localDateTime);
        Calorie newCalorie = new Calorie(calorieDTO.foodType(), calorieDTO.calories(), localDateTime, user);
        calorieRepository.save(newCalorie);
    }

    /*public List<Calorie> getCaloriesByUserEmail() {
        String dummyEmail = "";
        Long userId = userService.findByEmail(dummyEmail);
        return calorieRepository.findByUserId(userId);
    }*/
}
