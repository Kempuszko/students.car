"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginAdmin } from "@/app/dataProvider/data";

function Login() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(loginAdmin, {
    success: null,
    message: "",
  });

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message);
      router.push("/application/admin");
      router.refresh();
    } else if (state.success === false) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="p-8 bg-surface rounded-lg border border-gold-dark w-96 flex flex-col gap-4 shadow-xl"
    >
      <h1 className="text-2xl font-bold text-center text-gold">
        Panel Właściciela
      </h1>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-text">Adres E-mail</label>
        <input
          type="email"
          name="email"
          className="p-2 rounded bg-surfaceHover text-text"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-text">Hasło</label>
        <input
          type="password"
          name="password"
          className="p-2 rounded bg-surfaceHover text-text"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-gold text-surface font-bold p-2 rounded hover:bg-gold-light transition cursor-pointer duration-150 mt-2 disabled:opacity-50"
      >
        {isPending ? "Logowanie..." : "Zaloguj się"}
      </button>
    </form>
  );
}

export default Login;
