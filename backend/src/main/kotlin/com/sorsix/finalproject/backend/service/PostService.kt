package com.sorsix.finalproject.backend.service

import com.sorsix.finalproject.backend.domain.*
import org.springframework.web.multipart.MultipartFile

interface PostService {
    fun listAll(): List<Post>
    fun findByStatus(status: PostStatus): List<Post>
    fun findById(id: Long): Post?
    fun updateState(id: Long, newState: PostStatus): Post?
    fun deleteById(id: Long)
    fun create(title: String, category: Category, description: String, municipality: Municipality, image: MultipartFile, status: PostStatus): Post

    fun filter(title: String, category: Category?, municipality: Municipality?, status: PostStatus): List<Post>

    fun getPostImage(postId: Long): ByteArray
}