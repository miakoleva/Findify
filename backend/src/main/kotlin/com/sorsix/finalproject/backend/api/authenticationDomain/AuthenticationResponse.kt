package com.sorsix.finalproject.backend.api.authenticationDomain

import java.util.Date

data class AuthenticationResponse(val jwt: String, val expiresIn: Date)
