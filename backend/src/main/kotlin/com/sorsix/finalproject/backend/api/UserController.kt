package com.sorsix.finalproject.backend.api

import com.sorsix.finalproject.backend.api.response.GetUserResponse
import com.sorsix.finalproject.backend.api.response.GetUserResponseFailed
import com.sorsix.finalproject.backend.api.response.GetUserResponseSuccess
import com.sorsix.finalproject.backend.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin
@RequestMapping("/api/user")
class UserController (private val userService: UserService) {

    @GetMapping("/get")
    fun getUser(): ResponseEntity<GetUserResponse> = when (val user = userService.getLoggedInUser()) {
        is GetUserResponseSuccess -> ResponseEntity.ok(user)
        is GetUserResponseFailed -> ResponseEntity.badRequest().body(user)
    }

}