package com.sorsix.finalproject.backend.api

import com.sorsix.finalproject.backend.authentication.service.HashService
import com.sorsix.finalproject.backend.domain.User
import com.sorsix.finalproject.backend.domain.dto.RegisterDto
import com.sorsix.finalproject.backend.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
@RequestMapping("/api")
class UserController(private val userService: UserService, private val hashService: HashService) {
    @GetMapping("/users/all")
    fun allUsers(): ResponseEntity<List<User>> {
        return ResponseEntity.ok(userService.listUsers())
    }

    @DeleteMapping("/users/{id}")
    fun deletePost(@PathVariable id: Long) = userService.deleteById(id)

    @PutMapping("/users/{id}")
    fun updateUser(
        @PathVariable id: Long,
        @RequestBody dto: RegisterDto
    ): ResponseEntity<User> {
        val user = userService.findById(id)
        var pass = dto.password
        pass = if (pass.isBlank())
            user!!.password
        else
            hashService.hashBcrypt(pass)
        userService.updateUserData(
            id = id,
            firstName = dto.firstName,
            lastName = dto.lastName,
            phoneNumber = dto.phoneNumber,
            password = pass
        )
        return ResponseEntity.ok(userService.findById(id)!!)
    }
}