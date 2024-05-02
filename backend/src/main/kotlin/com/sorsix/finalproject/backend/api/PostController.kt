package com.sorsix.finalproject.backend.api

import com.sorsix.finalproject.backend.domain.Post
import com.sorsix.finalproject.backend.domain.PostStatus
import com.sorsix.finalproject.backend.service.CategoryService
import com.sorsix.finalproject.backend.service.MunicipalityService
import com.sorsix.finalproject.backend.service.PostService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile


@RestController
@CrossOrigin
@RequestMapping("/api")
class PostController(
    private val postService: PostService,
    private val categoryService: CategoryService,
    private val municipalityService: MunicipalityService
) {

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
    fun addPost(
        @RequestParam title: String,
        @RequestParam category: String,
        @RequestParam description: String,
        @RequestParam municipality: String,
        @RequestParam image: MultipartFile,
        @RequestParam state: String
    ): ResponseEntity<Post> {

        val cat = categoryService.findCategoryByName(category)
        val mun = municipalityService.findMunicipalityByName(municipality)
        val s: PostStatus = PostStatus.valueOf(state)


        val post = postService.create(title, cat, description, mun, image, s)

        return ResponseEntity.ok().body(post)
    }

}