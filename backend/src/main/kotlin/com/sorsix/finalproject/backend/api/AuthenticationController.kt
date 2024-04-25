package com.sorsix.finalproject.backend.api

import com.sorsix.finalproject.backend.api.request.CreateUserRequest
import com.sorsix.finalproject.backend.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController


@CrossOrigin
@RestController
class AuthenticationController(
    private val userService: UserService
) {
    @PostMapping("/home/signup")
    fun signup(@RequestBody requestDto: CreateUserRequest): ResponseEntity<Void> {
        userService.signup(requestDto)
        return ResponseEntity.status(HttpStatus.CREATED).build()
    }
}