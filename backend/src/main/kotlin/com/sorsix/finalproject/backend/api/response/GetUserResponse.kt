package com.sorsix.finalproject.backend.api.response

import com.sorsix.finalproject.backend.domain.User

sealed interface GetUserResponse

data class GetUserResponseSuccess(val user: User): GetUserResponse
data class GetUserResponseFailed(val error: String): GetUserResponse

