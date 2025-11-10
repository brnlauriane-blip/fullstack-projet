package com.fullstackproject.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="users")
@Data
public class Users {

//Generer id de l'employé(PK)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="last_name")
    private String lastName;

    @Column(name="first_name")
    private String firstName;

    @Column(name="email")
    private String email;

//Relier les deux tableaux (FK)
    @ManyToOne
    @JoinColumn(name="user_type_id", nullable = false)
    private UserTypes userTypes;
}
