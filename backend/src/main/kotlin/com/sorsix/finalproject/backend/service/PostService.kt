package com.sorsix.finalproject.backend.service

import com.sorsix.finalproject.backend.domain.Post
import com.sorsix.finalproject.backend.domain.PostStatus

interface PostService {
    fun listAll(): List<Post>
    fun findByStatus(status: PostStatus): List<Post>
    fun findById(id: Long): Post?
    fun create(post: Post): Post
}