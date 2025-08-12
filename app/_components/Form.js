import { HiOutlineClock } from "react-icons/hi2";
import { createCalendarEvent, deleteCalendarEvent } from "../_lib/actions";
import Button from "./Button";
import Input from "./Input.js";
import Select from "./Select";
import toast from "react-hot-toast";
import { format } from "date-fns";

function Form({ selected, type, action, userId, close, text, data }) {
  if (type === "post")
    return (
      <form
        className="flex flex-col items-center gap-8"
        action={(formData) => {
          action(formData);
          close();
          toast.success(
            `Pomyslnie ${text === "Edytuj" ? "zedytowano" : "dodano"}`
          );
        }}
      >
        <Input
          type="text"
          placeholder="Tytul"
          name="postTitle"
          defaultValue={text && data.postTitle}
          required={true}
        />
        <Input
          type="textarea"
          placeholder="Tresc..."
          name="postDescription"
          defaultValue={text && data.postDescription}
          required={true}
        />
        <input type="hidden" value={userId} name="postCreatedBy" />
        {text && <input type="hidden" value={data.id} name="id" />}
        <Button pendingMessage="Dodawanie...">{text || "Dodaj"}</Button>
      </form>
    );

  if (type === "calendar")
    return (
      <form
        className=" 2xl:w-2xl h-1/2 2xl:mx-auto flex flex-col 2xl:gap-6 md:gap-4 2xs:gap-2"
        action={(formData) => {
          if (formData.get("eventDate") === "01/01/1970") {
            toast.success("Wybierz dzień");
            return;
          }
          createCalendarEvent(formData);
          toast.success("Pomyslnie dodano");
        }}
      >
        <input
          type="hidden"
          name="eventDate"
          value={selected ? format(selected, "dd/MM/yyyy") : "01/01/1970"}
        />
        <div className="flex justify-center gap-14 items-center">
          <div className="flex items-center gap-2">
            <HiOutlineClock />
            <label className="font-bold">Godzina:</label>
          </div>
          <div className="flex gap-2">
            <Select type="hours" name="timeHours" />
            <Select type="minutes" name="timeMinutes" />
          </div>
        </div>
        <Input
          type="textarea"
          placeholder="Wydarzenie..."
          name="eventDescription"
          required={true}
        />
        <div className="flex justify-center gap-16">
          <Button type="reset" pendingMessage="Reset">
            Reset
          </Button>
          <Button type="submit" pendingMessage="Dodawanie...">
            Potwierdź
          </Button>
        </div>
        {selected === null && (
          <p className="self-center font-semibold text-xl">
            Pamietaj aby wybrac dzien!
          </p>
        )}
      </form>
    );
  if (type === "calendarEdit")
    return (
      <form
        className="mx-auto flex flex-col gap-6"
        action={(formData) => {
          action(formData);
          close();
          toast.success("Pomyslnie zedytowano");
        }}
      >
        <input type="hidden" name="id" value={data.id} />
        <input
          type="hidden"
          name="eventCreatedBy"
          value={data.eventCreatedBy}
        />
        <div className="flex justify-center gap-14 items-center">
          <div className="flex items-center gap-2">
            <HiOutlineClock />
            <label className="font-bold">Godzina:</label>
          </div>
          <div className="flex gap-2">
            <Select
              type="hours"
              name="timeHours"
              defaultValue={data.eventTime.slice(0, 2)}
            />
            <Select
              type="minutes"
              name="timeMinutes"
              defaultValue={data.eventTime.slice(3, 5)}
            />
          </div>
        </div>
        <Input
          type="textarea"
          defaultValue={data.eventDescription}
          placeholder="Wydarzenie..."
          name="eventDescription"
          required={true}
        />
        <div className="flex justify-center gap-16">
          <Button
            pendingMessage="Usuń"
            onClick={(e) => {
              e.preventDefault();
              deleteCalendarEvent(data.id);
              toast.success("Pomyslnie usunieto");
            }}
          >
            Usuń
          </Button>
          <Button type="submit" pendingMessage="Dodawanie...">
            Potwierdź
          </Button>
        </div>
      </form>
    );
}

export default Form;
