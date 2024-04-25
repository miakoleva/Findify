package com.sorsix.finalproject.backend.api.request

import com.sorsix.finalproject.backend.domain.Category
import com.sorsix.finalproject.backend.domain.Municipality
import com.sorsix.finalproject.backend.domain.PostStatus
import com.sorsix.finalproject.backend.domain.User

//tryout?

data class CreatePostRequest(
    val state: PostStatus,
    val image: ByteArray,
    val user: User,
    val municipality: Municipality,
    val category: Category
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as CreatePostRequest

        if (state != other.state) return false
        if (!image.contentEquals(other.image)) return false
        if (user != other.user) return false
        if (municipality != other.municipality) return false
        if (category != other.category) return false

        return true
    }

    override fun hashCode(): Int {
        var result = state.hashCode()
        result = 31 * result + image.contentHashCode()
        result = 31 * result + user.hashCode()
        result = 31 * result + municipality.hashCode()
        result = 31 * result + category.hashCode()
        return result
    }
}
