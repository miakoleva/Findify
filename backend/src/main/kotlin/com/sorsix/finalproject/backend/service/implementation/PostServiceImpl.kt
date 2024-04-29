package com.sorsix.finalproject.backend.service.implementation

import com.sorsix.finalproject.backend.domain.Post
import com.sorsix.finalproject.backend.domain.PostStatus
import com.sorsix.finalproject.backend.repository.PostRepository
import com.sorsix.finalproject.backend.service.PostService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class PostServiceImpl(private val postRepository: PostRepository) : PostService {
    override fun listAll(): List<Post> = postRepository.findAll()
    override fun findByStatus(status: PostStatus): List<Post> = postRepository.findByState(status)
    override fun findById(id: Long): Post? = postRepository.findByIdOrNull(id)
    override fun create(post: Post): Post = postRepository.save(post)
}