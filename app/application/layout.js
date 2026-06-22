import AppNav from "../_components/AppNav";

export const metadata = {
  title: { template: "%s | Studends.car", default: "App | Students.car" },
};

function layout({ children }) {
  return (
    <div className="h-screen ">
      <main className="flex flex-col h-full w-full">
        <AppNav />
        {children}
      </main>
    </div>
  );
}

export default layout;
