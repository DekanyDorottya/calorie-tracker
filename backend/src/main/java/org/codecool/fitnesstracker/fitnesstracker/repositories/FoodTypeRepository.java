package org.codecool.fitnesstracker.fitnesstracker.repositories;

import org.codecool.fitnesstracker.fitnesstracker.dao.model.FoodType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FoodTypeRepository extends JpaRepository<FoodType, Long> {
    List<FoodType> findCalorieTypeByFoodTypeIsLikeIgnoreCase(String foodType);
    FoodType findFoodTypeByApiId(long apiId);
}
