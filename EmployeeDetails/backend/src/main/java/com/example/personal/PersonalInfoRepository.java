package com.example.personal;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalInfoRepository extends JpaRepository<PersonalInfo,Long> {
    List<PersonalInfo> findByFirstName(String firstName);
    List<PersonalInfo> findByPhoneNumber(String phoneNumber);
    List<PersonalInfo> findByEmail(String email);

    
}
