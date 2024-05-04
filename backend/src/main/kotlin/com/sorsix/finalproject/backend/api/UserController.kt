package com.sorsix.finalproject.backend.api

import com.sorsix.finalproject.backend.domain.User
import com.sorsix.finalproject.backend.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
@RequestMapping("/api")
class UserController (private val userService: UserService) {
    @GetMapping("/users/all")
    fun allUsers(): ResponseEntity<List<User>> {
        return ResponseEntity.ok(userService.listUsers())
    }
    @DeleteMapping("/users/{id}")
    fun deletePost(@PathVariable id: Long) = userService.deleteById(id)
}