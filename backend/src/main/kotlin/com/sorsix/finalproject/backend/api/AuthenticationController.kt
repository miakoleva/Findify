package com.sorsix.finalproject.backend.api

import com.sorsix.finalproject.backend.service.UserService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController

@CrossOrigin
@RestController
class AuthenticationController(
    private val userService: UserService
) {
}