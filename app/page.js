import Image from "next/image";
import AppNav from "./_components/AppNav";
import Container from "./_components/Container";
import H1 from "./_components/H1";
import H2 from "./_components/H2";
import CarShowCase from "./_components/CarShowCase";
import NavLink from "@/app/_components/NavLink";
import UL from "./_components/Ul";
import IconText from "./_components/IconText";
import { FaShieldHalved } from "react-icons/fa6";
import { TbMoneybag } from "react-icons/tb";
import { BsLightningCharge } from "react-icons/bs";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { getMostReservedCars } from "./dataProvider/data";

export const metadata = {
  title: "Wypozyczalnia",
  description: "Main page of Wypozyczalnia",
};

async function layout() {
  const topCars = await getMostReservedCars();

  return (
    <>
      <main className="h-screen">
        <div className="flex flex-col h-full w-full">
          <AppNav />
          <Container isMain={true}>
            <Image
              width={350}
              height={90}
              src="/logoBig.png"
              alt="Logo of studends car"
            ></Image>
            <H2>Wynajmij samochód szybko, tanio i bez zbędnych formalności</H2>
            <NavLink
              href="/application/cars"
              text="Zobacz naszą flotę"
              customClassName={`border-solid border-[0.05rem] bg-gold-dark hover:bg-gold text-background rounded-xl inline-block no-underline transition-all duration-150 w-60 m-auto p-3 text-xl text-center font-semibold hover:border-surfaceHover`}
            />
            <H1>Najczesciej wybierane</H1>
            <CarShowCase cars={topCars} isMain={true} />
            <H1>Korzysci z wybrania nas</H1>
            <UL customClassName="list-none flex gap-6">
              <IconText
                icon={<FaShieldHalved className="w-8 h-8 text-gold" />}
                text="Ubezpieczenie w cenie"
              />
              <IconText
                icon={<TbMoneybag className="w-8 h-8 text-gold" />}
                text="Brak ukrytych opłat"
                size="small"
              />
              <IconText
                icon={<BsLightningCharge className="w-8 h-8 text-gold" />}
                text="Szybki odbiór"
                size="small"
              />
              <IconText
                icon={<MdOutlinePhoneInTalk className="w-8 h-8 text-gold" />}
                text="Wsparcie 24/7"
                size="small"
              />
            </UL>
          </Container>
        </div>
      </main>
    </>
  );
}

export default layout;
