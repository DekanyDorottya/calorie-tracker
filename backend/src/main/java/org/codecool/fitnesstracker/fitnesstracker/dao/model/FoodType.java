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
    private int calories;
    private int protein;
    private int carbohydrate;
    private int fat;

    @OneToMany(mappedBy = "foodType", cascade = CascadeType.MERGE)
    private Set<Calorie> calorie = new HashSet<>();



}
