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
public class FoodType {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String foodType;
    private double calories;
    private double protein;
    private double carbohydrate;
    private double fat;

    public FoodType(String foodType, double calories, double protein, double carbohydrate, double fat) {
        this.foodType = foodType;
        this.calories = calories;
        this.protein = protein;
        this.carbohydrate = carbohydrate;
        this.fat = fat;
    }

    @OneToMany(mappedBy = "foodType", cascade = CascadeType.MERGE)
    private Set<Calorie> calorie = new HashSet<>();



}
