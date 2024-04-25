package com.sorsix.finalproject.backend.repository

import com.sorsix.finalproject.backend.domain.Post
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PostRepository: JpaRepository<Post, Long>{
}