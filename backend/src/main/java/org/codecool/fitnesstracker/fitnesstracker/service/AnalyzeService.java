package org.codecool.fitnesstracker.fitnesstracker.service;

import org.codecool.fitnesstracker.fitnesstracker.controller.dto.AnalyticDailyDTO;
import org.codecool.fitnesstracker.fitnesstracker.dao.model.Calorie;
import org.codecool.fitnesstracker.fitnesstracker.dao.model.User;
import org.codecool.fitnesstracker.fitnesstracker.service.analytics.AnalyticDuration;
import org.codecool.fitnesstracker.fitnesstracker.service.analytics.WeeklyAnalytics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

@Service
public class AnalyzeService {
    ActivityService activityService;
    CalorieService calorieService;
    UserService userService;

    Set<AnalyticDuration> durations;

    @Autowired
    public AnalyzeService(ActivityService activityService, CalorieService calorieService, UserService userService) {
        this.activityService = activityService;
        this.calorieService = calorieService;
        this.userService = userService;
        durations = new HashSet<>();
        durations.add(new WeeklyAnalytics());
    }

    public List<AnalyticDailyDTO> listAnalyticForPeriod(String jwtToken, String duration){
        String userEmail = userService.getEmailFromJwtToken(jwtToken);
        User user = userService.findUserByEmail(userEmail);
        LocalDate startingDate = durations.stream()
                .filter(analyticDuration -> analyticDuration.getDuration()
                .equals(duration))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException(duration))
                .getStartingDate();

        List<Calorie> calorieList = calorieService.getCaloriesFromDate(startingDate);
        List<Activit>
    }
}
