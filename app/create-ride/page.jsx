'use client';

import React from 'react'
import { useState, useEffect } from 'react';
import styles from '../styles/user-registration.module.css'

const createRide = () => {

    const [formData, setFormData] = useState('');

    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
    }, []);

    return (
        <div>
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
                    // onChange={handleChange}
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
                    // onChange={handleChange}
                    disabled
                    className={styles.inputField}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}> Seats Available </label>
                <input
                    type="number"
                    name="email"
                    // onChange={handleChange}
                    className={styles.inputField}
                />
            </div>
        </div>
    )
}

export default createRide;