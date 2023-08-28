package org.codecool.fitnesstracker.fitnesstracker.service;

import org.codecool.fitnesstracker.fitnesstracker.controller.dto.CalorieDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.CalorieForAnalyticsDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.NewCalorieDTO;
import org.codecool.fitnesstracker.fitnesstracker.dao.model.Calorie;
import org.codecool.fitnesstracker.fitnesstracker.repositories.CalorieRepository;
import org.codecool.fitnesstracker.fitnesstracker.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
//        String userEmail = userService.getEmailFromJwtToken(jwtToken);
//        List<Calorie> calorieList = calorieRepository.findByUserEmail(userEmail);
//        List<CalorieDTO> calorieDTOS = new ArrayList<>();
//
//        for (Calorie calorie : calorieList) {
//            calorieDTOS.add(new CalorieDTO(calorie.getFoodType(),calorie.getCalories(), calorie.getMealDateTime()));
//        }
//        return calorieDTOS;
        return null;
    }

    public void addNewMeal(NewCalorieDTO meal) {
//        LocalDateTime localDateTime = LocalDateTime.now();
//        String userEmail = userService.getEmailFromJwtToken(jwtToken);
//        User user = userService.findUserByEmail(userEmail);
//        CalorieDTO calorieDTO = new CalorieDTO(meal.foodType(), meal.calories(), localDateTime);
//        Calorie newCalorie = new Calorie(calorieDTO.foodType(), calorieDTO.calories(), localDateTime, user);
//        calorieRepository.save(newCalorie);
        System.out.println("added new meal");
    }

    public List<CalorieForAnalyticsDTO> getCalorieFromDate(LocalDate startingDate, User user) {
        LocalTime startTime = LocalTime.MIDNIGHT;
        LocalDateTime startOfDay = LocalDateTime.of(startingDate, startTime);
        List<Calorie> calories = calorieRepository.findByUserAndMealDateTimeAfter(user, startOfDay);

        return calories.stream()
                .map(calorie -> new CalorieForAnalyticsDTO(calorie.getCalories(), calorie.getMealDateTime()))
                .toList();
    }

}
