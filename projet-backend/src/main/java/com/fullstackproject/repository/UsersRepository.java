package com.fullstackproject.repository;

import com.fullstackproject.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {

    List<Users> findByLastName(String lastName);
    List<Users> findByFirstName(String firstName);
}
