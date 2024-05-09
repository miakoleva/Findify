package com.sorsix.finalproject.backend.api

import com.sorsix.finalproject.backend.domain.Post
import com.sorsix.finalproject.backend.domain.PostStatus
import com.sorsix.finalproject.backend.service.CategoryService
import com.sorsix.finalproject.backend.service.MunicipalityService
import com.sorsix.finalproject.backend.service.PostService
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
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

    @GetMapping("/pending-posts")
    fun getPendingItems(): ResponseEntity<List<Post>> {
        return ResponseEntity.ok(postService.findByStatus(PostStatus.PENDING_LOST) + postService.findByStatus(PostStatus.PENDING_FOUND))
    }

    @GetMapping("/posts/{id}")
    fun getPost(@PathVariable id: Long): ResponseEntity<Post> {
        return postService.findById(id)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.notFound().build()
    }

    @GetMapping("/posts/user/{id}")
    fun getPostsByUserId(@PathVariable id: Long): ResponseEntity<List<Post>> {
        return postService.listAll()
            .stream()
            .filter { post -> post.user.id == id }
            .toList()
            .let { ResponseEntity.ok(it) }
    }

    @PutMapping("/posts/{id}")
    fun updatePost(@PathVariable id: Long): ResponseEntity<Post> {
        val post = postService.findById(id)
        val postStatus = if (post?.state == PostStatus.PENDING_LOST) {
            PostStatus.ACTIVE_LOST
        } else {
            PostStatus.ACTIVE_FOUND
        }
        postService.updateState(id, postStatus)
        return ResponseEntity.ok(post)
    }

    @DeleteMapping("/posts/{id}")
    fun deletePost(@PathVariable id: Long) = postService.deleteById(id)


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


        val post = postService.create(title, cat!!, description, mun!!, image, s)

        return ResponseEntity.ok().body(post)
    }

    @PostMapping("/filter")
    fun filterPosts(
        @RequestParam(required = false) title: String,
        @RequestParam(required = false) category: String,
        @RequestParam(required = false) municipality: String,
        @RequestParam(required = true) state: String
    ): ResponseEntity<List<Post>> {

        val cat = categoryService.findCategoryByName(category)
        val mun = municipalityService.findMunicipalityByName(municipality)
        val s: PostStatus = if (state == "ACTIVE_LOST")
            PostStatus.ACTIVE_LOST
        else
            PostStatus.ACTIVE_FOUND

        val posts: List<Post> = postService.filter(title, cat, mun, s)

        return ResponseEntity.ok().body(posts)

    }

    @GetMapping("/{postId}/image")
    fun getPostImage(@PathVariable postId: Long): ResponseEntity<Any> {
        val image: ByteArray = postService.getPostImage(postId)

        return ResponseEntity.ok().contentType(MediaType.parseMediaType(MediaType.IMAGE_PNG_VALUE))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\\\"${System.currentTimeMillis()}\\\"")
            .body(image)
    }

}