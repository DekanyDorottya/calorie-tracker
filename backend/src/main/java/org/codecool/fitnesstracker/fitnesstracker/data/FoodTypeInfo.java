package org.codecool.fitnesstracker.fitnesstracker.data;

import java.util.List;

public record FoodTypeInfo(String name,

                           Nutrition nutrition) {
    public static record Nutrition(List<Nutrients> nutrients) {
        public static record Nutrients(String name, double amount, String unit, Double percentOfDailyNeeds) {

        }

    }

}
