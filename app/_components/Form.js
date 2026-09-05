"use client";
import { useState, useEffect, useActionState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Input from "./Input";
import H1 from "./H1";
import H2 from "./H2";
import H3 from "./H3";
import { useBooking } from "../_context/BookingContext";
import { calcRangeToDays } from "../_helpers/helperFunctions";
import { addReservation } from "../dataProvider/data";

function Form({ rentPrice, deposit, carId }) {
  const { range, setRange } = useBooking();
  const [isStudentId, setStudentId] = useState("");
  const [rulesConfirmationChecked, setRulesConfirmationChecked] =
    useState(undefined);
  const [
    driverLicenseConfirmationChecked,
    setDriverLicenseConfirmationChecked,
  ] = useState(undefined);
  const numOfDays = calcRangeToDays(range);

  const addReservationWithRange = addReservation.bind(null, range);
  const [state, formAction, isPending] = useActionState(
    addReservationWithRange,
    {
      success: null,
      message: "",
    },
  );

  useEffect(() => {
    if (state.success === null) return;
    if (state.success === true) {
      toast.success("Pomyślnie zarezerwowano!");
      setRange(null);
    } else if (state.success === false) {
      toast.error("Rezerwacja nie udała się");
    }
  }, [state.timestamp, setRange, state.success]);

  return (
    <form
      action={formAction}
      className="mt-12 p-8 mx-12 bg-surface border border-gray-800 rounded-2xl flex gap-16"
    >
      <div className="flex flex-col gap-3">
        <Input
          type="text"
          placeholder="Imie i nazwisko"
          name="name"
          required={true}
        />
        <Input type="email" placeholder="E-mail" name="email" required={true} />
        <Input
          type="text"
          placeholder="Numer Telefonu"
          name="phoneNumber"
          required={true}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength="9"
        />
        <Input
          type="text"
          placeholder="PESEL"
          name="pesel"
          required={true}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength="11"
        />
        <Input
          type="text"
          placeholder="Numer Prawa Jazdy"
          name="drivesLicenseNumber"
          required={true}
          maxLength="9"
        />
        <Input
          type="text"
          placeholder="Numer Legitymacji Studenckiej"
          name="studentIdNumber"
          onChange={(e) => setStudentId(e.target.value)}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength="11"
        />
        <input
          type="hidden"
          name="totalPrice"
          value={
            (rentPrice * numOfDays + (isStudentId ? 0 : deposit)) *
            (isStudentId ? 0.85 : 1)
          }
        />
        <input type="hidden" name="carId" value={carId} />
        <div>
          <input
            type="checkbox"
            id="rulesConfirmation"
            required={true}
            onChange={(e) => setRulesConfirmationChecked(e.target.checked)}
            value={rulesConfirmationChecked}
          />{" "}
          <label htmlFor="rulesConfirmation">
            Akceptuję{" "}
            <Link href="/application/files" className="text-gold">
              regulamin
            </Link>{" "}
            serwisu Students.car oraz Politykę Prywatności.
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="driverLicenseConfirmation"
            required={true}
            onChange={(e) =>
              setDriverLicenseConfirmationChecked(e.target.checked)
            }
            value={driverLicenseConfirmationChecked}
          />{" "}
          <label htmlFor="driverLicenseConfirmation">
            Oświadczam, że posiadam ważne prawo jazdy kategorii B od minimum 12
            miesięcy.
          </label>
        </div>
      </div>
      <div className="w-90 flex flex-col justify-between">
        <div className="flex flex-col">
          <H2 customClassName="text-gold-light text-center">
            Podsumowanie kosztów
          </H2>
          {range ? (
            <>
              <section className="flex justify-between items-center">
                <H3 customClassName="text-gold">Wybrane Dni:</H3>
                <p className="font-semibold">
                  {`${range?.from?.toLocaleDateString()} -
            ${range?.to?.toLocaleDateString()}`}
                </p>
              </section>
              <section className="flex justify-between items-center">
                <H3 customClassName="text-gold">Ilosc Dni:</H3>
                <p className="font-semibold">{`${numOfDays} Dni`}</p>
              </section>
              <section className="flex justify-between items-center">
                <H3 customClassName="text-gold">Cena:</H3>
                <p className="font-semibold">{`${rentPrice} PLN * ${numOfDays} dni = ${rentPrice * numOfDays} PLN`}</p>
              </section>
              <section className="flex justify-between items-center">
                <H3 customClassName="text-gold">Kaucja:</H3>
                <p
                  className={`font-semibold ${isStudentId ? "text-green-500" : ""}`}
                >
                  {isStudentId
                    ? `0 PLN - studenci nie placa kaucji!`
                    : `${deposit} PLN`}
                </p>
              </section>
              {isStudentId ? (
                <section className="flex justify-between items-center">
                  <H3 customClassName="text-gold">Zniżka:</H3>
                  <p className={`font-semibold text-green-500`}>
                    15% dla studentów
                  </p>
                </section>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="w-full flex flex-col">
          <section className="flex justify-between items-center">
            {range ? (
              <>
                <H1 customClassName="text-gold-light">Do zapłaty</H1>
                <p className="font-bold text-center text-xl ">
                  {(rentPrice * numOfDays + (isStudentId ? 0 : deposit)) *
                    (isStudentId ? 0.85 : 1)}{" "}
                  PLN
                </p>
              </>
            ) : (
              ""
            )}
          </section>
          <button
            disabled={
              !rulesConfirmationChecked ||
              !driverLicenseConfirmationChecked ||
              !range ||
              isPending
            }
            type="submit"
            className="bg-gold text-black px-6 py-3 rounded-xl font-bold mt-4 cursor-pointer"
          >
            {isPending ? "Rezerwuje..." : "Zarezerwuj"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
