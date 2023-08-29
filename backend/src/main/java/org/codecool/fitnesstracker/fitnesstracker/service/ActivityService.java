package org.codecool.fitnesstracker.fitnesstracker.service;

import org.codecool.fitnesstracker.fitnesstracker.controller.dto.ActivityDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.NewActivityDTO;
import org.codecool.fitnesstracker.fitnesstracker.dao.model.Activity;
import org.codecool.fitnesstracker.fitnesstracker.dao.model.Calorie;
import org.codecool.fitnesstracker.fitnesstracker.user.User;
import org.codecool.fitnesstracker.fitnesstracker.repositories.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ActivityService {
    ActivityRepository activityRepository;

    UserService userService;
    @Autowired
    public ActivityService(ActivityRepository activityRepository, UserService userService) {
        this.activityRepository = activityRepository;
        this.userService = userService;
    }

    public List<ActivityDTO> getAllActivities(String jwtToken) {
        //String userEmail = userService.getEmailFromJwtToken(jwtToken);
        List<Activity> activityList = activityRepository.findByUserEmail("test@gmail.com");
        List<ActivityDTO> activityDTOS = new ArrayList<>();
        for (Activity activity : activityList) {
            activityDTOS.add(new ActivityDTO(activity.getActivityType(), activity.getCalories(), activity.getActivityDateTime()));
        }
        return activityDTOS;
    }

    public void addNewActivity(NewActivityDTO activity, String jwtToken) {
        LocalDateTime localDateTime = LocalDateTime.now();
        //String userEmail = userService.getEmailFromJwtToken(jwtToken);
        User user = userService.findUserByEmail("test@gmail.com");
        ActivityDTO addedActivity = new ActivityDTO(activity.activity(), activity.calories(), localDateTime);
        Activity newActivity = new Activity(addedActivity.activity(), addedActivity.calories(), localDateTime, user);
        activityRepository.save(newActivity);
    }
}
