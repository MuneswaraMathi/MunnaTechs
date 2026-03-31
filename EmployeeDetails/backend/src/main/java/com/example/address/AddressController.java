package com.example.address;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/address")
public class AddressController {
private static final Logger logger = LoggerFactory.getLogger(AddressController.class);

    @Autowired
    private AddressService service;

    @PostMapping("/addAddress")
    public ResponseEntity<?> addAddress(@RequestBody Address address) {
        logger.info("Received address request - firstName: {}, lastName: {}, HouseNumber: {}", 
            address.getFirstName(), address.getLastName(), address.getHouseNumber());
         Date date = new Date();
         address.setDate(date);
         address.setModifiedDte(date);
        try {
        Address saved = service.createAddress(address);
            logger.info("address saved successfully with ID: {}", saved.getId());
        return ResponseEntity.ok(saved);
        } catch (Exception e) {
            logger.error("Error saving address: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of("error", "Failed to save address"));
        }
    }


     @GetMapping("/getAllAddresses")
    public ResponseEntity<?> getAllAddress() {
        logger.debug("Fetching all Addresses");
        List<Address> address = service.getAllAddresses();
        if (address == null) {
            logger.warn("Addresses not found");
            return ResponseEntity.status(404).body(Map.of("error", "addresses not found"));
        }
        logger.info("Retrieved addresses {}", address);
        return ResponseEntity.ok(address);
    }


    @GetMapping("/fetchAddress/{id}")
    public ResponseEntity<?> getAddressById(@PathVariable Long id) {
        logger.debug("Fetching address with ID: {}", id);
        Address address = service.getAddressById(id);
        if (address == null) {
            logger.warn("Address not found with ID: {}", id);
            return ResponseEntity.status(404).body(Map.of("error", "address not found"));
        }
        logger.info("Retrieved address: {}", address);
        return ResponseEntity.ok(address);
    }


    @GetMapping("/getAddress/{email}")
    public ResponseEntity<List<Address>> getAddressByEmail(@PathVariable String email) {
        logger.debug("Fetching all address with email");
        AddressResponse addresses = service.getAddressByEmail(email);
        logger.info("Retrieved {} addresses", addresses.getAddressList().size());
        return ResponseEntity.ok(addresses.getAddressList());
    }
    
     @GetMapping("/getAddress/cityName")
    public ResponseEntity<List<Address>> getAddressByCityName(@RequestParam String cityName) {
        logger.debug("Fetching all address with email");
        AddressResponse addresses = service.getAddressByCity(cityName);
        logger.info("Retrieved {} addresses", addresses.getAddressList().size());
        return ResponseEntity.ok(addresses.getAddressList());
    }


    @DeleteMapping("/deleteAddress/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long id) {
        logger.info("Deleting Address with ID: {}", id);
        service.deleteAddress(id);
        logger.info("Address deleted successfully with ID: {}", id);
        return ResponseEntity.ok(Map.of("message", "Address deleted successfully"));
    }


    @PutMapping("/updateAddress/{id}")
    public ResponseEntity<AddressResponse> updateAddress(
            @PathVariable Long id,
            @RequestBody Address address) {

        AddressResponse updated = service.updateAddress(id, address);
        return ResponseEntity.ok(updated);
    }
    
}
