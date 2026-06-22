import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Pobieramy wszystkie samochody z bazy danych
    const carsFromDb = await query("SELECT * FROM cars");

    // 2. Mapujemy wyniki i zamieniamy stringi rozdzielone średnikami na tablice (Array)
    const formattedCars = carsFromDb.map((car) => ({
      id: car.id.toString(), // Zamieniamy ID na string, żeby pasowało do Twojego wzoru
      name: car.name,
      price: parseFloat(car.price), // MySQL zwraca DECIMAL jako string/number, upewniamy się, że to liczba
      src: car.src,
      technical: car.technical ? car.technical.split(";") : [],
      practicality: car.practicality ? car.practicality.split(";") : [],
      technology: car.technology ? car.technology.split(";") : [],
      rentalConditions: car.rentalConditions
        ? car.rentalConditions.split(";")
        : [],
    }));

    // 3. Zwracamy czysty, sformatowany obiekt JSON do front-endu
    return NextResponse.json(formattedCars);
  } catch (error) {
    return NextResponse.json(
      { error: "Nie udało się pobrać danych z bazy" },
      { status: 500 },
    );
  }
}
