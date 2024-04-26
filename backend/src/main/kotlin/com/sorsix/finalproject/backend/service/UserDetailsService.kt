package com.sorsix.finalproject.backend.service

import com.sorsix.finalproject.backend.domain.exceptions.UserNotFoundException
import com.sorsix.finalproject.backend.repository.UserRepository
import com.sorsix.finalproject.backend.security.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service


@Service
class UserDetailsServiceImpl(private val repository: UserRepository) : UserDetailsService {
    override fun loadUserByUsername(email: String): UserDetails {
        val user: UserDetails? = repository.findByEmail(email)?.let { UserDetails(it) }
        if (user == null)
        {
            throw UserNotFoundException(
                String.format(
                    "User does not exist, email: %s",
                    email
                )
            )
        }

        return user
    }
}