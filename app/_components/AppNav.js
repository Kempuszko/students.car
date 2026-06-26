"use client";
import NavLink from "./NavLink";
import Logo from "./Logo";
import { GoPeople } from "react-icons/go";
import { IoCarSportOutline, IoDocumentTextOutline } from "react-icons/io5";
import { VscSymbolRuler } from "react-icons/vsc";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const navLinks = [
  {
    name: "Rezerwacje",
    href: "/application/reservation",
    icon: <IoDocumentTextOutline className="w-6 h-6" />,
  },
  {
    name: "Nasze Auta",
    href: "/application/cars",
    icon: <IoCarSportOutline className="w-6 h-6" />,
  },
  {
    name: "O nas",
    href: "/application/aboutUs",
    icon: <GoPeople className="w-6 h-6" />,
  },
  {
    name: "Regulamin",
    href: "/application/rules",
    icon: <VscSymbolRuler className="w-6 h-6" />,
  },
  {
    name: "FAQ",
    href: "/application/faq",
    icon: <AiOutlineQuestionCircle className="w-6 h-6" />,
  },
];

function AppNav() {
  return (
    <>
      <ul
        className={`xl:border-b border-gold-dark py-4 px-12   w-full flex justify-between sticky top-0 bg-background   p-4 shadow z-100]`}
      >
        <Logo />
        <li className="flex gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              text={link.name}
              href={link.href}
              icon={link.icon}
            />
          ))}
        </li>
      </ul>
    </>
  );
}

export default AppNav;
