package org.codecool.fitnesstracker.fitnesstracker.controller.dto;

import java.time.LocalDateTime;

public record NewUserDTO(String userName, String email, String password) {
}
