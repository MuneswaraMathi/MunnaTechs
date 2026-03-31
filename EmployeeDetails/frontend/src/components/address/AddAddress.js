import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logger from "../../utils/logger";
import "./address.css";
import {validateAddressForm} from "./addressValidation";


export default function AddAddress() {
const [form,setForm] = useState({firstName:'',lastName:'',houseNumber:'',streetName:'',landMark:'',city:'',state:'',postalCode:'',mobileNumber:'',email:''});
const [errors, setErrors] = useState({});
const navigate = useNavigate();

const submitForm = async(e)=>{
    e.preventDefault();
    const validationErrors = validateAddressForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
    const res = await axios.post('http://localhost:8080/address/addAddress',form)

    logger.info('firstName: ',form.firstName);
    logger.info('firstName: ',form.lastName);
    logger.info('firstName: ',form.email);
    
    localStorage.setItem('firstName',res.data.firstName);
    localStorage.setItem('lastName',res.data.lastName);
    localStorage.setItem('email',res.data.email);
     navigate('/address/getAddress');
    }catch (err) {
      logger.error('Registration failed:', err);
      logger.error('Error details:', err.response?.data?.error || err.message);
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
};

return(
<div className="add-address-container">
      <h2>Add New Address</h2>
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