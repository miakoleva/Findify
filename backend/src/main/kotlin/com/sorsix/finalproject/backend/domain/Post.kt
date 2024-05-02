package com.sorsix.finalproject.backend.domain

import jakarta.persistence.*

@Entity
@Table(name = "posts")
data class Post(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    val id: Long = 0L,
    @Enumerated(EnumType.STRING)
    @Column
    val state: PostStatus = PostStatus.PENDING_LOST,
    @Column
    val title: String = "",
    @Lob
    @Column(columnDefinition = "BYTEA")
    val image: ByteArray = ByteArray(1),
    @ManyToOne
    @JoinColumn(name = "user_id")
    val user: User = User(),
    @ManyToOne
    @JoinColumn(name = "municipality_id")
    val municipality: Municipality = Municipality(),
    @ManyToOne
    @JoinColumn(name = "category_id")
    val category: Category = Category(),
    @Column(name = "description")
    val description: String = ""
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Post

        if (!image.contentEquals(other.image)) return false

        return true
    }

    override fun hashCode(): Int {
        return image.contentHashCode()
    }
}

