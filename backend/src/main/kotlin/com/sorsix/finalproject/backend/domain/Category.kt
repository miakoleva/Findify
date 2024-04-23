package com.sorsix.finalproject.backend.domain

import jakarta.persistence.*

data class Category(
    val id: Long,
    val categoryName: String
)
