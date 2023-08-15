package org.codecool.fitnesstracker.fitnesstracker.dao.model;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.bind.annotation.Mapping;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Calorie {

    public Calorie(String foodType, int calories, LocalDateTime mealDateTime, User user) {
        this.foodType = foodType;
        this.calories = calories;
        this.mealDateTime = mealDateTime;
        this.user = user;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String foodType;
    private int calories;
    private LocalDateTime mealDateTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;





}

