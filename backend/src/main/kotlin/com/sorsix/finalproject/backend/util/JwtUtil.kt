package com.sorsix.finalproject.backend.util

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import java.util.*
import kotlin.collections.HashMap

@Service
class JwtUtil {
    private val SECRET_KEY = "secretKey"


    private fun extractAllClaims(token: String?): Claims{
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJwt(token).body
    }

    fun <T> extractClaim(token: String?, claimsResolver: (Claims) -> T): T{
        val claims = extractAllClaims(token)
        return claimsResolver.invoke(claims)
    }

    fun extractUsername(token: String?): String{
        return extractClaim(token) { obj: Claims -> obj.subject}
    }

    fun extractExpiration(token: String?): Date{
        return extractClaim(token) { obj: Claims -> obj.expiration }
    }

    private fun isTokenExpired(token: String?): Boolean{
        return extractExpiration(token).before(Date())
    }

    fun createToken(claims: MutableMap<String, Any>,subject: String): String{
        return Jwts.builder().setClaims(claims)
            .setSubject(subject).setIssuedAt(Date(System.currentTimeMillis()))
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact()
    }

    fun generateToken(userDetails: UserDetails): String{
        val claims: MutableMap<String, Any> = HashMap()
        val roles: List<String> = userDetails.authorities.stream()
            .map { it.authority }.toList()
        claims["roles"] = roles
        return createToken(claims, userDetails.username)
    }

    fun validateToken(token: String?, userDetails: UserDetails): Boolean{
        val username = extractUsername(token)
        return username == userDetails.username && !isTokenExpired(token)
    }

}