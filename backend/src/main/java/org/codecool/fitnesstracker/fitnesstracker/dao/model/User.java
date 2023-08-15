package org.codecool.fitnesstracker.fitnesstracker.dao.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {

    public User(String username, String email, String password, LocalDateTime registrationTime) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.registrationTime = registrationTime;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    private LocalDateTime registrationTime;

    @OneToMany(cascade = CascadeType.MERGE)
    @JoinColumn(name = "calorie_id", referencedColumnName = "id")
    private List<Calorie> calories = new ArrayList<>();
}
