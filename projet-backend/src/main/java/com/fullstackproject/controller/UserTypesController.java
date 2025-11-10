package com.fullstackproject.controller;

import com.fullstackproject.entity.UserTypes;
import com.fullstackproject.service.UserTypesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user-types")
@CrossOrigin(origins = "http://localhost:4200")
public class UserTypesController {

    @Autowired
    private UserTypesService userTypesService;

//FInd all user types and by id
    @GetMapping
    public List<UserTypes> getAllUserTypes() {
        return userTypesService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserTypes> getUserTypeById(@PathVariable Integer id) {
        Optional<UserTypes> userTypes = userTypesService.findById(id);

        return userTypes.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

//Create user types
    @PostMapping
    public ResponseEntity<UserTypes> createUserTypes(@RequestBody UserTypes userTypes) {
        UserTypes savedUserTypes = userTypesService.save(userTypes);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUserTypes);
    }

//Update user types
    @PutMapping("/{id}")
    public ResponseEntity<UserTypes> updateUserTypes(
            @PathVariable Integer id,
            @RequestBody UserTypes userTypes) {

        Optional<UserTypes> existingUserTypes = userTypesService.findById(id);

        if (existingUserTypes.isPresent()) {
            userTypes.setId(id);
            UserTypes updatedUserTypes = userTypesService.save(userTypes);
            return ResponseEntity.ok(updatedUserTypes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

//Delete user types
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserTypes(@PathVariable Integer id) {
        Optional<UserTypes> userTypes = userTypesService.findById(id);

        if (userTypes.isPresent()) {
            userTypesService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}