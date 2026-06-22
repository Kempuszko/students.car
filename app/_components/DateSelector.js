"use client";

import { pl } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import H3 from "./H3";
import { useBooking } from "../_context/BookingContext";
import { calcRangeToDays } from "../_helpers/helperFunctions";

function DateSelector({ RentPrice, bookedDates }) {
  const { range, setRange } = useBooking();

  console.log(range);

  return (
    <>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        disabled={[{ before: new Date() }, ...bookedDates]}
        locale={pl}
        startMonth={new Date()}
        classNames={{
          selected: "!bg-gold !text-background rounded-lg",
          range_middle: "!bg-surfaceHover !text-white rounded-none",
          range_start: "!bg-gold-dark rounded-l-2xl",
          range_end: "!bg-gold-dark rounded-r-2xl",
          day: "hover:bg-gold/20 hover:text-gold transition-all rounded-lg",
          today: "text-gold-dark",
          button_next: "pointer cursor-pointer transition-all duration-150",
          button_previous: "cursor-pointer transition-all duration-150",
        }}
      />
      {range || range?.from || range?.to ? (
        <H3>Cena za okres wynajmu: {calcRangeToDays(range) * RentPrice} zł</H3>
      ) : (
        ""
      )}
    </>
  );
}

export default DateSelector;
