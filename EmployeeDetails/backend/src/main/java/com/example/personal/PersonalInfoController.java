package com.example.personal;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/personalDetails")
public class PersonalInfoController {

    private static final Logger logger = LoggerFactory.getLogger(PersonalInfoController.class);

    @Autowired
    private PersonalInfoService service;

    @PostMapping("/savePersonalInfo")
    public ResponseEntity<?> savePersonalInformation(@RequestBody PersonalInfo personalInfo){
     logger.info("firstName: {} && lstName: {}",personalInfo.getFirstName(), personalInfo.getLastName());
     PersonalInfo info =null;
try {
      info = service.savePersonalInfo(personalInfo);
     }catch (Exception e) {
        logger.error("Error saving personalInfo: {}", e.getMessage(), e);
        return ResponseEntity.status(500).body(Map.of("error", "Failed to save personal details.."));
        }
     return ResponseEntity.ok(info);
    }  


     @GetMapping("/showPersonalInfo/{email}")
    public ResponseEntity<List<PersonalInfo>> getPersonalInfoByEmail(@PathVariable  String email) {
        logger.debug("Fetching personalInfo by email");
        List<PersonalInfo> personalInfo = service.getPersonalInfoByEmail(email);
        logger.info("Retrieved {} personalInfo", personalInfo.size());
        return ResponseEntity.ok(personalInfo);
    }


    @PutMapping("/updatePersonalInfo/{id}")
    public ResponseEntity<PersonalInfoResponse> updatePersonalInfo(
            @PathVariable Long id,
            @RequestBody PersonalInfo personalInfo) {

        if (id == null) {
            return ResponseEntity.badRequest().build();
        }
        PersonalInfoResponse updated = service.updatePersonalIfo(id, personalInfo);
        return ResponseEntity.ok(updated);
    }
}
