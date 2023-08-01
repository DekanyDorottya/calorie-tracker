package org.codecool.fitnesstracker.fitnesstracker.service;

import org.codecool.fitnesstracker.fitnesstracker.controller.dto.ActivityDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.NewActivityDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ActivityService {
    private List<ActivityDTO> userActivity = new ArrayList<>();

    public List<ActivityDTO> getAllActivities() {
        return userActivity;
    }

    public void addNewActivity(NewActivityDTO activity) {
        LocalDateTime localDateTime = LocalDateTime.now();
        ActivityDTO addedActivity = new ActivityDTO(activity.activity(), activity.calories(), localDateTime);
        userActivity.add(addedActivity);
    }
}
