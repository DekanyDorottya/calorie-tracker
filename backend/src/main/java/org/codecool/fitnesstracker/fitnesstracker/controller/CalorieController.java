package org.codecool.fitnesstracker.fitnesstracker.controller;

import org.codecool.fitnesstracker.fitnesstracker.service.CaloryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("calories")
public class CalorieController {
    public final CaloryService caloryService;

    @Autowired
    public CalorieController(CaloryService caloryService) {
        this.caloryService = caloryService;
    }
}
