package com.sorsix.finalproject.backend.domain

data class User(
    val id: Long,
    val firstName: String,
    val lastName: String,
    val phoneNumber: String,
    val email: String,
    val password: String,
    val role: Role
)
