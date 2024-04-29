package com.sorsix.finalproject.backend.domain

import jakarta.persistence.*

@Entity
@Table(name = "posts")
data class Post(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    val id: Long,
    @Enumerated(EnumType.STRING)
    @Column
    val state: PostStatus,
    @Column
    val title: String,
    @Lob
    @Column(columnDefinition = "BYTEA")
    val image: ByteArray,
    @ManyToOne
    @JoinColumn(name = "user_id")
    val user: User,
    @ManyToOne
    @JoinColumn(name = "municipality_id")
    val municipality: Municipality,
    @ManyToOne
    @JoinColumn(name = "category_id")
    val category: Category,
    @Column(name = "description")
    val description: String
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Post

        if (id != other.id) return false
        if (state != other.state) return false
        if (!image.contentEquals(other.image)) return false
        if (user != other.user) return false
        if (municipality != other.municipality) return false
        if (category != other.category) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + state.hashCode()
        result = 31 * result + image.contentHashCode()
        result = 31 * result + user.hashCode()
        result = 31 * result + municipality.hashCode()
        result = 31 * result + category.hashCode()
        return result
    }
}

