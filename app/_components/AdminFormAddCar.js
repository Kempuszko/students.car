"use client";

import { useActionState, useEffect, useState } from "react";
import AdminInput from "./AdminInput";
import AdminTextarea from "./AdminTextarea";
import { insertCar } from "../dataProvider/data";
import toast from "react-hot-toast";

function AdminFormAddCar({}) {
  const [state, formAction, isPending] = useActionState(insertCar, {
    success: null,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.success === false) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="mx-6 w-full p-6 border-2 border-surfaceHover rounded-2xl"
    >
      <div className="flex gap-12 p-4">
        <p className="font-bold text-gold">Dodaj auto</p>
        <button disabled={isPending} className="cursor-pointer">
          {isPending ? "Dodawanie" : "Dodaj"}
        </button>
      </div>
      <div className="flex gap-3 mb-4">
        <AdminInput text="Nazwa" formName={"name"} />
        <AdminInput text="Cena" formName={"price"} type="number" />
        <AdminInput text="Kaucja" formName={"deposit"} type="number" />
        <AdminInput text="imgSrc" formName={"src"} />
      </div>
      <div className="grid grid-cols-4 gap-4 w-full">
        <AdminTextarea text="Techniczne" formName="technical" />
        <AdminTextarea text="Praktyczne" formName="practicality" />
        <AdminTextarea text="Technologia" formName="technology" />
        <AdminTextarea text="Warunki" formName="rentalConditions" />
      </div>
    </form>
  );
}

export default AdminFormAddCar;
