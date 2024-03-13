'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/available-rides.module.css';

const AvailableRides = () => {
  const router = useRouter();
  const [filter, setFilter] = useState({
    time: '',
    source: '',
    destination: '',
    date: '',
  });

  const [filteredRides, setFilteredRides] = useState([]);

  const availableRides = [
    {
      driverName: 'John Doe',
      car: 'Toyota Camry',
      passengers: 3,
      source: 'City A',
      destination: 'City B',
      startTime: '10:00 ',
      date: '2024-03-15',
      price: 'Rs.20',
    },
    {
      driverName: 'Jane Smith',
      car: 'Honda Civic',
      passengers: 2,
      source: 'City C',
      destination: 'City D',
      startTime: '11:30 ',
      date: '2024-03-16',
      price: 'Rs.15',
    },
    {
      driverName: 'Alice Johnson',
      car: 'Ford Fusion',
      passengers: 4,
      source: 'City B',
      destination: 'City A',
      startTime: '12:00 ',
      date: '2024-03-17',
      price: 'Rs.25',
    },
    {
      driverName: 'Bob Wilson',
      car: 'Chevrolet Cruze',
      passengers: 3,
      source: 'City D',
      destination: 'City C',
      startTime: '13:00 ',
      date: '2024-03-18',
      price: 'Rs.18',
    },
    {
      driverName: 'Eva Brown',
      car: 'Nissan Altima',
      passengers: 2,
      source: 'City A',
      destination: 'City C',
      startTime: '14:30 ',
      date: '2024-03-19',
      price: 'Rs.22',
    },
    {
      driverName: 'Michael Clark',
      car: 'Honda Accord',
      passengers: 4,
      source: 'City D',
      destination: 'City B',
      startTime: '15:30',
      date: '2024-03-20',
      price: 'Rs.30',
    },
  ];
  

  const availableTimes = [
    '00:00', '00:30',
    '01:00', '01:30',
    '02:00', '02:30',
    '03:00', '03:30',
    '04:00', '04:30',
    '05:00', '05:30',
    '06:00', '06:30',
    '07:00', '07:30',
    '08:00', '08:30',
    '09:00', '09:30',
    '10:00', '10:30',
    '11:00', '11:30',
    '12:00', '12:30',
    '13:00', '13:30',
    '14:00', '14:30',
    '15:00', '15:30',
    '16:00', '16:30',
    '17:00', '17:30',
    '18:00', '18:30',
    '19:00', '19:30',
    '20:00', '20:30',
    '21:00', '21:30',
    '22:00', '22:30',
    '23:00', '23:30',
  ];
  
  const availableSources = ['City A', 'City B', 'City C', 'City D']; 

  const availableDestinations = ['City A', 'City B', 'City C', 'City D']; 

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const applyFilters = () => {
    const filtered = availableRides.filter((ride) => {
      let match = true;
      if (filter.time && ride.startTime < filter.time) {
        match = false;
      }
      if (filter.source && ride.source !== filter.source) {
        match = false;
      }
      if (filter.destination && ride.destination !== filter.destination) {
        match = false;
      }
      if (filter.date && ride.date !== filter.date) {
        match = false;
      }
      return match;
    });
    setFilteredRides(filtered);
  };

  const handleBook = (index) => {
    console.log(`Booked ride ${index}`);
    const bookedRideDetails = filteredRides[index];
    localStorage.setItem('bookedRide', JSON.stringify(bookedRideDetails));
    router.push('/ride-booked');
};

  

return (
    <div className={styles.pageContainer}>
        <div className={styles.container}>
            <div className={styles.filterContainer}>
                <div>
                    <label htmlFor="time">Time:</label>
                    <select
                        id="time"
                        name="time"
                        value={filter.time}
                        onChange={handleFilterChange}
                    >
                        <option value="">Select Time</option>
                        {availableTimes.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="source">Source:</label>
                    <select
                        id="source"
                        name="source"
                        value={filter.source}
                        onChange={handleFilterChange}
                    >
                        <option value="">Select Source</option>
                        {availableSources.map((source, index) => (
                            <option key={index} value={source}>
                                {source}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="destination">Destination:</label>
                    <select
                        id="destination"
                        name="destination"
                        value={filter.destination}
                        onChange={handleFilterChange}
                    >
                        <option value="">Select Destination</option>
                        {availableDestinations.map((destination, index) => (
                            <option key={index} value={destination}>
                                {destination}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={filter.date}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.filterButton} onClick={applyFilters}>
                        Apply Filters
                    </button>
                </div>
            </div>
            <div className={styles.ridesContainer}>
                {filteredRides.length > 0
                    ? filteredRides.map((ride, index) => (
                        <div className={styles.rideBox} key={index}>
                            <p>Driver: {ride.driverName}</p>
                            <p>Car: {ride.car}</p>
                            <p>Passengers: {ride.passengers}</p>
                            <p>Source: {ride.source}</p>
                            <p>Destination: {ride.destination}</p>
                            <p>Start Time: {ride.startTime}</p>
                            <p>Date: {ride.date}</p>
                            <p>Price: {ride.price}</p>
                            <button className={styles.bookButton} onClick={() => handleBook(index)}>Book</button>
                        </div>
                    ))
                    : availableRides.map((ride, index) => (
                        <div className={styles.rideBox} key={index}>
                            <p>Driver: {ride.driverName}</p>
                            <p>Car: {ride.car}</p>
                            <p>Passengers: {ride.passengers}</p>
                            <p>Source: {ride.source}</p>
                            <p>Destination: {ride.destination}</p>
                            <p>Start Time: {ride.startTime}</p>
                            <p>Date: {ride.date}</p>
                            <p>Price: {ride.price}</p>
                            <button className={styles.bookButton} onClick={() => handleBook(index)}>Book</button>
                        </div>
                    ))}
            </div>
        </div>
    </div>
);
};

export default AvailableRides;

