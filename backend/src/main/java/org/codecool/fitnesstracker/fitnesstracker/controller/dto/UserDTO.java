package org.codecool.fitnesstracker.fitnesstracker.controller.dto;

import java.time.LocalDateTime;

public record UserDTO(String userName, String email, String password, LocalDateTime registrationTime) {
}
