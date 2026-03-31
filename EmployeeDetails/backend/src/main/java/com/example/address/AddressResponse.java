package com.example.address;

import java.util.List;

import com.example.utils.Error;

public class AddressResponse {
    public AddressResponse() {
    }

    private Long addressId;
    private String message;
    private Error error;

    List<Address> addressList;

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setError(Error error) {
        this.error = error;
    }

    public Long getAddressId() {
        return addressId;
    }

    public String getMessage() {
        return message;
    }

    public Error getError() {
        return error;
    }

    public void setAddressList(List<Address> addressList) {
        this.addressList = addressList;
    }

    public List<Address> getAddressList() {
        return addressList;
    }
}
