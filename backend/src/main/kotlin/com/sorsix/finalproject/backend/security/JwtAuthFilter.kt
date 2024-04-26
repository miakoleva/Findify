//package com.sorsix.finalproject.backend.security
//
//import com.fasterxml.jackson.databind.ObjectMapper
//import com.sorsix.finalproject.backend.util.JwtHelper
//import jakarta.servlet.FilterChain
//import jakarta.servlet.ServletException
//import jakarta.servlet.http.HttpServletRequest
//import jakarta.servlet.http.HttpServletResponse
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
//import org.springframework.security.core.context.SecurityContextHolder
//import org.springframework.security.core.userdetails.UserDetailsService
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
//import org.springframework.stereotype.Component
//import org.springframework.web.filter.OncePerRequestFilter
//import java.io.IOException
//
//
//@Component
//class JwtAuthFilter (
//    private val userDetailsService: UserDetailsService,
//    private val objectMapper: ObjectMapper
//) :
//    OncePerRequestFilter() {
//
//    @Throws(ServletException::class, IOException::class)
//    override fun doFilterInternal(
//        request: HttpServletRequest,
//        response: HttpServletResponse,
//        filterChain: FilterChain
//    ) {
//        try {
//            val authHeader = request.getHeader("Authorization")
//
//            var token: String? = null
//            var username: String? = null
//            if (authHeader != null && authHeader.startsWith("Bearer ")) {
//                token = authHeader.substring(7)
//                username = JwtHelper.extractUsername(token)
//            }
//
//            //      If the accessToken is null. It will pass the request to next filter in the chain.
////      Any login and signup requests will not have jwt token in their header, therefore they will be passed to next filter chain.
//            if (token == null) {
//                filterChain.doFilter(request, response)
//                return
//            }
//
//            //       If any accessToken is present, then it will validate the token and then authenticate the request in security context
//            if (username != null && SecurityContextHolder.getContext().authentication == null) {
//                val userDetails: UserDetails = userDetailsService.loadUserByUsername(username)
//                if (JwtHelper.validateToken(token, userDetails)) {
//                    val authenticationToken = UsernamePasswordAuthenticationToken(userDetails, null, null)
//                    authenticationToken.details = WebAuthenticationDetailsSource().buildDetails(request)
//                    SecurityContextHolder.getContext().authentication = authenticationToken
//                }
//            }
//
//            filterChain.doFilter(request, response)
//        } catch (e: AccessDeniedException) {
//            val errorResponse: ApiErrorResponse = ApiErrorResponse(HttpServletResponse.SC_FORBIDDEN, e.getMessage())
//            response.status = HttpServletResponse.SC_FORBIDDEN
//            response.writer.write(toJson(errorResponse))
//        }
//    }
//
//    private fun toJson(response: ApiErrorResponse): String {
//        return try {
//            objectMapper.writeValueAsString(response)
//        } catch (e: Exception) {
//            "" // Return an empty string if serialization fails
//        }
//    }
//}