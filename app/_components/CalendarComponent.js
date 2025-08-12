"use client";

import Form from "@/app/_components/Form";
import Modal from "@/app/_components/Modal";
import { add, format } from "date-fns";
import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";

function CalendarComponent({ eventDays, session }) {
  const [selected, setSelected] = useState(null);
  const [isShowing, setIsShowing] = useState(false);
  const filteredEventDays = eventDays?.filter(
    (e) => e.eventDate === format(selected, "dd/MM/yyyy")
  );

  return (
    <>
      <div className="flex flex-col 2xl:justify-between 2xs:gap-2 md:gap-8 2xl:gap-16 py-4 xl:py-8 2xl:py-12">
        <DayPicker
          className="self-center"
          mode="single"
          onSelect={setSelected}
          selected={selected}
          startMonth={new Date()}
          endMonth={add(new Date(), { months: 5 })}
          numberOfMonths={1}
          classNames={{
            today: "[&>*]:ring-4 [&>*]:dark:ring-blue-600 [&>*]:ring-amber-500",
            selected: `[&>*]:bg-amber-400  [&>*]:dark:bg-blue-800  [&>*]:text-xl  [&>*]:font-semibold `,
            chevron: `${getDefaultClassNames.chevron} fill-amber-500 dark:fill-blue-800 focus:ring-4 dark:ring-blue-800 ring-amber-300 outline-none focus:outline-none`,
          }}
          components={{
            DayButton: (props) => {
              const { day, ...buttonProps } = props;
              return (
                <button
                  {...buttonProps}
                  className={`${
                    eventDays.filter(
                      (e) => e.eventDate === format(day.date, "dd/MM/yyyy")
                    ).length > 0
                      ? "dark:bg-red-900 bg-red-400"
                      : ""
                  } transition-[background-color,_box-shadow] cursor-pointer bg-amber-200 dark:bg-blue-950 hover: w-10 h-10 m-1 rounded-full `}
                  onClick={(e) => {
                    selected?.toString() === day.date.toString()
                      ? setIsShowing(true)
                      : setSelected(day.date);
                  }}
                />
              );
            },
          }}
        />
        {isShowing && (
          <Modal
            userId={session.user.userId}
            type="calendar"
            title={`Wydarzenia w dniu: ${selected.toLocaleDateString()}`}
            onClose={() => setIsShowing(false)}
            dayInfo={filteredEventDays.length > 0 ? filteredEventDays : null}
          />
        )}
        <Form type="calendar" selected={selected} />
      </div>
    </>
  );
}

export default CalendarComponent;
