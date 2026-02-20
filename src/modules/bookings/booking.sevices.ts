import { pool } from "../../config/db";

const createBookingInDB = async (payLoad: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payLoad;

  const result = await pool.query(
    `
    INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) 
    VALUES($1, $2, $3, $4, 
    ( ($4::date - $3::date) * (SELECT daily_rent_price FROM vehicles WHERE id=$2) ), 
    'active'
) RETURNING *
    `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date],
  );
  const vehicleResult = await pool.query(
    `
    UPDATE vehicles SET availability_status = 'booked'
    WHERE id = $1
    RETURNING vehicle_name, daily_rent_price
    `,
    [vehicle_id],
  );
  const booking = result.rows[0];
  const vehicle = vehicleResult.rows[0];
  console.log(booking, vehicle);
  return {
    id: booking.id,
    customer_id: booking.customer_id,
    vehicle_id: booking.vehicle_id,
    rent_start_date: booking.rent_start_date,
    rent_end_date: booking.rent_end_date,
    total_price: booking.total_price,
    status: booking.status,
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

const getBookingInDB = async () => {
  const result = await pool.query(`
    SELECT 
     *
    FROM bookings b
    JOIN users u ON b.customer_id = u.id
    JOIN vehicles v ON b.vehicle_id = v.id
  `);

  return result.rows.map((row) => ({
    id: row.id,
    customer_id: row.customer_id,
    vehicle_id: row.vehicle_id,
    rent_start_date: row.rent_start_date,
    rent_end_date: row.rent_end_date,
    total_price: row.total_price,
    status: row.status,
    customer: {
      name: row.name,
      email: row.email,
    },
    vehicle: {
      vehicle_name: row.vehicle_name,
      registration_number: row.registration_number,
    },
  }));
};

const getSingleBookingInDB = async (id:string) =>{
    const result = await pool.query(
      `
        SELECT b.id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      b.total_price,
      b.status,
      v.vehicle_name,
      v.registration_number,
      v.type FROM bookings b JOIN vehicles v ON b.vehicle_id = v.id WHERE customer_id=$1
        `,
      [id],
    );
       return result.rows.map((row) => ({
         id: row.id,
         vehicle_id: row.vehicle_id,
         rent_start_date: row.rent_start_date,
         rent_end_date: row.rent_end_date,
         total_price: row.total_price,
         status: row.status,
         vehicle: {
           vehicle_name: row.vehicle_name,
           registration_number: row.registration_number,
           type: row.type,
         },
       }));
}


export const bookingServicers = {
  createBookingInDB,
  getBookingInDB,
  getSingleBookingInDB,
};
