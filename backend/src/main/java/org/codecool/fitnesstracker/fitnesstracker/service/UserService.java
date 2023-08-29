package org.codecool.fitnesstracker.fitnesstracker.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.NewUserDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.UserDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.UserInfoDTO;
import org.codecool.fitnesstracker.fitnesstracker.user.User;
import org.codecool.fitnesstracker.fitnesstracker.exceptions.InvalidCredentialsException;
import org.codecool.fitnesstracker.fitnesstracker.user.UserRepository;
import org.codecool.fitnesstracker.fitnesstracker.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    UserRepository userRepository;
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    List<UserDTO> users = new ArrayList<>();
    @Value("${jwt.secret}")
    private String jwtSecret;
    @Value("${jwt.expiration}")
    private int jwtExpiration;

    public List<UserDTO> getAllUsers() {
        return users;
    }

    /*public boolean addNewUser(NewUserDTO newUser) {
        LocalDateTime localDateTime = LocalDateTime.now();
        Optional<User> optionalUser = userRepository.findByEmail(newUser.email());
        if(optionalUser.isPresent()) {
            return false;
        }
        userRepository.save(new User(newUser.userName(), newUser.email(), newUser.password(), localDateTime));
        return true;
    }*/

    public String generateJwtToken(String email) {
        LocalDateTime now = LocalDateTime.now();
        Date issuedAt = java.sql.Timestamp.valueOf(now);
        Date expiration = java.sql.Timestamp.valueOf(now.plusMinutes(jwtExpiration));

        return Jwts.builder()
                .setSubject(email)
                .claim("email", email)
                .setIssuedAt(issuedAt)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public UserDTO authenticateUser(String email, String password) {
        Optional<User> optionalUser = userRepository.findUserByEmailAndPassword(email, password);
        if(optionalUser.isEmpty()) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        return new UserDTO(optionalUser.get().getUsername(), optionalUser.get().getEmail(), optionalUser.get().getPassword(), optionalUser.get().getRegistrationTime());
    }
    public String getEmailFromJwtToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public User findUserByEmail(String userEmail) {
        Optional<User> optionalUser = userRepository.findByEmail(userEmail);
        if(optionalUser.isEmpty()) {
            throw new UserNotFoundException("User with this email does not exist" + userEmail);
        }
        return optionalUser.get();
    }

    @Transactional
    public void addUserInfo(String jwtToken, UserInfoDTO userInfo) {
        String userEmail = getEmailFromJwtToken(jwtToken);
        User user = findUserByEmail(userEmail);
        user.setGender(userInfo.gender());
        user.setHeight(userInfo.height());
        user.setWeight(userInfo.weight());
        user.setBirthDate(userInfo.birthDate());
    }
}
