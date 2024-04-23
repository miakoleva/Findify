package com.sorsix.finalproject.backend.domain

import jakarta.persistence.Entity


//@Entity
//@Table
data class Comment(
//    @Column(name = 'id')
    val id: Long,
    val comment: String,
//    @ManyToOne
//    @JoinColumn(name = 'post_id')
//    val post: Post
)



