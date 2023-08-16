package org.codecool.fitnesstracker.fitnesstracker.repositories;

import org.codecool.fitnesstracker.fitnesstracker.dao.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByEmail(String email);

    Optional<User> findUserByEmailAndPassword(String email, String password);
}
