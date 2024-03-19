'use client';

import React from 'react'
import { useState, useEffect } from 'react';
import styles from '../styles/user-registration.module.css'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers';
import DateTimePicker from '@app/components/DateTimePicker'

const createRide = () => {
    const [formData, setFormData] = useState('');
    const [value, setValue] = useState(0);

    const handleChange = (e) => {
        setValue(parseInt(e.target.value));
    };

    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        if (!formData) {
          const params = new URLSearchParams(window.location.search);
          const formDataParam = params.get('formData');
          if (formDataParam) {
            setFormData(JSON.parse(formDataParam));
          }
        }
      }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className={styles.container}>
                <h1>
                    Confirm Ride details:
                </h1>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        disabled
                        className={styles.inputField}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Age:</label>
                    <input
                        type="text"
                        name="age"
                        value={formData.age}
                        disabled
                        className={styles.inputField}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Gender:</label>
                    <input
                        type="text"
                        name="gender"
                        value={formData.gender}
                        disabled
                        className={styles.inputField}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        disabled
                        className={styles.inputField}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Car:</label>
                    <input
                        type="text"
                        name="car"
                        value={formData.carName}
                        className={styles.inputField}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}> Seats Available </label>
                    <input
                        type="number"
                        name="numPassengers"
                        defaultValue={formData.carCapacity}
                        onChange={handleChange}
                        className={styles.inputField}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Source:</label>
                    <input
                        type="text"
                        name="source"
                        className={styles.inputField}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Destination:</label>
                    <input
                        type="text"
                        name="destination"
                        className={styles.inputField}
                    />
                </div>
                <div className={styles.formGroup}>
                    <DateTimePicker />
                </div>
            </div>
        </LocalizationProvider>
    );
};

export default createRide;