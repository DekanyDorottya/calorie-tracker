package org.codecool.fitnesstracker.fitnesstracker.dao.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CalorieRepository extends JpaRepository<Calorie, Long> {
    List<Calorie> findByUserEmail(String email);
}
