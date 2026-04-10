import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logger from "../../utils/logger";
import NavDropdowns from "../NavDropdowns";
import API_BASE_URL from "../../config/apiConfig";
import "./address.css";
import {validateAddressForm} from "./addressValidation";


export default function AddAddress() {
const [form,setForm] = useState({firstName:'',lastName:'',fatherName:'',houseNumber:'',email:''});
const [errors, setErrors] = useState({});
const navigate = useNavigate();

const handleBlur = (field) => {
  const validationErrors = validateAddressForm(form);
  setErrors((prev) => {
    const updated = { ...prev };
    if (validationErrors[field]) {
      updated[field] = validationErrors[field];
    } else {
      delete updated[field];
    }
    return updated;
  });
};

const submitForm = async(e)=>{
    e.preventDefault();
    const validationErrors = validateAddressForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
    const res = await axios.post(`${API_BASE_URL}/address/addAddress`,form)

    logger.info('firstName: ',form.firstName);
    logger.info('lastName: ',form.lastName);
    logger.info('fatherName: ',form.fatherName);
    logger.info('houseNumber: ',form.houseNumber);
    logger.info('streetName: ',form.streetName);
    logger.info('landMark: ',form.landMark);
    logger.info('city: ',form.city);
    logger.info('email: ',form.email);
    logger.info('Address added successfully:', res.data);
    localStorage.setItem('firstName',res.data.firstName);
    localStorage.setItem('lastName',res.data.lastName);
    localStorage.setItem('fatherName',res.data.fatherName);
     navigate('/address/getAddress');
    }catch (err) {
      logger.error('Registration failed:', err);
      logger.error('Error details:', err.response?.data?.error || err.message);
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
};

return(
<div className="add-address-container">
      <NavDropdowns />
      <form onSubmit={submitForm} className="address-form">
        {Object.keys(form).map((field) => (
          <div key={field}>
            <input
              className="form-input"
              placeholder={field}
              value={form[field]}
              onChange={(e) =>
                setForm({ ...form, [field]: e.target.value })
              }
              onBlur={() => handleBlur(field)}
            />
            {errors[field] && (
              <p className="error-text">{errors[field]}</p>
            )}
          </div>
        ))}

        <button type="submit" className="submit-btn">
          Add Address
        </button>
      </form>
    </div>
);
}