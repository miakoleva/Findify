package com.sorsix.finalproject.backend.domain

import jakarta.persistence.*

@Entity
@Table(name = "comments")
data class Comment(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    val id: Long,
    @Column
    val comment: String,
    @ManyToOne
    @JoinColumn(name = "post_id")
    val post: Post
)


