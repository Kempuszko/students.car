import { Suspense } from "react";
import AppNav from "../_components/AppNav";
import Spinner from "../_components/Spinner";

export const metadata = {
  title: { template: "%s | Studends.car", default: "App | Students.car" },
};

function layout({ children }) {
  return (
    <div className="h-screen ">
      <main className="flex flex-col h-full w-full">
        <Suspense fallback={<Spinner />}>
          <AppNav />
          {children}
        </Suspense>
      </main>
    </div>
  );
}

export default layout;
