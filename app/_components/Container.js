import Footer from "./Footer";

function Container({ children, isMain }) {
  return (
    <>
      <div
        className={` flex flex-col justify-around items-center text-text-muted overflow-y-scroll custom-scroll pt-10 h-full`}
      >
        <div
          className={`${isMain ? "" : "px-96"} flex flex-col gap-5 items-center`}
        >
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Container;
