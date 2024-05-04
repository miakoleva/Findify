package com.sorsix.finalproject.backend.service.implementation

import com.sorsix.finalproject.backend.authentication.service.HashService
import com.sorsix.finalproject.backend.domain.User
import com.sorsix.finalproject.backend.repository.UserRepository
import com.sorsix.finalproject.backend.service.UserService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class UserServiceImpl(
    private val userRepo: UserRepository,
    private val hashService: HashService
) : UserService {
    override fun findById(id: Long): User? = userRepo.findByIdOrNull(id)

    override fun findByEmail(email: String): User? = userRepo.findByEmail(email)

    override fun existsByEmail(email: String): Boolean = userRepo.existsByEmail(email)

    override fun listUsers(): List<User> = userRepo.findAll()

    override fun deleteById(id: Long) = userRepo.deleteById(id)

    override fun registerUser(
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        phoneNumber: String
    ): User = userRepo.save(
        User(
            id = 1L,
            firstName = firstName,
            lastName = lastName,
            email = email,
            password = hashService.hashBcrypt(password),
            phoneNumber = phoneNumber
        )
    )
}