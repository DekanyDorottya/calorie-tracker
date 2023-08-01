package org.codecool.fitnesstracker.fitnesstracker.controller.dto;

import java.time.LocalDateTime;

public record ActivityDTO(String activity, int calories, LocalDateTime activityDateTime) {}

