package org.codecool.fitnesstracker.fitnesstracker.service;

import org.codecool.fitnesstracker.fitnesstracker.controller.dto.NewUserDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    List<UserDTO> users = new ArrayList<>();

    public List<UserDTO> getAllUsers() {
        return users;
    }

    public boolean addNewUser(NewUserDTO newUser) {
        LocalDateTime localDateTime = LocalDateTime.now();
        boolean check = users.stream().noneMatch(userDTO -> userDTO.userName().equals(newUser.userName()));
        if (check) {
            UserDTO userDTO = new UserDTO(newUser.userName(), newUser.email(), newUser.password(), localDateTime);
            users.add(userDTO);
            return true;
        }
        return false;
    }


}
