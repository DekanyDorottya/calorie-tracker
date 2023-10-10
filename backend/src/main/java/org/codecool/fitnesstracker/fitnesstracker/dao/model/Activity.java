package org.codecool.fitnesstracker.fitnesstracker.dao.model;

import jakarta.persistence.*;
import lombok.*;
import org.codecool.fitnesstracker.fitnesstracker.user.User;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Activity {

    public Activity(ActivityType activityType, int calories, LocalDateTime activityDateTime, User user) {
        this.activityType = activityType;
        this.calories = calories;
        this.activityDateTime = activityDateTime;
        this.user = user;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int calories;
    private LocalDateTime activityDateTime;

    @ManyToOne
    private User user;

    @ManyToOne
    private ActivityType activityType;
}
