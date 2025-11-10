package com.fullstackproject.controller;

import com.fullstackproject.entity.Users;
import com.fullstackproject.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UsersController {
    @Autowired
    private UsersService usersService;

//Find users by id, last name, first name or email
    @GetMapping
    public List<Users> getAllUsers() {
        return usersService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Users> getUsersById(@PathVariable Integer id) {
        Optional<Users> users = usersService.findById(id);

        return users.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/lastname/{lastName}")
    public List<Users> getUsersByLastName(@PathVariable String lastName) {
        return usersService.getUsersByLastName(lastName);
    }

    @GetMapping("/firstname/{firstName}")
    public List<Users> getUsersByFirstName(@PathVariable String firstName) {
        return usersService.getUsersByFirstName(firstName);
    }

//Create users (and save them)
    @PostMapping
    public ResponseEntity<Users> createUsers(@RequestBody Users users) {
        Users savedUsers = usersService.save(users);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUsers);
    }

//Update users
    @PutMapping("/{id}")
    public ResponseEntity<Users> updateUsers(
            @PathVariable Integer id,
            @RequestBody Users users) {

        Optional<Users> existingUsers = usersService.findById(id);

        if (existingUsers.isPresent()) {
            users.setId(id);
            Users updatedUsers = usersService.save(users);
            return ResponseEntity.ok(updatedUsers);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

//Delete users
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsers(@PathVariable Integer id) {
        Optional<Users> users = usersService.findById(id);

        if (users.isPresent()) {
            usersService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
