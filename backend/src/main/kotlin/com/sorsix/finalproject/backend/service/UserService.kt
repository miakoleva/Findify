package com.sorsix.finalproject.backend.service

import com.sorsix.finalproject.backend.api.response.GetUserResponse
import com.sorsix.finalproject.backend.api.response.GetUserResponseFailed
import com.sorsix.finalproject.backend.api.response.GetUserResponseSuccess
import com.sorsix.finalproject.backend.domain.User
import org.springframework.security.core.context.SecurityContextHolder

interface UserService {
    fun findById(id: Long): User?

    fun findByEmail(email: String): User?

    fun existsByEmail(email: String): Boolean

    fun registerUser(firstName: String,lastName: String, email: String,  password: String, phoneNumber: String): User

    fun getLoggedInUser(): GetUserResponse {
        val username = SecurityContextHolder.getContext().authentication.name
        return when (val user = findByEmail(username)) {
            is User -> GetUserResponseSuccess(user)
            else -> GetUserResponseFailed("No user with that email")
        }
    }


}