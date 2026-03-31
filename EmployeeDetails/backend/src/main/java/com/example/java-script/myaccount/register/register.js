function validateForm() {
  let isValid = true;
  const inputs = document.querySelectorAll("input");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const namePattern = /^[A-Za-z][A-Za-z0-9@._\- ]*$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phonePattern = /^[6-9]\d{9}$/;
  const aadharPattern = /^\d{12}$/;


  document.querySelector('input[name="document"]')
  .addEventListener("input", function () {
    // Remove all non-digits
    let value = this.value.replace(/\D/g, "");
    // Limit to 12 digits
    value = value.substring(0, 12);
    // Add space after every 3 digits
    this.value = value.replace(/(\d{3})(?=\d)/g, "$1 ");
  });

  // Clear all previous errors
  document.querySelectorAll(".error").forEach((errorDiv) => (errorDiv.textContent = ""));

  inputs.forEach((input) => {
    const value = input.value.trim();
    const errorDiv = document.getElementById(input.name + "Error");
    // Required validation (for text & password)
    if (
      (input.type === "text" || input.type === "password") &&
      !value
    ) {
      if (errorDiv) {
        errorDiv.textContent = `${input.name} is required`;
      }
      isValid = false;
      return;
    }

    // First Name
    if (input.name === "firstName") {
      if (value.length < 2) {
        errorDiv.textContent = "First Name must be at least 2 characters";
        isValid = false;
      } else if (!namePattern.test(value)) {
        errorDiv.textContent =
          "First Name must start with a letter";
        isValid = false;
      }
    }

    // Last Name
    if (input.name === "lastName") {
      if (value.length < 2) {
        errorDiv.textContent = "Last Name must be at least 2 characters";
        isValid = false;
      } else if (!namePattern.test(value)) {
        errorDiv.textContent =
          "Last Name must start with a letter";
        isValid = false;
      }
    }

    // Email
    if (input.name === "email") {
      if (!emailPattern.test(value)) {
        errorDiv.textContent = "Please enter a valid email";
        isValid = false;
      }
    }

    // Password
    if (input.name === "password") {
      if (!passwordPattern.test(value)) {
        errorDiv.textContent =
          "Password must contain 1 uppercase, 1 lowercase, 1 number, 1 special character and minimum 8 characters";
        isValid = false;
      }
    }

    // Password
    if (input.name === "confirmPassword") {
      if (!passwordPattern.test(value)) {
        errorDiv.textContent =
          "Confirm Password must contain 1 uppercase, 1 lowercase, 1 number, 1 special character and minimum 8 characters";
        isValid = false;
      }
    }

    // Confirm Password matching
    if (input.name === "confirmPassword") {
      const password = document.querySelector("input[name='password']").value.trim();
      const confirmPassword = document.querySelector("input[name='confirmPassword']").value.trim();
      if (password !== confirmPassword) {
        errorDiv.textContent = "Passwords do not match";
        isValid = false;
      }
    }

    // Aadhar (12 digits)
    if (input.name === "document") {
      const value = input.value.replace(/\s+/g, ""); // remove all spaces
      if (!aadharPattern.test(value)) {
        errorDiv.textContent = "Document must be exactly 12 digits";
        isValid = false;
      }
    }

    // Phone
    if (input.name === "phoneNumber") {
      if (!phonePattern.test(value)) {
        errorDiv.textContent = "Phone number must be 10 digits and start with 6-9";
        isValid = false;
      }
    }
  });

  // Gender validation
  const genderSelected = document.querySelector(
    'input[name="gender"]:checked'
  );
  if (!genderSelected) {
    document.getElementById("genderError").textContent =
      "Please select a gender";
    isValid = false;
  }

  // Skills validation
  const skills = document.querySelectorAll(
    'input[name="skill"]:checked'
  );
  if (skills.length === 0) {
    document.getElementById("skillError").textContent =
      "Please select at least one skill";
    isValid = false;
  }

  return isValid;
}

function resetForm() {
  const form = document.getElementById("registerForm");
  const errorDivs = form.querySelectorAll(".error");
  const inputs = form.querySelectorAll("input,select");

  inputs.forEach((input) => {
    if (input.type === "checkbox" || input.type === "radio") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });

  errorDivs.forEach((errorDiv) => {
    errorDiv.textContent = "";
  });
}

function registerUser() {
  const form = document.getElementById("registerForm");
  const formData = new FormData(form);

  fetch("/api/register", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Registration successful!");
        window.location.href = "/login";
      } else {
        alert("Registration failed: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred during registration.");
    });
}
