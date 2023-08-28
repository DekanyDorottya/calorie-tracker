package org.codecool.fitnesstracker.fitnesstracker.service;

import org.codecool.fitnesstracker.fitnesstracker.auth.AuthenticationService;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.UserDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.UserInfoDTO;
import org.codecool.fitnesstracker.fitnesstracker.user.User;
import org.codecool.fitnesstracker.fitnesstracker.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    UserRepository userRepository;
    private final AuthenticationService authenticationService;

    @Autowired
    public UserService(UserRepository userRepository, AuthenticationService authenticationService) {
        this.userRepository = userRepository;
        this.authenticationService = authenticationService;
    }

    List<UserDTO> users = new ArrayList<>();
    @Value("${jwt.secret}")
    private String jwtSecret;
    @Value("${jwt.expiration}")
    private int jwtExpiration;

    public List<UserDTO> getAllUsers() {
        return users;
    }


    @Transactional
    public void addUserInfo(UserInfoDTO userInfo) {
        User authenticatedUser = authenticationService.getAuthenticatedUser();
        if (authenticatedUser != null) {
            authenticatedUser.setGender(userInfo.gender());
            authenticatedUser.setHeight(userInfo.height());
            authenticatedUser.setWeight(userInfo.weight());
            authenticatedUser.setBirthDate(userInfo.birthDate());
            userRepository.save(authenticatedUser);
        } else {
            // Handle unauthenticated user
        }
    }
}
