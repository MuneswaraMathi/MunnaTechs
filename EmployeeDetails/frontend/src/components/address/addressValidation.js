
export const validateAddressForm = (form) => {
  let errors = {};

  if (!form.firstName.trim()) {
    errors.firstName = "First Name is required";
  }else if(!/^(?=.{2,}$)[A-Za-z]+(?: [A-Za-z]+)*$/.test(form.firstName.trim())){
      errors.firstName = "First Name must contain only letters (min 2)";
  }

  if (!form.lastName.trim()) {
    errors.lastName = "Last Name is required";
  }else if(!/^(?=.{2,}$)[A-Za-z]+(?: [A-Za-z]+)*$/.test(form.lastName.trim())) {
      errors.lastName = "Last Name must contain only letters (min 2)";
    }

  if (!form.houseNumber.trim()) {
    errors.houseNumber = "House Number is required";
  }

  if (!form.streetName.trim()) {
    errors.streetName = "Street Name is required";
  }else if(!/^(?=.{2,}$)[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/.test(form.streetName.trim())) {
      errors.streetName = "Street Name must contain only letters (min 2)";
    }

  if (!form.city.trim()) {
    errors.city = "City is required";
  }else if(!/^[A-Za-z0-9]{2,}$/.test(form.city.trim())) {
      errors.city = "City must contain only letters (min 2)";
    }

  if (!form.state.trim()) {
    errors.state = "State is required";
  }

  if (!/^\d{6}$/.test(form.postalCode)) {
    errors.postalCode = "Postal Code must be 6 digits";
  }

  if (!/^[6-9]\d{9}$/.test(form.mobileNumber)) {
    errors.mobileNumber =
      "Mobile number must be 10 digits and start with 6-9";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter valid email";
  }

  return errors;
};