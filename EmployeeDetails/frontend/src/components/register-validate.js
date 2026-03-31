export const validateRegisterForm = (form) => {
  let newErrors = {};
const namePattern = /^(?=.{2,}$)[A-Za-z]+(?: [A-Za-z]+)*$/;
  // First Name
  if (!form.firstName.trim()) {
    newErrors.firstName = "First Name is required";
     console.log("First Name validation failed");
  } else if (!namePattern.test(form.firstName.trim())) {
    newErrors.firstName = "First Name must contain only letters (min 2)";
    console.log("First Name must contain atleast letters (min 2)");
  }

  // Last Name
  if (!form.lastName.trim()) {
    newErrors.lastName = "Last Name is required";
    console.log("Last Name validation failed");
  }else if(!namePattern.test(form.lastName.trim())) {
      newErrors.lastName = "Last Name must contain only letters (min 2)";
      console.log("Last Name must contain atleast letters (min 2)");
    }

  // Email
  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    newErrors.email = "Enter valid email";
  }

  // Password
  if (!form.password) {
    newErrors.password = "Password is required";
  } else if (form.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  }

  // Confirm Password
  if (!form.confirmPassword) {
    newErrors.confirmPassword = "Confirm Password is required";
  } else if (form.password !== form.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  // Indian Phone Number
  if (!form.phoneNumber.trim()) {
    newErrors.phoneNumber = "Phone Number is required";
  } else if (!/^[6-9]\d{9}$/.test(form.phoneNumber.trim())) {
    newErrors.phoneNumber =
      "Phone must be 10 digits and start with 6-9";
  }
  return newErrors;
};