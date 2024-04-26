package com.sorsix.finalproject.backend.domain

import java.time.LocalDateTime

class LoginAttempt (val email: String,
                    val success: Boolean,
                    val createdAt: LocalDateTime)