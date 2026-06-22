"use server";

import { query } from "../lib/db";
import { revalidatePath } from "next/cache";

export async function getCars() {
  try {
    const carsFromDb = await query(
      "SELECT id, name, price, src, technical, practicality FROM cars",
    );

    return carsFromDb.map((car) => ({
      id: car.id.toString(),
      name: car.name,
      price: parseFloat(car.price),
      src: car.src,
      technical: car.technical ? car.technical.split(";") : [],
      practicality: car.practicality ? car.practicality.split(";") : [],
    }));
  } catch {
    return [];
  }
}

export async function getCar(carId) {
  try {
    const [carFromDb] = await query(`SELECT * FROM cars WHERE id = ?`, [carId]);

    return {
      id: carFromDb.id.toString(),
      name: carFromDb.name,
      price: parseFloat(carFromDb.price),
      deposit: carFromDb.deposit,
      src: carFromDb.src,
      technical: carFromDb.technical ? carFromDb.technical.split(";") : [],
      practicality: carFromDb.practicality
        ? carFromDb.practicality.split(";")
        : [],
      technology: carFromDb.technology ? carFromDb.technology.split(";") : [],
      rentalConditions: carFromDb.rentalConditions
        ? carFromDb.rentalConditions.split(";")
        : [],
    };
  } catch {
    return [];
  }
}

export async function getBookedDates(carId) {
  try {
    const rows = await query(
      "SELECT date_from, date_to FROM reservations WHERE car_id = ? AND date_to >= CURDATE()",
      [carId],
    );

    return rows.map((row) => ({
      from: new Date(row.date_from),
      to: new Date(row.date_to),
    }));
  } catch (error) {
    console.error("Błąd pobierania zajętych dat:", error);
    return [];
  }
}

export async function addReservation(range, prevState, formData) {
  const data = {
    ...Object.fromEntries(formData.entries()),
    dateFrom: range?.from,
    dateTo: range?.to,
  };

  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedDateFrom = formatter.format(new Date(data.dateFrom));
  const formattedDateTo = formatter.format(new Date(data.dateTo));

  try {
    const insertQuery = `
      INSERT INTO reservations (
        car_id,
        name,
        email,
        phone_number,
        pesel,
        drivers_license_number,
        student_id_number,
        total_price,
        date_from,
        date_to
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await query(insertQuery, [
      data.carId,
      data.name,
      data.email,
      data.phoneNumber,
      data.pesel,
      data.drivesLicenseNumber,
      data.studentIdNumber || null,
      data.totalPrice,
      formattedDateFrom,
      formattedDateTo,
    ]);

    revalidatePath("/application/calendar");

    return {
      success: true,
      message: "Pomyślnie zapisano rezerwację!",
      timestamp: new Date(),
    };
  } catch (error) {
    return { success: false, message: "Błąd zapisu do bazy danych." };
  }
}

export async function getMostReservedCars() {
  try {
    const carsFromDb = await query(
      "SELECT id, name, price, src, timesReserved FROM cars ORDER BY TimesReserved DESC LIMIT 3",
    );

    return carsFromDb.map((car) => ({
      id: car.id.toString(),
      name: car.name,
      price: parseFloat(car.price),
      timesReserved: car.timesReserved,
      src: car.src,
    }));
  } catch {
    return [];
  }
}
