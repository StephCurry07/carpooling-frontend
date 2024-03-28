'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../../styles/user-registration.module.css';
import { useSearchParams } from 'next/navigation';

const DriverRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
  });

  const searchParams = useSearchParams();
  const connectedAccount = searchParams.get("connectedAccount");
  const balance = searchParams.get("balance");

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('formData', JSON.stringify(formData));
    router.push({
      pathname: '/create-ride',
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
    
  //   localStorage.setItem('formData', JSON.stringify(formData));
  //   window.location.href = '/create-ride';
  // };

  return (
    <div className={styles.container} >
      <h1>Register as Driver</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Your details:</legend>

          <div className={styles.formGroup}>
            <label className={styles.label}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Age:</label>
            <input
              type="text"
              id="age"
              name="age"
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Gender:</label>
            <input
              type="text"
              id="gender"
              name="gender"
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
        </fieldset>
        <br></br>
        <fieldset>
          <legend>Enter your car details: </legend>

          <div className={styles.formGroup}>
            <label className={styles.label} >Car name</label>
            <input
              type="text"
              id="car"
              name="carName"
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} >Car Capacity(Max. Num of Passengers):</label>
            <input
              type="text"
              id="cap"
              name="carCapacity"
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
        </fieldset>
        <br></br>
        <Link
          href={{
            pathname: "/create-ride",
            query: {
              connectedAccount: connectedAccount,
              balance: balance,
              role: "driver",
              formData: JSON.stringify(formData),
            },
          }}
          style={{ marginTop: "auto" }}
        >
          <button type="submit" className={`${styles.submitButton} ${styles.center__relative}`}>Submit</button>
        </Link>

      </form>
    </div>
  );
};

export default DriverRegistration;
