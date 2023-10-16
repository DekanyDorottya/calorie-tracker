package org.codecool.fitnesstracker.fitnesstracker.data;

import java.util.List;

public record FoodTypeTotal(List<FoodTypeResult> results, int offset, int number, int totalResults) {
}
