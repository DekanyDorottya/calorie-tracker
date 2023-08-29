package org.codecool.fitnesstracker.fitnesstracker.controller;

import org.codecool.fitnesstracker.fitnesstracker.controller.dto.ActivityDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.NewActivityDTO;
import org.codecool.fitnesstracker.fitnesstracker.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
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
    public List<ActivityDTO> getAllActivities(@CurrentSecurityContext(expression = "authentication")
                                 Authentication authentication) {
        System.out.println(authentication.getName());
        return activityService.getAllActivities(authentication.getName());
    }

    @PostMapping("/")
    public ResponseEntity<NewActivityDTO> addNewActivity(@RequestBody NewActivityDTO activity,
                                                         @RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        System.out.println("Activity request arrived");
        activityService.addNewActivity(activity);
        return new ResponseEntity<>(activity, HttpStatus.CREATED);
    }

}
