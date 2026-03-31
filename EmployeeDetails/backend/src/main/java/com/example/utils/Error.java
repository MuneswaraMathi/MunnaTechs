package com.example.utils;

public class Error {

    private String errorCode;
    private String errorMessage;
    

    public Error() {
    }


    public Error(String errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }


    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }


    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }


    public String getErrorCode() {
        return errorCode;
    }


    public String getErrorMessage() {
        return errorMessage;
    }

    
    
}
