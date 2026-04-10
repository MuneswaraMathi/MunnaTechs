package com.example.personal;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PersonalInfoService {

    @Autowired
    private PersonalInfoRepository repository;

    @NonNull
    @SuppressWarnings("null")
    public PersonalInfo savePersonalInfo(PersonalInfo personalInfo){
        
        return repository.save(personalInfo);
    }

     public List<PersonalInfo> getPersonalInfoByFirstName(String firstname) {
        return repository.findByFirstName(firstname);
    }


    public List<PersonalInfo> getPersonalInfoByEmail(String email) {
        return repository.findByEmail(email);
    }


    @Transactional
    public PersonalInfoResponse updatePersonalIfo(@NonNull Long id, PersonalInfo personalDetails) {
        PersonalInfoResponse response = new PersonalInfoResponse();
         Optional<PersonalInfo> personalInfo = repository.findById(id);
        if(null!=personalInfo && personalInfo.isPresent()){
            PersonalInfo existingInfo = personalInfo.get();
            response.setPersonalInfoId(id);
            response.setMessage("Address Successfully updated with");
        existingInfo.setFirstName(personalDetails.getFirstName());
        existingInfo.setLastName(personalDetails.getLastName());
        existingInfo.setEmail(personalDetails.getEmail());
        existingInfo.setPhoneNumber(personalDetails.getPhoneNumber());
        repository.save(existingInfo);
         }else{
            response.setPersonalInfoId(id);
            response.setMessage("Address updated Failed");
            Error error = new Error();
            response.setError(error);
         }
         return response;
    }
    
}
