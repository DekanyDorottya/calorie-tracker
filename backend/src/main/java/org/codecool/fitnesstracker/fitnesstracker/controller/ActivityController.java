package org.codecool.fitnesstracker.fitnesstracker.controller;

import org.codecool.fitnesstracker.fitnesstracker.controller.dto.ActivityDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.NewActivityDTO;
import org.codecool.fitnesstracker.fitnesstracker.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("activities")
public class ActivityController {

    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/all")
    public List<ActivityDTO> getAllActivities( @RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        return activityService.getAllActivities(token);
    }

    @PostMapping("/")
    public ResponseEntity<NewActivityDTO> addNewActivity(@RequestBody NewActivityDTO activity,
                                                         @RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        System.out.println("Activity request arrived");
        activityService.addNewActivity(activity, token);
        return new ResponseEntity<>(activity, HttpStatus.CREATED);
    }

}
