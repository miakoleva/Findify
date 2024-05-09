package com.sorsix.finalproject.backend.repository

import com.sorsix.finalproject.backend.domain.User
import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String?): User?
    fun existsByEmail(email: String): Boolean
    override fun findAll():List<User>
    override fun deleteById(id: Long)
    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.firstName = :firstName, u.lastName = :lastName, u.phoneNumber = :phoneNumber, u.password = :password WHERE u.id = :id")
    fun updateUserData(id: Long, firstName: String, lastName: String, phoneNumber: String, password: String)
}