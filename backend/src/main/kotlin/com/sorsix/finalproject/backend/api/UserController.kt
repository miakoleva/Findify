package com.sorsix.finalproject.backend.api

import com.sorsix.finalproject.backend.authentication.service.HashService
import com.sorsix.finalproject.backend.domain.User
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
        @RequestParam(required = false) firstName: String?,
        @RequestParam(required = false) lastName: String?,
        @RequestParam(required = false) phoneNumber: String?,
        @RequestParam(required = false) password: String?,
    ): ResponseEntity<User> {
        val user = userService.findById(id)
        var fName = firstName
        var lName = lastName
        var number = phoneNumber
        var pass = password
        if (firstName == null)
            fName = user!!.firstName
        if (lastName == null)
            lName = user!!.lastName
        if (password == null)
            pass = user!!.password
        if (phoneNumber == null)
            number = user!!.phoneNumber

        userService.updateUserData(
            id = id,
            firstName = fName!!,
            lastName = lName!!,
            phoneNumber = number!!,
            password = hashService.hashBcrypt(pass!!)
        )
        return ResponseEntity.ok(userService.findById(id)!!)
    }
}