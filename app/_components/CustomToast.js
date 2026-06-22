"use client";

import { Toaster } from "react-hot-toast";
import { HiMiniShieldExclamation, HiOutlineCheckCircle } from "react-icons/hi2";

function CustomToast() {
  return (
    <Toaster position="top-center" toastOptions={{ duration: 6000 }}>
      {(t) => {
        return (
          <div
            className={`flex items-center gap-2 bg-surfaceHover border border-gold-dark px-3 py-2 shadow-md rounded-full`}
          >
            {t.message === "Rezerwacja nie udała się" ? (
              <HiMiniShieldExclamation className="text-red-500" size={32} />
            ) : (
              <HiOutlineCheckCircle className="text-green-600" size={32} />
            )}
            <p className="font-semibold text-sm">{t.message}</p>
          </div>
        );
      }}
    </Toaster>
  );
}

export default CustomToast;
