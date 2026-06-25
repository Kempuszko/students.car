import Image from "next/image";
import Container from "@/app/_components/Container";
import H1 from "@/app/_components/H1";
import IconText from "@/app/_components/IconText";
import NavLink from "@/app/_components/NavLink";
import { getCars } from "@/app/dataProvider/data";
import { BsCash } from "react-icons/bs";
import { FaGasPump, FaGear, FaPeopleGroup, FaDroplet } from "react-icons/fa6";
import { IoCarSportOutline } from "react-icons/io5";

export const metadata = {
  title: "Nasze auta",
  description: "calendar section of SPK app",
};

async function page() {
  const cars = await getCars();

  return (
    <Container isMain={true}>
      <H1>Wybierz samochód dopasowany do swoich potrzeb</H1>
      <div className="grid grid-cols-[auto_auto_auto] gap-x-32 gap-y-16">
        {cars.map((car, i) => (
          <div
            key={`${car.id}`}
            className="flex flex-col items-center justify-center bg-surfaceHover px-4 py-2 rounded-4xl"
          >
            <div>
              <IconText
                icon={<IoCarSportOutline className="w-12 h-12 text-gold" />}
                text={car.name}
              />
            </div>
            <div className="p-2 border-gold-dark border-2 rounded-4xl bg-background w-90 h-60 flex justify-center items-center relative">
              <div className="group">
                <div className="w-full  bg-transparent absolute inset-0 z-10 rounded-4xl opacity-0 group-hover:opacity-100 group-hover:bg-surfaceTransparent transition-all duration-150 grid-cols-2 grid">
                  <IconText
                    icon={<FaGear className="w-8 h-8 text-gold" />}
                    text={
                      car.technical
                        .find((item) => item.includes("Skrzynia"))
                        ?.match(/(Manualna|Automatyczna)/)?.[1] || "Brak danych"
                    }
                    size="small"
                  />
                  <IconText
                    icon={<FaGasPump className="w-7 h-7 text-gold" />}
                    text={
                      car.technical
                        .find((item) => item.includes("paliwa"))
                        ?.match(/(Benzyna|Diesel|Hybryda|Elektryczny)/)?.[1] ||
                      "Brak danych"
                    }
                    size="small"
                  />
                  <IconText
                    icon={<FaPeopleGroup className="w-8 h-8 text-gold" />}
                    text={`
                      ${
                        car.practicality
                          .find((item) => item.includes("miejsc"))
                          ?.match(/(\d+)/)?.[1] || "Brak danych"
                      }
                    osobowe`}
                    size="small"
                  />
                  <IconText
                    icon={<FaDroplet className="w-8 h-8 text-gold" />}
                    text={
                      car.technical
                        .find((item) => item.toLowerCase().includes("spalanie"))
                        ?.match(
                          /([0-9.,]+\s*l\s* \/ \s*100\s*km|[0-9.,]+\s*l\/100\s*km)/i,
                        )?.[1] || "Brak danych"
                    }
                    size="small"
                  />
                </div>
                <Image
                  width={400}
                  height={400}
                  src={car.src}
                  alt={`Photo of ${car.src.replace(/^\/|\.png$/g, "")}`}
                  className="group-hover:blur-xs transition-all duration-150"
                />
              </div>
            </div>
            <div>
              <IconText
                icon={<BsCash className="w-12 h-12 text-gold" />}
                text={`od ${car.price} zł/dzień`}
              />
            </div>
            <NavLink
              href={`/application/cars/${car.id}`}
              text="Zarezerwuj"
              customClassName={`border-solid border-[0.05rem] bg-gold-dark hover:bg-gold text-background rounded-xl inline-block no-underline transition-all duration-150 w-40 p-2 text-l font-semibold hover:border-surfaceHover`}
            />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default page;
