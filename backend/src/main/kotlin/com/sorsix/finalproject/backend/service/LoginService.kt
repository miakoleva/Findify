package com.sorsix.finalproject.backend.service

import com.sorsix.finalproject.backend.domain.LoginAttempt
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service
import java.time.LocalDateTime


//@Service
//@Transactional
//class LoginService(private val repository: LoginAttemptRepository) {
//
//    @Transactional
//    fun addLoginAttempt(email: String?, success: Boolean) {
//        val loginAttempt = LoginAttempt(email!!, success, LocalDateTime.now())
//        repository.save(loginAttempt)
//    }
//
////    fun findRecentLoginAttempts(email: String?): List<LoginAttempt> {
////        return repository.findRecent(email)
////    }
//}