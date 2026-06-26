"use server";

import { query } from "../lib/db";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { cookies } from "next/headers";

export async function loginAdmin(prevState, formData) {
  const crypto = require("crypto");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { success: false, message: "Wypełnij wszystkie pola!" };
  }

  const hashPassword = (password) =>
    crypto.createHash("sha256").update(password).digest("hex");

  const hashedPassword = hashPassword(password);

  try {
    const admin = await query(
      "SELECT * FROM admins WHERE email = ? AND password = ?",
      [email, hashedPassword],
    );

    if (admin.length === 0) {
      return { success: false, message: "Błędny login lub hasło!" };
    }

    const token = crypto.randomUUID();

    const expiresDate = new Date(Date.now() + 1000 * 60 * 60 * 2);

    const formatter = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Europe/Warsaw",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const formattedExpiresAt = formatter.format(expiresDate).replace(",", "");

    await query("DELETE FROM admin_sessions WHERE expires_at < NOW()");
    await query(
      "INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)",
      [token, formattedExpiresAt],
    );

    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresDate,
      path: "/",
    });

    return { success: true, message: "Zalogowano pomyślnie!" };
  } catch (error) {
    console.error("Błąd serwera przy logowaniu:", error);
    return { success: false, message: "Problem techniczny z bazą danych." };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (token) {
    await query("DELETE FROM admin_sessions WHERE token = ?", [token]);
  }

  cookieStore.delete("admin_session");
}

export async function getCars(all = false) {
  try {
    const chooseQuery = all
      ? "SELECT id, name, price, deposit, src, technical, practicality, technology, rentalConditions FROM cars"
      : "SELECT id, name, price, src, technical, practicality FROM cars";

    const cars = await query(chooseQuery);

    return cars.map((car) => ({
      id: car.id.toString(),
      name: car.name,
      price: parseFloat(car.price),
      deposit: car.deposit,
      src: car.src,
      technical: car.technical ? car.technical.split(";") : [],
      practicality: car.practicality ? car.practicality.split(";") : [],
      technology: car.technology ? car.technology.split(";") : [],
      rentalConditions: car.rentalConditions
        ? car.rentalConditions.split(";")
        : [],
    }));
  } catch {
    return [];
  }
}

export async function getReservations() {
  try {
    const reservations = await query(
      "SELECT r.id, c.name as car_name, r.name as client_name, r.email, r.phone_number, r.pesel, r.drivers_license_number, r.student_id_number, r.total_price, r.date_from, r.date_to FROM reservations as r JOIN cars as c on r.car_id = c.id",
    );

    return reservations.map((reservation) => ({
      id: reservation.id.toString(),
      carName: reservation.car_name,
      clientName: reservation.client_name,
      email: reservation.email,
      phoneNumber: reservation.phone_number,
      pesel: reservation.pesel,
      driversLicenseNumber: reservation.drivers_license_number,
      studentIdNumber: reservation.student_id_number,
      totalPrice: reservation.total_price,
      dateFrom: reservation.date_from.toLocaleDateString("pl-PL"),
      dateTo: reservation.date_to.toLocaleDateString("pl-PL"),
    }));
  } catch {
    return [];
  }
}

