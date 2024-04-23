package com.sorsix.finalproject.backend.domain

import jakarta.persistence.*

@Entity
@Table(name = "categories")
data class Category(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    val id: Long,
    @Column(name = "name")
    val categoryName: String
)
