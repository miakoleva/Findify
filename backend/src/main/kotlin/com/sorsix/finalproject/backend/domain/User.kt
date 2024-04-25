package com.sorsix.finalproject.backend.domain

import jakarta.persistence.*

@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    val id: Long,
    @Column(name="first_name")
    val firstName: String,
    @Column(name = "last_name")
    val lastName: String,
    @Column(name = "phone_number")
    val phoneNumber: String,
    @Column
    val email: String,
    @Column
    val password: String,
    @Enumerated(EnumType.STRING)
    @Column(name = "user_role")
    val role: Role
)
