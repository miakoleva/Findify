package com.sorsix.finalproject.backend.authentication.filter

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken
import org.springframework.web.filter.OncePerRequestFilter

class JwtAuthenticationFilter(private val authenticationManager: AuthenticationManager): OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try{
            val jwt: String = request.getHeader("Authorization")
            val authentication = BearerTokenAuthenticationToken(jwt)
            val authResult = authenticationManager.authenticate(authentication)
            SecurityContextHolder.getContext().authentication = authResult
        }catch (e: Exception){
            response.status = 401
            return
        }
    }

    override fun shouldNotFilter(request: HttpServletRequest): Boolean {
        return request.servletPath.equals("/api/login") ||
                request.servletPath.equals("/api/register") ||
                request.servletPath.equals("/api/home") ||
                request.servletPath.equals("/api/municipalities") ||
                request.servletPath.equals("/api/user/get")
    }



}