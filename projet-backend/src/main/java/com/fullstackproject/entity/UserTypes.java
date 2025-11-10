package com.fullstackproject.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name="user_type")
@Data
public class UserTypes {

//Generer id lié au job position (PK)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="user_type")
    private String userTypes;
}
