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
public class Calorie {

    public Calorie(FoodType foodType, int consumption, LocalDateTime mealDateTime, User user) {
        this.foodType = foodType;
        this.consumption = consumption;
        this.mealDateTime = mealDateTime;
        this.user = user;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private int consumption;
    private LocalDateTime mealDateTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "foodType_id")
    private FoodType foodType;





}

