package com.sorsix.finalproject.backend.repository

import com.sorsix.finalproject.backend.domain.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: JpaRepository<User, Long>{

    fun findByEmail(email: String?): User?
}