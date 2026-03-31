package com.example.address;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByEmail(String email);


    List<Address> findByCity(String city);

}