package org.codecool.fitnesstracker.fitnesstracker.dao.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ActivityType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    String activityType;
    private int calories;

    @OneToMany(mappedBy = "activityType", cascade = CascadeType.MERGE)
    private Set<Activity> activities = new HashSet<>();
}
