package org.codecool.fitnesstracker.fitnesstracker.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.NewUserDTO;
import org.codecool.fitnesstracker.fitnesstracker.controller.dto.UserDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserService {
    List<UserDTO> users = new ArrayList<>();
    @Value("${jwt.secret}")
    private String jwtSecret;
    @Value("${jwt.expiration}")
    private int jwtExpiration;

    public List<UserDTO> getAllUsers() {
        return users;
    }

    public boolean addNewUser(NewUserDTO newUser) {
        LocalDateTime localDateTime = LocalDateTime.now();
        boolean check = users.stream().noneMatch(userDTO -> userDTO.email().equals(newUser.email()));
        if (check) {
            UserDTO userDTO = new UserDTO(newUser.userName(), newUser.email(), newUser.password(), localDateTime);
            users.add(userDTO);
            return true;
        }
        return false;
    }

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
        UserDTO user = users.stream()
                .filter(u -> u.email().equals(email) && u.password().equals(password))
                .findFirst()
                .orElse(null);

        return user;
    }
    public String getEmailFromJwtToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

}
