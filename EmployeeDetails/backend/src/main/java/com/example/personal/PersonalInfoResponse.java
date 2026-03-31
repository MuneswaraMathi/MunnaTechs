package com.example.personal;

public class PersonalInfoResponse {
    private Long personalInfoId;
    private String message;
    private Error error;

    
    public PersonalInfoResponse() {
    }


    public PersonalInfoResponse(Long personalInfoId, String message, Error error) {
        this.personalInfoId = personalInfoId;
        this.message = message;
        this.error = error;
    }


    public void setPersonalInfoId(Long personalInfoId) {
        this.personalInfoId = personalInfoId;
    }


    public void setMessage(String message) {
        this.message = message;
    }


    public void setError(Error error) {
        this.error = error;
    }


    public Long getPersonalInfoId() {
        return personalInfoId;
    }


    public String getMessage() {
        return message;
    }


    public Error getError() {
        return error;
    }


    
}
