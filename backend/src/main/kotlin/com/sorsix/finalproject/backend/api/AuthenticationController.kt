package com.sorsix.finalproject.backend.api

import com.sorsix.finalproject.backend.api.request.CreateUserRequest
import com.sorsix.finalproject.backend.api.request.LoginAttemptResponse
import com.sorsix.finalproject.backend.api.request.LoginRequest
import com.sorsix.finalproject.backend.api.request.LoginResponse
import com.sorsix.finalproject.backend.domain.LoginAttempt
import com.sorsix.finalproject.backend.repository.UserRepository
import com.sorsix.finalproject.backend.security.UserDetails
import com.sorsix.finalproject.backend.service.UserService
import com.sorsix.finalproject.backend.util.JwtUtil
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController


@CrossOrigin
@RestController
class AuthenticationController(
    private val userService: UserService,
    private val authenticationManager: AuthenticationManager,
    //private val loginService: LoginService,
    private val jwtUtil: JwtUtil,
    private val userRepository: UserRepository
) {
    @PostMapping("/home/signup")
    fun signup(@RequestBody requestDto: CreateUserRequest): ResponseEntity<Void> {
        userService.signup(requestDto)
        return ResponseEntity.status(HttpStatus.CREATED).build()
    }
//    @PostMapping("/home/login")
//    fun login(@RequestBody request: LoginRequest): ResponseEntity<LoginResponse> {
//        try {
//            authenticationManager.authenticate(UsernamePasswordAuthenticationToken(request.email, request.password))
//        } catch (e: BadCredentialsException) {
//            loginService.addLoginAttempt(request.email, false)
//            throw e
//        }
//
//        val user = userRepository.findByEmail(request.email)
//        val token: String = jwtUtil.generateToken(UserDetails(user!!))
//        loginService.addLoginAttempt(request.email, true)
//        return ResponseEntity.ok(LoginResponse(request.email, token))
//    }
//    private fun convertToDTOs(loginAttempts: List<LoginAttempt>): List<LoginAttemptResponse> {
//        val list = mutableListOf<LoginAttemptResponse>()
//        loginAttempts.forEach { loginAttempt ->
//            list.add(LoginAttemptResponse.convertToDTO(loginAttempt))
//        }
//        return list
//    }
}