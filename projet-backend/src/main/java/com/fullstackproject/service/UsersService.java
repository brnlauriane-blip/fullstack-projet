package com.fullstackproject.service;

import com.fullstackproject.entity.Users;
import com.fullstackproject.repository.UsersRepository;
import com.fullstackproject.repository.UserTypesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UserTypesRepository userTypesRepository;

//Create Users (and save them)
    public Users save(Users users) {
        if (users.getUserTypes() != null && users.getUserTypes().getId() != null) {
            users.setUserTypes(userTypesRepository
                    .findById(users.getUserTypes().getId())
                    .orElse(null));
        }
        return usersRepository.save(users);
    }

//Delete Users
    public void deleteById(Integer id) {
        usersRepository.deleteById(id);
    }

// Find Users by last name, first name, email or id

    public List<Users> findAll() {
        return usersRepository.findAll();
    }

    public Optional<Users> findById(Integer id) {
        return usersRepository.findById(id);
    }

    public List<Users> getUsersByLastName(String lastName) {
        return usersRepository.findByLastName(lastName);
    }

    public List<Users> getUsersByFirstName(String firstName) {
        return usersRepository.findByFirstName(firstName);
    }
}
