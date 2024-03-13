'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AvailableRides from './available-rides';
import styles from '../styles/passenger-registration.module.css';
import PrimaryButton from '@app/components/PrimaryButton';

const PassengerRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const showAvailableRides = () => {
    return(
      <div>
        <AvailableRides />
      </div>
    )
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform form validation and submission here
    console.log(formData);
    
  };

  return (
    <div className={styles.container}>
      <h1>Register as Passenger</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        {/* <Link href='/components/available-rides'> */}
        <button type="submit" className={styles.submitButton} onClick={showAvailableRides}>Submit</button>
        {/* </Link> */}
        
      </form>
      
    </div>
  );
};

export default PassengerRegistration;
