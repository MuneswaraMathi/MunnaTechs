package com.example.address;

import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String firstName;
    private String lastName;

    private String houseNumber;
    private String streetName;
    private String landMark;

    private String city;
    private String state;
    private String postalCode;

    private String mobileNumber;
    private String email;

    private Date date;
    private Date modifiedDte;


    // Constructors
    public Address() {}

    public Address(String firstName, String lastName, String houseNumber, String streetName, String landMark,
            String city, String state, String postalCode, String mobileNumber, String email, Date date,
            Date modifiedDte) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.houseNumber = houseNumber;
        this.streetName = streetName;
        this.landMark = landMark;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.date = date;
        this.modifiedDte = modifiedDte;
    }



    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public void setLandMark(String landMark) {
        this.landMark = landMark;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public void setModifiedDte(Date modifiedDte) {
        this.modifiedDte = modifiedDte;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public String getStreetName() {
        return streetName;
    }

    public String getLandMark() {
        return landMark;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public Date getModifiedDte() {
        return modifiedDte;
    }

    
}