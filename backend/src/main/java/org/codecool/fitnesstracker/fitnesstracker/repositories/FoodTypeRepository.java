package org.codecool.fitnesstracker.fitnesstracker.repositories;

import org.codecool.fitnesstracker.fitnesstracker.dao.model.CalorieType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodTypeRepository extends JpaRepository<CalorieType, Long> {
    List<CalorieType> findCalorieTypeByFoodTypeIsLikeIgnoreCase(String foodType);
}
