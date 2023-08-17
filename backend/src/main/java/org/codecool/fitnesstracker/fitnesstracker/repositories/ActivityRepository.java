package org.codecool.fitnesstracker.fitnesstracker.repositories;

import org.codecool.fitnesstracker.fitnesstracker.dao.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByUserEmail(String userEmail);
}
