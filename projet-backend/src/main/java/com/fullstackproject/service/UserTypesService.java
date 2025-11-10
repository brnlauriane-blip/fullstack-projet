package com.fullstackproject.service;

import com.fullstackproject.entity.UserTypes;
import com.fullstackproject.repository.UserTypesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserTypesService {

    @Autowired
    private UserTypesRepository userTypesRepository;

//Save user types
    public UserTypes save(UserTypes userTypes) {
        return userTypesRepository.save(userTypes);
    }

//Find user types
    public List<UserTypes> findAll() {
        return userTypesRepository.findAll();
    }

    public Optional<UserTypes> findById(Integer id) {
        return userTypesRepository.findById(id);
    }

//Delete user types
    public void deleteById(Integer id) {
        userTypesRepository.deleteById(id);
    }
}
