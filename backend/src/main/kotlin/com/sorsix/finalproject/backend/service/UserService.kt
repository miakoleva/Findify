package com.sorsix.finalproject.backend.service

<<<<<<< HEAD

=======
>>>>>>> fb902804a3191b9fa1c3cad96909fb69cc3c50d6
import com.sorsix.finalproject.backend.domain.User
import org.springframework.security.core.context.SecurityContextHolder

interface UserService {
    fun findById(id: Long): User?

    fun findByEmail(email: String): User?

    fun existsByEmail(email: String): Boolean

    fun registerUser(firstName: String,lastName: String, email: String,  password: String, phoneNumber: String): User

<<<<<<< HEAD


=======
>>>>>>> fb902804a3191b9fa1c3cad96909fb69cc3c50d6

}