export async function getUserReservations(ids) {
  const placeholders = ids.map(() => "?").join(", ");

  try {
    const reservations = await query(
      `SELECT r.id, c.name as car_name, r.name as client_name, r.email, r.phone_number, r.pesel, r.drivers_license_number, r.student_id_number, r.total_price, r.date_from, r.date_to FROM reservations as r JOIN cars as c on r.car_id = c.id WHERE r.id IN (${placeholders})`,
      ids,
    );

    return reservations.map((reservation) => ({
      id: reservation.id.toString(),
      carName: reservation.car_name,
      clientName: reservation.client_name,
      email: reservation.email,
      phoneNumber: reservation.phone_number,
      pesel: reservation.pesel,
      driversLicenseNumber: reservation.drivers_license_number,
      studentIdNumber: reservation.student_id_number,
      totalPrice: reservation.total_price,
      dateFrom: reservation.date_from.toLocaleDateString("pl-PL"),
      dateTo: reservation.date_to.toLocaleDateString("pl-PL"),
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

  const cookieStore = await cookies();
  const existingCookies = cookieStore.get("my_reservations")?.value;

  let reservationIds = [];
  if (existingCookies) {
    try {
      reservationIds = JSON.parse(existingCookies);
    } catch (e) {
      reservationIds = [];
    }
  }

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

    const result = await query(insertQuery, [
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

    if (!reservationIds.includes(result.insertId)) {
      reservationIds.push(result.insertId);
    }

    cookieStore.set("my_reservations", JSON.stringify(reservationIds), {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    revalidatePath("/application/calendar");
    revalidatePath("/application/reservation");
    revalidatePath("/application/cars");
    revalidatePath("/");

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

export async function insertCar(prevState, formData) {
  const data = { ...Object.fromEntries(formData.entries()) };

  try {
    await query(
      `INSERT INTO cars (name, price, deposit, src, technical, practicality, technology, rentalConditions) VALUES (
        ?, ?, ?, ?, ?,  ?,  ?, ?) `,
      [
        data.name,
        data.price,
        data.deposit,
        data.src,
        data.technical,
        data.practicality,
        data.technology,
        data.rentalConditions,
      ],
    );

    revalidatePath("/application/admin");
    revalidatePath("/application/cars");

    return { success: true, message: "Pomyślnie Dodano!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function updateCar(prevState, formData) {
  const data = { ...Object.fromEntries(formData.entries()) };

  try {
    await query(
      `UPDATE cars SET 
        name = ?, price = ?, deposit = ?, src = ?, 
        technical = ?, practicality = ?, technology = ?, rentalConditions = ? 
       WHERE id = ?`,
      [
        data.name,
        data.price,
        data.deposit,
        data.src,
        data.technical,
        data.practicality,
        data.technology,
        data.rentalConditions,
        data.id,
      ],
    );

    revalidatePath("/application/admin");
    revalidatePath("/application/cars");
    revalidatePath("/");

    return { success: true, message: "Pomyślnie Zedytowano!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function deleteCar(prevState, formData) {
  const id = formData.get("id");

  try {
    await query(`DELETE FROM cars WHERE id = ?`, [id]);

    revalidatePath("/application/admin");
    revalidatePath("/application/cars");
    revalidatePath("/");

    return { success: true, message: "Pomyślnie usunięto!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function updateReservation(prevState, formData) {
  const data = { ...Object.fromEntries(formData.entries()) };
  try {
    await query(
      `UPDATE reservations SET 
        name = ?, email = ?, phone_number = ?, pesel = ?, 
        drivers_license_number = ?, student_id_number = ?
       WHERE id = ?`,
      [
        data.name,
        data.email,
        data.phoneNumber,
        data.pesel,
        data.driversLicenseNumber,
        data.studentIdNumber,
        data.id,
      ],
    );

    revalidatePath("/application/admin");
    revalidatePath("/application/reservation");

    return { success: true, message: "Pomyślnie Zedytowano!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function deleteReservation(prevState, formData) {
  const id = formData.get("id");

  try {
    await query(`DELETE FROM reservations WHERE id = ?`, [id]);

    const cookieStore = await cookies();
    const existingCookies = cookieStore.get("my_reservations")?.value;

    if (existingCookies) {
      try {
        const reservationIds = JSON.parse(existingCookies);

        const updatedIds = reservationIds.filter(
          (id) => Number(id) !== Number(id),
        );

        if (updatedIds.length === 0) {
          cookieStore.delete("my_reservations");
        } else {
          cookieStore.set("my_reservations", JSON.stringify(updatedIds), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
          });
        }
      } catch (e) {
        console.error("Błąd parsowania ciasteczka przy usuwaniu:", e);
      }
    }

    revalidatePath("/application/admin");
    revalidatePath("/application/cars");
    revalidatePath("/application/reservation");

    return { success: true, message: "Pomyślnie usunięto!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
