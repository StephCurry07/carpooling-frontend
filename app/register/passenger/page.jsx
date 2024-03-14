'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AvailableRides from '@app/available-rides/page';
import styles from '../../styles/passenger-registration.module.css';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
  };
  return (
    // <form>
    //   <div className="space-y-12">
    //     <div className="border-b border-gray-900/10 pb-12">
    //       <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
    //       <p className="mt-1 text-sm leading-6 text-gray-600">
    //         This information will be displayed publicly so be careful what you share.
    //       </p>

    //       <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    //         <div className="sm:col-span-4">
    //           <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
    //             Username
    //           </label>
    //           <div className="mt-2">
    //             <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
    //               <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
    //               <input
    //                 type="text"
    //                 name="username"
    //                 id="username"
    //                 autoComplete="username"
    //                 className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
    //                 placeholder="janesmith"
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         <div className="col-span-full">
    //           <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
    //             About
    //           </label>
    //           <div className="mt-2">
    //             <textarea
    //               id="about"
    //               name="about"
    //               rows={3}
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //               defaultValue={''}
    //             />
    //           </div>
    //           <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
    //         </div>

    //         <div className="col-span-full">
    //           <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
    //             Photo
    //           </label>
              
    //         </div>
    //       </div>
    //     </div>

    //     <div className="border-b border-gray-900/10 pb-12">
    //       <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
    //       <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

    //       <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    //         <div className="sm:col-span-3">
    //           <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
    //             First name
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               type="text"
    //               name="first-name"
    //               id="first-name"
    //               autoComplete="given-name"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-3">
    //           <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
    //             Last name
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               type="text"
    //               name="last-name"
    //               id="last-name"
    //               autoComplete="family-name"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-4">
    //           <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
    //             Email address
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               id="email"
    //               name="email"
    //               type="email"
    //               autoComplete="email"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-3">
    //           <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
    //             Country
    //           </label>
    //           <div className="mt-2">
    //             <select
    //               id="country"
    //               name="country"
    //               autoComplete="country-name"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
    //             >
    //               <option>United States</option>
    //               <option>Canada</option>
    //               <option>Mexico</option>
    //             </select>
    //           </div>
    //         </div>

    //         <div className="col-span-full">
    //           <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
    //             Street address
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               type="text"
    //               name="street-address"
    //               id="street-address"
    //               autoComplete="street-address"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-2 sm:col-start-1">
    //           <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
    //             City
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               type="text"
    //               name="city"
    //               id="city"
    //               autoComplete="address-level2"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-2">
    //           <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
    //             State / Province
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               type="text"
    //               name="region"
    //               id="region"
    //               autoComplete="address-level1"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-2">
    //           <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
    //             ZIP / Postal code
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               type="text"
    //               name="postal-code"
    //               id="postal-code"
    //               autoComplete="postal-code"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="mt-6 flex items-center justify-end gap-x-6">
    //     <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
    //       Cancel
    //     </button>
    //     <button
    //       type="submit"
    //       className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //     >
    //       Save
    //     </button>
    //   </div>
    // </form>
    // );


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
        <Link href='/available-rides'>
          <button type="submit" className={styles.submitButton}>Submit</button>
        </Link>
        
      </form>
      
    </div>
  );
};

export default PassengerRegistration;