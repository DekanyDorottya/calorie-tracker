package org.codecool.fitnesstracker.fitnesstracker.controller;

import org.codecool.fitnesstracker.fitnesstracker.controller.dto.NewUserDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.UserDTO;
import org.codecool.fitnesstracker.fitnesstracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {

    public final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/")
    public boolean addNewUser(@RequestBody NewUserDTO user) {
        System.out.println("new user registration");
        return userService.addNewUser(user);
    }

    @GetMapping("/login")
    public String loginUser(@RequestParam String email, @RequestParam String password) {
        System.out.println(email + " " + password);
        UserDTO user = userService.authenticateUser(email, password);

        if (user != null) {
            String jwtToken = userService.generateJwtToken(email);
            return jwtToken;
        } else {
            return "Invalid credentials.";
        }
    }
}
