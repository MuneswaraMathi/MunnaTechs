export const validateUpdatePasswordForm = (form) => {
  const newErrors = {};
  const email = form.email?.trim() || "";

  if (!email) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "Enter valid email";
  }

  if (!form.currentPassword) {
    newErrors.currentPassword = "Current Password is required";
  }

  if (!form.newPassword) {
    newErrors.newPassword = "New Password is required";
  } else if (form.newPassword.length < 8) {
    newErrors.newPassword = "New Password must be at least 8 characters";
  }

  if (!form.confirmPassword) {
    newErrors.confirmPassword = "Confirm Password is required";
  } else if (form.newPassword !== form.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  return newErrors;
};

