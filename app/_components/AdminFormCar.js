"use client";

import { useActionState, useEffect, useState } from "react";
import AdminInput from "./AdminInput";
import AdminTextarea from "./AdminTextarea";
import { deleteCar, updateCar } from "../dataProvider/data";
import toast from "react-hot-toast";

function AdminFormCar({ car }) {
  const [isNotEditing, setIsNotEditing] = useState(true);
  const [state, formAction, isPending] = useActionState(updateCar, {
    success: null,
    message: "",
  });

  const [deleteState, deleteFormAction, deleteIsPending] = useActionState(
    deleteCar,
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
        <p className="font-bold text-gold">{car.name}</p>
        <button
          disabled={isPending}
          onClick={handleEdit}
          className="cursor-pointer"
        >
          {isNotEditing ? "Edytuj" : "Wyłącz edycje"}
        </button>
        <button
          disabled={isPending || deleteIsPending || isNotEditing}
          className="cursor-pointer"
        >
          {isPending ? "Zapisywanie" : "Zapisz"}
        </button>
        <button
          className="cursor-pointer"
          disabled={isPending || deleteIsPending || !isNotEditing}
          formAction={deleteFormAction}
        >
          {deleteIsPending ? "Usuwanie" : "Usuń"}
        </button>
      </div>
      <div className="flex gap-3 mb-4">
        <AdminInput
          text="Nazwa"
          data={car.name}
          formName={"name"}
          disabled={isNotEditing}
        />
        <AdminInput
          text="Cena"
          data={car.price}
          formName={"price"}
          disabled={isNotEditing}
          type="number"
        />
        <AdminInput
          text="Kaucja"
          data={car.deposit}
          formName={"deposit"}
          disabled={isNotEditing}
          type="number"
        />
        <AdminInput
          text="imgSrc"
          data={car.src}
          formName={"src"}
          disabled={isNotEditing}
        />
      </div>
      <div className="grid grid-cols-4 gap-4 w-full">
        <AdminTextarea
          text="Techniczne"
          data={car.technical}
          formName="technical"
          disabled={isNotEditing}
        />
        <AdminTextarea
          text="Praktyczne"
          data={car.practicality}
          formName="practicality"
          disabled={isNotEditing}
        />
        <AdminTextarea
          text="Technologia"
          data={car.technology}
          formName="technology"
          disabled={isNotEditing}
        />
        <AdminTextarea
          text="Warunki"
          data={car.rentalConditions}
          formName="rentalConditions"
          disabled={isNotEditing}
        />
      </div>
      <input type="hidden" name="id" value={car.id} />
    </form>
  );
}

export default AdminFormCar;
