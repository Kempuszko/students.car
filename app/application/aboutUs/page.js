import H1 from "@/app/_components/H1";
import H2 from "@/app/_components/H2";
import Ul from "@/app/_components/Ul";
import Container from "@/app/_components/Container";
import IconText from "@/app/_components/IconText";
import { CiFacebook, CiMail } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export const metadata = {
  title: "O nas",
  description: "About us section",
};

async function page() {
  return (
    <Container>
      <H1>O nas</H1>
      <span>
        W Students.car wierzymy, że każdy zasługuje na idealny środek
        transportu, niezależnie od budżetu i okazji. Dlatego stworzyliśmy
        najbardziej zróżnicowaną flotę na rynku. U nas nie ma nudy!
      </span>
      <span>
        Potrzebujesz taniego, wysłużonego auta, żeby przewieźć szafę z
        sieciówki, zaliczyć studencki wyjazd na Mazury albo po prostu
        bezstresowo zaparkować na ciasnym parkingu? Mamy to. A może chcesz
        poczuć przeciążenie 1,5 G i usłyszeć ryk 1500 koni mechanicznych? Tak,
        Bugatti Chiron też na Ciebie czeka
      </span>
      <Ul>
        <H2>Co nas wyróżnia?</H2>
        <li>
          Pełen przekrój motoryzacji: Od kultowych, tanich klasyków codzienności
          po absolutny szczyt inżynierii.
        </li>
        <li>
          Brak uprzedzeń: Traktujemy tak samo poważnie klienta wynajmującego
          auto za 150 zł, jak i tego, który celuje w rekordy prędkości.
        </li>
        <li>
          Prosty proces: Nasz system online pozwoli Ci zarezerwować dowolne auto
          w kilka kliknięć.
        </li>
      </Ul>
      <H1>Kontakt</H1>
      <div className="flex gap-12 items-center">
        <a
          href="mailto:students.car@gmail.com"
          className="hover:text-gold-light transition-all duration-150 text-gold-dark"
        >
          <IconText
            icon={<CiMail className="w-8 h-8" />}
            text="students.car@gmail.com"
          />
        </a>
        <a
          href="tel:+48924534123"
          className="hover:text-gold-light transition-all duration-150 text-gold-dark"
        >
          <IconText
            icon={<MdOutlinePhone className="w-8 h-8" />}
            text="+48 924 534 123"
          />
        </a>
        <a
          href="https://www.instagram.com/students.car/"
          className="hover:text-gold-light transition-all duration-150 text-gold-dark"
        >
          <IconText
            icon={<FaInstagram className="w-8 h-8" />}
            text="Instagram"
            size="small"
          />
        </a>
        <a
          href="https://www.instagram.com/students.car/"
          className="hover:text-gold-light transition-all duration-150 text-gold-dark"
        >
          <IconText
            icon={<CiFacebook className="w-8 h-8" />}
            text="Facebook"
            size="small"
          />
        </a>
        <a
          href="https://www.instagram.com/students.car/"
          className="hover:text-gold-light transition-all duration-150 text-gold-dark"
        >
          <IconText
            icon={<FaTiktok className="w-6 h-6" />}
            text="TikTok"
            size="small"
          />
        </a>
      </div>
    </Container>
  );
}

export default page;
