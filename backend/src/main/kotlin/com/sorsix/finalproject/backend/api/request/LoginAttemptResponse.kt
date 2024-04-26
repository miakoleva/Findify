package com.sorsix.finalproject.backend.api.request

import com.sorsix.finalproject.backend.domain.LoginAttempt
import java.time.LocalDateTime


@JvmRecord
data class LoginAttemptResponse(
    val createdAt: LocalDateTime,
    val success: Boolean
) {
    companion object {
        fun convertToDTO(loginAttempt: LoginAttempt): LoginAttemptResponse {
            return LoginAttemptResponse(loginAttempt.createdAt, loginAttempt.success)
        }
    }
}