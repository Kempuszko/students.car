import Footer from "./Footer";

function Container({ children, isMain, footer = true }) {
  return (
    <>
      <div
        className={` flex flex-col justify-around items-center text-text-muted overflow-y-scroll custom-scroll pt-10 h-full ${footer ? "" : "pb-10"}`}
      >
        <div
          className={`${isMain ? "" : "px-96"} flex flex-col gap-5 items-center`}
        >
          {children}
        </div>
        {footer ? <Footer /> : ""}
      </div>
    </>
  );
}

export default Container;
