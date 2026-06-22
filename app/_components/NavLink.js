"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ text, href, icon, onClick, customClassName }) {
  const pathname = usePathname();
  const deafultStyles = `border-solid border-[0.05rem] bg-surface rounded-xl inline-block no-underline transition-all duration-150 w-40 opacity-80 m-auto p-2 text-center hover:font-semibold hover:border-gold-dark hover:opacity-90 ${pathname === href ? "opacity-100 border-gold font-semibold bg-surfaceHover" : "border-border "}`;

  return (
    <Link
      className={customClassName ? customClassName : `${deafultStyles}`}
      href={href}
      onClick={onClick}
    >
      <span className="flex justify-center items-center gap-2">
        {icon}
        {text}
      </span>
    </Link>
  );
}

export default NavLink;
