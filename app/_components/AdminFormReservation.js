"use client";

import { useActionState, useEffect, useState } from "react";
import AdminInput from "./AdminInput";
import { deleteReservation, updateReservation } from "../dataProvider/data";
import toast from "react-hot-toast";

function AdminFormReservation({ reservation }) {
  const [isNotEditing, setIsNotEditing] = useState(true);
  const [state, formAction, isPending] = useActionState(updateReservation, {
    success: null,
    message: "",
  });

  const [deleteState, deleteFormAction, deleteIsPending] = useActionState(
    deleteReservation,
    {
      success: null,
      message: "",
    },
  );

  function handleEdit(e) {
    e.preventDefault();
    setIsNotEditing((b) => !b);
  }

  function handleEdit(e) {
    e.preventDefault();
    setIsNotEditing((b) => !b);
  }

  useEffect(() => {
    if (state.success === true) {
      setIsNotEditing(true);
      if (state.message) toast.success(state.message);
    } else if (state.success === false) {
      if (state.message) toast.error(state.message);
    }

    if (deleteState.success === true) {
      setIsNotEditing(true);
      if (deleteState.message) toast.success(deleteState.message);
    } else if (deleteState.success === false) {
      if (deleteState.message) toast.error(deleteState.message);
    }
  }, [state, deleteState]);

  return (
    <form
      action={formAction}
      className="mx-6 w-full p-6 border-2 border-surfaceHover rounded-2xl"
    >
      <div className="flex gap-12 p-4">
        <p className="font-bold text-gold">{`Rezerwacja nr: ${reservation.id}`}</p>
        <button
          disabled={isPending}
          onClick={handleEdit}
          className="cursor-pointer"
        >
          {isNotEditing ? "Edytuj" : "Wyłącz edycje"}
        </button>
        <button disabled={isPending || deleteIsPending || isNotEditing}>
          {isPending ? "Zapisywanie" : "Zapisz"}
        </button>
        <button
          disabled={isPending || deleteIsPending}
          formAction={deleteFormAction}
        >
          {deleteIsPending ? "Usuwanie" : "Usuń"}
        </button>
      </div>
      <div className="grid grid-rows-[auto_auto] gap-4">
        <div className="grid grid-cols-4 gap-4">
          <AdminInput text="Auto" data={reservation.carName} disabled={true} />
          <AdminInput
            text="Cena"
            data={reservation.totalPrice}
            formName={"price"}
            disabled={true}
          />
          <AdminInput
            text="Data od"
            data={reservation.dateFrom}
            formName={"dateFrom"}
            disabled={true}
          />
          <AdminInput
            text="Data do"
            data={reservation.dateTo}
            formName={"dateTo"}
            disabled={true}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <AdminInput
            text="Dane"
            data={reservation.clientName}
            formName={"name"}
            disabled={isNotEditing}
          />
          <AdminInput
            text="E-mail"
            data={reservation.email}
            formName={"email"}
            disabled={isNotEditing}
          />
          <AdminInput
            text="Numer Telefonu"
            data={reservation.phoneNumber}
            formName={"phoneNumber"}
            disabled={isNotEditing}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength="9"
          />
          <AdminInput
            text="PESEL"
            data={reservation.pesel}
            formName={"pesel"}
            disabled={isNotEditing}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength="11"
          />
          <AdminInput
            text="Numer prawa jazdy"
            data={reservation.driversLicenseNumber}
            formName={"driversLicenseNumber"}
            disabled={isNotEditing}
            maxLength="9"
          />
          <AdminInput
            text="Numer legitymacji studenckiej"
            data={reservation.studentIdNumber}
            formName={"studentIdNumber"}
            disabled={isNotEditing}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength="11"
          />
        </div>
      </div>
      <input type="hidden" name="id" value={reservation.id} />
    </form>
  );
}

export default AdminFormReservation;
