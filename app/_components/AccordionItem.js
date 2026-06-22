import H1 from "./H1";
import { FaArrowDown } from "react-icons/fa";

function AccordionItem({ num, title, curOpen, onOpen, children }) {
  const isOpen = num === curOpen;

  function handleToggle() {
    onOpen(isOpen ? null : num);
  }

  return (
    <div
      className={`bg-surface p-2 rounded-2xl flex flex-col border-gold-dark border-[0.05rem]`}
      onClick={handleToggle}
      key={num}
    >
      <div
        className={`flex gap-3 items-center ${isOpen ? "border-b-[0.05rem] border-gold-dark" : ""}`}
      >
        <H1 customClassName="text-gold-dark p-2">
          {num < 9 ? `0${num + 1}` : num + 1}
        </H1>
        <p className="font-semibold">{title}</p>
        <p className="ml-auto text-3xl px-4">
          <FaArrowDown
            className={`text-gold-dark w-7 h-7 transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </p>
      </div>

      {isOpen && <div className="p-2 text-text-muted ">{children}</div>}
    </div>
  );
}

export default AccordionItem;
