# Vehicle Rental System API

**Live Deployment:** [https://vehicle-rental-system-sepia-eight.vercel.app/](https://vehicle-rental-system-sepia-eight.vercel.app/)

## Project Overview
A complete backend API for a vehicle rental management system. It handles vehicle inventory, secure customer accounts, and role-based booking management with automatic price calculations.

## Technology Stack
This project was built using the following technologies:
* Node.js
* TypeScript
* Express.js
* PostgreSQL
* bcrypt (Password Hashing)
* jsonwebtoken (JWT Authentication)

## Core Features
* **Role-Based Access Control:** Secure routes strictly separated for Admins and Customers.
* **Vehicle Management:** Full CRUD operations for the vehicle fleet, automatically tracking `available` and `booked` statuses.
* **Smart Booking System:** Validates vehicle availability, calculates rental costs based on duration, and prevents overlapping dates.
* **Automated Status Updates:** Canceling or returning a vehicle instantly frees it up in the database for the next customer.
* **Data Integrity:** Strict relational constraints prevent the accidental deletion of users or vehicles that have active bookings.

## 🚀 Setup & Usage Instructions

### Prerequisites
* Node.js installed
* A PostgreSQL database instance

### Installation
1. Clone the repository:
    ```bash
   git clone [https://github.com/Yeasir7/level_2_assignment_2.git](https://github.com/Yeasir7/level_2_assignment_2.git)
```

2. Navigate into the directory and install dependencies:
```bash
 npm install
```

3. Create a .env file in the root directory and add your environment variables:
```env
PORT=5000
CONNECTION_STRING=your_postgresql_connection_string
JWT_SECRET=your_super_secret_key
```

4. Start the development server:
```bash
npm run dev
```