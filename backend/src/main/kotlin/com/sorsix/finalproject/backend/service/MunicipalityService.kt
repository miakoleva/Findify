package com.sorsix.finalproject.backend.service

import com.sorsix.finalproject.backend.domain.Municipality
import com.sorsix.finalproject.backend.repository.MunicipalityRepository
import org.springframework.stereotype.Service

@Service
class MunicipalityService (private val repository: MunicipalityRepository) {
    fun getMunicipalities(): List<Municipality> {
        return repository.findAll()
    }
}