package org.codecool.fitnesstracker.fitnesstracker.controller.dto;

import java.time.LocalDate;

public record UserInfoDTO(String gender, int weight, int height,  LocalDate birthDate) {
}
