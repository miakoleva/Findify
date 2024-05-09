package com.sorsix.finalproject.backend.service


import com.sorsix.finalproject.backend.domain.User

interface UserService {
    fun findById(id: Long): User?

    fun findByEmail(email: String): User?

    fun existsByEmail(email: String): Boolean

    fun registerUser(firstName: String,lastName: String, email: String,  password: String, phoneNumber: String): User

    fun listUsers(): List<User>

    fun deleteById(id: Long)

    fun updateUserData(id: Long, firstName: String, lastName: String, phoneNumber: String, password: String)

}