package com.example.address;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.utils.Error;

@Service
public class AddressService {

    @Autowired
    private AddressRepository repository;

    @NonNull
    @SuppressWarnings("null")
    public Address createAddress(Address address) {
        return repository.save(address);
    }

    public List<Address> getAllAddresses() {
        return repository.findAll();
    }

     public Address getAddressById(@NonNull Long id) {
        return repository.findById(id).orElse(null);
    }

     public AddressResponse getAddressByEmail(String email) {
        AddressResponse response = new AddressResponse();
        List<Address> existingAddresses = repository.findByEmail(email);
        response.setAddressList(existingAddresses);
        return response;
    }

    public AddressResponse getAddressByCity(String cityName) {
        AddressResponse response = new AddressResponse();
       List<Address> existingAddresses =  repository.findByCity(cityName);
       response.setAddressList(existingAddresses);
        return response;
    }

    public AddressResponse deleteAddress(@NonNull Long id) {
        AddressResponse response = new AddressResponse();
        Optional<Address> existingAddress = repository.findById(id);
        if(null!=existingAddress &&  existingAddress.isPresent()){
            System.out.println("Deleting address with id: " + id);
            response.setAddressId(id);
            response.setMessage("Address Successfully Deleted");
            repository.deleteById(id);
        }else{
            response.setAddressId(id);
            response.setMessage("Delete Address Failed");
            Error error = new Error();
            error.setErrorCode("404");
            error.setErrorMessage("Address Not Found");
            response.setError(error);
         }
         return response;
    }

    @Transactional
    public AddressResponse updateAddress(Long id, Address updatedAddress) {
        AddressResponse response = new AddressResponse();
         Optional<Address> address = repository.findById(id);
        if(null!=address && address.isPresent()){
            Address existingAddress = address.get();
            response.setAddressId(id);
            response.setMessage("Address Successfully updated with");
        existingAddress.setFirstName(updatedAddress.getFirstName());
        existingAddress.setLastName(updatedAddress.getLastName());
        existingAddress.setFatherName(updatedAddress.getFatherName());
        existingAddress.setStreetName(updatedAddress.getStreetName());
        existingAddress.setHouseNumber(updatedAddress.getHouseNumber());
        existingAddress.setLandMark(updatedAddress.getLandMark());
        existingAddress.setModifiedDte(updatedAddress.getModifiedDte());
        repository.save(existingAddress);
         }else{
            response.setAddressId(id);
            response.setMessage("Address updated Failed");
            Error error = new Error();
            error.setErrorCode("404");
            error.setErrorMessage("Address Not Found");
            response.setError(error);
         }
         return response;
    }
}
