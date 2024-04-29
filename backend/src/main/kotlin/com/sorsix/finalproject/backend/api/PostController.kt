package com.sorsix.finalproject.backend.api

import com.sorsix.finalproject.backend.domain.Post
import com.sorsix.finalproject.backend.domain.PostStatus
import com.sorsix.finalproject.backend.domain.dto.PostDto
import com.sorsix.finalproject.backend.service.PostService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI


@RestController
@RequestMapping("/api")
class PostController (private val postService: PostService) {

    @GetMapping("/lost-items")
    fun getLostItems(): ResponseEntity<List<Post>> {
        return ResponseEntity.ok(postService.findByStatus(PostStatus.ACTIVE_LOST))
    }

    @GetMapping("/found-items")
    fun getFoundItems(): ResponseEntity<List<Post>> {
        return ResponseEntity.ok(postService.findByStatus(PostStatus.ACTIVE_FOUND))
    }

    @GetMapping("/pending-items")
    fun getPendingItems(): ResponseEntity<List<Post>> {
        return ResponseEntity.ok(postService.findByStatus(PostStatus.PENDING_LOST) + postService.findByStatus(PostStatus.PENDING_FOUND))
    }

    @GetMapping("/posts/{id}")
    fun getPost(@PathVariable id: Long): ResponseEntity<Post> {
        return postService.findById(id)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.notFound().build()
    }

    @PostMapping("/new-post")
    fun addPost(@Valid @RequestBody payload: PostDto): ResponseEntity<Post> {
        val post = Post(
            id = 1L,
            title = payload.title,
            description = payload.description,
            municipality = payload.municipality,
            user = payload.user,
            category = payload.category,
            image = payload.image,
            state = payload.state
        )
        return ResponseEntity.created(URI.create("/posts/${post.id}")).body(post)
    }

}