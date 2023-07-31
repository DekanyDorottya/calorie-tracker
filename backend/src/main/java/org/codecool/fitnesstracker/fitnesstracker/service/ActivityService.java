package org.codecool.fitnesstracker.fitnesstracker.service;

import org.codecool.fitnesstracker.fitnesstracker.controller.dto.ActivityDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ActivityService {
    private List<ActivityDTO> userActivity = new ArrayList<>();
    public List<ActivityDTO> getAllActivities() {
        return userActivity;
    }
}
