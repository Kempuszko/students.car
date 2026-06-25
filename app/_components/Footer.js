import { FaInstagram, FaTiktok } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import IconText from "./IconText";

function Footer({}) {
  return (
    <footer className="w-full h-10 flex flex-col items-center gap-1 p-10 ">
      <div className="flex gap-10 border-t-[0.05rem] border-solid border-gold pt-5">
        <a
          href="https://www.instagram.com/students.car/"
          className="hover:text-gold-light transition-all duration-150 text-gold-dark"
        >
          <IconText
            icon={<FaInstagram className="w-6 h-6" />}
            text="Instagram"
            size="small"
          />
        </a>
        <a
          href="https://www.instagram.com/students.car/"
          className="hover:text-gold-light transition-all duration-150 text-gold-dark"
        >
          <IconText
            icon={<CiFacebook className="w-6 h-6" />}
            text="Facebook"
            size="small"
          />
        </a>
        <a
          href="https://www.instagram.com/students.car/"
          className="hover:text-gold-light transition-all duration-150 text-gold-dark"
        >
          <IconText
            icon={<FaTiktok className="w-4 h-4" />}
            text="TikTok"
            size="small"
          />
        </a>
      </div>
      <span className="text-center">
        © 2025 Students.car. Wszelkie prawa zastrzeżone.
      </span>
    </footer>
  );
}

export default Footer;
