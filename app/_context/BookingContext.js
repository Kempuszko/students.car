"use client";

import { createContext, useContext, useState } from "react";

const BookingContext = createContext(undefined);

export function BookingProvider({ children }) {
  const [range, setRange] = useState(undefined);

  return (
    <BookingContext.Provider value={{ range, setRange }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
