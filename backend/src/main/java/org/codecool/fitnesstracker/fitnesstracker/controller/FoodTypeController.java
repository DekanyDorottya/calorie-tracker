package org.codecool.fitnesstracker.fitnesstracker.controller;

import org.codecool.fitnesstracker.fitnesstracker.controller.dto.FoodTypeDTO;
import org.codecool.fitnesstracker.fitnesstracker.service.FoodTypeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("foodtype")
public class FoodTypeController {
    public final FoodTypeService foodTypeService;

    public FoodTypeController(FoodTypeService foodTypeService) {
        this.foodTypeService = foodTypeService;
    }

    @GetMapping("/search")
    public List<FoodTypeDTO> getAllFoodType (@RequestParam String foodType) {
        return foodTypeService.getSearchedFoodType(foodType);
    }

}
