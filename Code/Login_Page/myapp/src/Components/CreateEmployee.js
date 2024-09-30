import React from 'react';
import { useState } from 'react';
import './Styles/CreateEmployee.css';
import NavBar from './NavBar';

const CreateEmployee = () => {
  const [data, setData] = useState({
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_Gender: '',
    f_Course: '',
  });

  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({}); // To hold validation errors

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error when the field changes
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!data.f_Name) newErrors.f_Name = 'Name is required';
    if (!data.f_Email) {
      newErrors.f_Email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.f_Email)) {
      newErrors.f_Email = 'Email is invalid';
    }
    if (!data.f_Mobile) {
      newErrors.f_Mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(data.f_Mobile)) {
      newErrors.f_Mobile = 'Mobile number must be 10 digits';
    }
    if (!data.f_Designation) newErrors.f_Designation = 'Designation is required';
    if (!data.f_Gender) newErrors.f_Gender = 'Gender is required';

    // Validate course selection
    if (!data.f_Course) newErrors.f_Course = 'At least one course must be selected';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return; // Stop submission if validation fails
    }

    console.log("Hii");
    console.log(data.f_Course);
    try {
      let response = await fetch('http://localhost:4000/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const dataobj = await response.json();
      console.log(dataobj.message);
      setMessage(dataobj.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <NavBar /> */}
      <div className='container'>
        <div className='BasicDetails'>
          <label>Name</label>
          <input
            type='text'
            name='f_Name'
            value={data.f_Name}
            onChange={handleChange}
            placeholder='Enter your name'
          />
          {errors.f_Name && <p className='error'>{errors.f_Name}</p>}

          <label>Email</label>
          <input
            type='text'
            name='f_Email'
            value={data.f_Email}
            onChange={handleChange}
            placeholder='Enter your email'
          />
          {errors.f_Email && <p className='error'>{errors.f_Email}</p>}

          <label>Mobile No</label>
          <input
            type='number'
            name='f_Mobile'
            value={data.f_Mobile}
            onChange={handleChange}
            placeholder='Enter your mobile no'
          />
          {errors.f_Mobile && <p className='error'>{errors.f_Mobile}</p>}
        </div>

        <div className='Dropdown'>
          <label>Designation</label>
          <select name='f_Designation' value={data.f_Designation} onChange={handleChange}>
            <option value=''>Select designation</option>
            <option value='HR'>HR</option>
            <option value='Manager'>Manager</option>
            <option value='Sales'>Sales</option>
          </select>
          {errors.f_Designation && <p className='error'>{errors.f_Designation}</p>}
        </div>

        <div className='RadioButton'>
          <label>Male</label>
          <input
            type='radio'
            name='f_Gender'
            value='Male'
            checked={data.f_Gender === 'Male'}
            onChange={handleChange}
          />
          <label>Female</label>
          <input
            type='radio'
            name='f_Gender'
            value='Female'
            checked={data.f_Gender === 'Female'}
            onChange={handleChange}
          />
          {errors.f_Gender && <p className='error'>{errors.f_Gender}</p>}
        </div>

        <div className='CheckBox'>
          <label>MCA</label>
          <input
            type='checkbox'
            name='f_Course'
            value='MCA'
            checked={data.f_Course === 'MCA'}
            onChange={handleChange}
          />
          <label>BCA</label>
          <input
            type='checkbox'
            name='f_Course'
            value='BCA'
            checked={data.f_Course === 'BCA'}
            onChange={handleChange}
          />
          <label>BSC</label>
          <input
            type='checkbox'
            name='f_Course'
            value='BSC'
            checked={data.f_Course === 'BSC'}
            onChange={handleChange}
          />
          {errors.f_Course && <p className='error'>{errors.f_Course}</p>}
        </div>

        <div className='image'>
          <label>Upload your image</label>
          <input type='file' />
        </div>
        <button type='button' onClick={handleSubmit}>Submit</button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default CreateEmployee;