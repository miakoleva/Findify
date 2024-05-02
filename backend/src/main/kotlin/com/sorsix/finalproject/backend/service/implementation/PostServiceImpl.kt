package com.sorsix.finalproject.backend.service.implementation

import com.sorsix.finalproject.backend.domain.*
import com.sorsix.finalproject.backend.repository.PostRepository
import com.sorsix.finalproject.backend.service.PostService
import com.sorsix.finalproject.backend.service.UserService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.ByteArrayInputStream

@Service
class PostServiceImpl(private val postRepository: PostRepository, private val userService: UserService) : PostService {
    override fun listAll(): List<Post> = postRepository.findAll()
    override fun findByStatus(status: PostStatus): List<Post> = postRepository.findByState(status)
    override fun findById(id: Long): Post? = postRepository.findByIdOrNull(id)

    override fun create(
        title: String,
        category: Category,
        description: String,
        municipality: Municipality,
        image: MultipartFile,
        status: PostStatus
    ): Post {
        val email = SecurityContextHolder.getContext().authentication.name
        val user = userService.findByEmail(email)
        val byteArr = image.bytes

        val post = Post(1L, status, title, byteArr, user!!, municipality, category, description)
        return this.postRepository.save(post)

    }

}