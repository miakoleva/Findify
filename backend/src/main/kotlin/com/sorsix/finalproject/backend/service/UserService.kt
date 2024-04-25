package com.sorsix.finalproject.backend.service

import com.sorsix.finalproject.backend.api.response.GetUserResponse
import com.sorsix.finalproject.backend.api.response.GetUserResponseFailed
import com.sorsix.finalproject.backend.api.response.GetUserResponseSuccess
import com.sorsix.finalproject.backend.domain.User
import com.sorsix.finalproject.backend.domain.exceptions.UserNotFoundException
import com.sorsix.finalproject.backend.repository.UserRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
    val userRepository: UserRepository,
    val passwordEncoder: PasswordEncoder
) {

    val logger: Logger = LoggerFactory.getLogger(UserService::class.java)

    fun getUserById(id: Long): User{
        return this.userRepository.findByIdOrNull(id) ?: throw UserNotFoundException("User with id $id is not found.")
    }

    fun getUserByEmail(email: String): User?{
        return this.userRepository.findByEmail(email)
    }

    fun getLoggedInUser(): GetUserResponse{
        val username = SecurityContextHolder.getContext().authentication.name
        return when (val user = getUserByEmail(username)){
            is User -> GetUserResponseSuccess(user)
            else -> GetUserResponseFailed("No user found with that email")
        }
    }
}