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
    private String fatherName;
    private String houseNumber;
    private String streetName;
    private String landMark;
    private String city;
    private String email;


    private Date date;
    private Date modifiedDte;


    // Constructors
    public Address() {}

    public Address(String firstName, String lastName, String fatherName, String houseNumber, String streetName, String landMark,String city,String email,Date date,
            Date modifiedDte) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fatherName = fatherName;
        this.houseNumber = houseNumber;
        this.streetName = streetName;
        this.landMark = landMark;
        this.city = city;
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

    public String getFatherName() {
        return fatherName;
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

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName ;
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

    public void setCity(String city) {
        this.city = city;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getModifiedDte() {
        return modifiedDte;
    }

}