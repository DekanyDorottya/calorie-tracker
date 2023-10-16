package org.codecool.fitnesstracker.fitnesstracker.service;

import org.codecool.fitnesstracker.fitnesstracker.controller.dto.FoodTypeDTO;
import org.codecool.fitnesstracker.fitnesstracker.dao.model.FoodType;
import org.codecool.fitnesstracker.fitnesstracker.repositories.FoodTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FoodTypeService {

    public static final char PERCENTAGE_SYMBOL = '%';
    FoodTypeRepository foodTypeRepository;

    @Autowired
    public FoodTypeService(FoodTypeRepository foodTypeRepository) {
        this.foodTypeRepository = foodTypeRepository;
    }

    public List<FoodTypeDTO> getSearchedFoodType(String foodType) {
        List<FoodType> foodTypeList = foodTypeRepository.findCalorieTypeByFoodTypeIsLikeIgnoreCase(foodType + PERCENTAGE_SYMBOL);

        List<FoodTypeDTO> foodTypeDTOS = new ArrayList<>();
        for(FoodType calorieType : foodTypeList) {
            foodTypeDTOS.add(new FoodTypeDTO(calorieType.getCalories(), calorieType.getProtein(), calorieType.getCarbohydrate(), calorieType.getFat()));
        }
        return foodTypeDTOS;
    }
}
