package com.sorsix.finalproject.backend.domain

import jakarta.persistence.*

@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    val id: Long,
    @Column(name = "name")
    val firstName: String,
    @Column(name = "surname")
    val lastName: String,
    @Column(name = "phone_number")
    val phoneNumber: String,
    @Column
    val email: String,
    @Column
    val password: String,
    @Enumerated(EnumType.STRING)
    @Column
    val role: Role
)
