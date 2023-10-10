package org.codecool.fitnesstracker.fitnesstracker.controller.dto;

import org.codecool.fitnesstracker.fitnesstracker.dao.model.ActivityType;

import java.time.LocalDateTime;
import java.util.Objects;

public record ActivityDTO(ActivityType activityType, int calories, LocalDateTime activityDateTime) {
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ActivityDTO that = (ActivityDTO) o;
        return calories == that.calories && Objects.equals(activityType, that.activityType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(activityType, calories);
    }
}