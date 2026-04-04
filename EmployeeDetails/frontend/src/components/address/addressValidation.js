
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
  if (!form.fatherName.trim()) {
    errors.fatherName = "Father Name is required";
  }else if(!/^(?=.{2,}$)[A-Za-z]+(?: [A-Za-z]+)*$/.test(form.fatherName.trim())) {
      errors.fatherName = "Father Name must contain only letters (min 2)";
    }

  if (!form.email || !form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  return errors;
};