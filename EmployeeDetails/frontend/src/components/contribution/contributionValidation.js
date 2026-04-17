export const validateContributionForm = (form) => {
  let errors = {};

  if (!form.name.trim()) {
    errors.name = "Full Name is required";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter valid email";
  }

  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = "Phone Number is required";
  } else if (!/^[6-9]\d{9}$/.test(form.phoneNumber)) {
    errors.phoneNumber =
      "Phone must be 10 digits and start with 6-9";
  }

  if (!form.amount) {
    errors.amount = "Amount is required";
  } else if (Number(form.amount) <= 0) {
    errors.amount = "Amount must be greater than 0";
  }

  if (!form.date) {
    errors.date = "Date is required";
  }

  return errors;
};