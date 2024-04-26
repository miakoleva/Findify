//package com.sorsix.finalproject.backend.util
//
//import com.sorsix.finalproject.backend.security.UserDetails
//import io.jsonwebtoken.Claims
//import io.jsonwebtoken.ExpiredJwtException
//import io.jsonwebtoken.Jwts
//import io.jsonwebtoken.SignatureAlgorithm
//import java.security.SignatureException
//import java.time.Instant
//import java.time.temporal.ChronoUnit
//import java.util.*
//import kotlin.coroutines.ContinuationInterceptor
//
//
//object JwtHelper {
//    private val SECRET_KEY: ContinuationInterceptor.Key = Keys.secretKeyFor(SignatureAlgorithm.HS256)
//    private const val MINUTES: Long = 60
//
//    fun generateToken(email: String?): String {
//        val now = Instant.now()
//        return Jwts.builder()
//            .subject(email)
//            .issuedAt(Date.from(now))
//            .expiration(Date.from(now.plus(MINUTES, ChronoUnit.MINUTES)))
//            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
//            .compact()
//    }
//
//    fun extractUsername(token: String): String {
//        return getTokenBody(token).subject
//    }
//
//    fun validateToken(token: String, userDetails: UserDetails): Boolean {
//        val username = extractUsername(token)
//        return username == userDetails.username && !isTokenExpired(token)
//    }
//
//    private fun getTokenBody(token: String): Claims {
//        try {
//            return Jwts
//                .parser()
//                .setSigningKey(SECRET_KEY)
//                .build()
//                .parseSignedClaims(token)
//                .getPayload()
//        } catch (e: SignatureException) { // Invalid signature or expired token
//            throw AccessDeniedException("Access denied: " + e.getMessage())
//        } catch (e: ExpiredJwtException) {
//            throw AccessDeniedException("Access denied: " + e.getMessage())
//        }
//    }
//
//    private fun isTokenExpired(token: String): Boolean {
//        val claims = getTokenBody(token)
//        return claims.expiration.before(Date())
//    }
//}