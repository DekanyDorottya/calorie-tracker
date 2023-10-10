package org.codecool.fitnesstracker.fitnesstracker.controller.dto;

import org.codecool.fitnesstracker.fitnesstracker.dao.model.ActivityType;

import java.time.LocalDateTime;

public record NewActivityDTO(ActivityType activityType, int calories) {
}
