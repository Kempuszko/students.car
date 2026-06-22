import Image from "next/image";
import { BsCash } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { FaFireAlt } from "react-icons/fa";
import IconText from "./IconText";

function CarShowCase({ cars, isMain, isCarDetail }) {
  return (
    <div className="flex gap-10 w-max bg-surfaceHover rounded-4xl p-4">
      {cars.map((car) => (
        <div key={car.id}>
          {isMain ? (
            <div>
              <IconText
                icon={<IoCarSportOutline className="w-12 h-12 text-gold" />}
                text={car.name}
              />
            </div>
          ) : (
            ""
          )}
          <div
            className={`p-2 border-gold-dark border-2 rounded-4xl bg-background w-90 h-60 flex justify-center items-center ${isCarDetail ? "w-120 h-90" : "w-90 h-60"}`}
          >
            <Image
              width={isCarDetail ? 600 : 400}
              height={isCarDetail ? 400 : 400}
              src={car.src}
              alt={`Photo of ${car.src.replace(/^\/|\.png$/g, "")}`}
            />
          </div>
          {isMain ? (
            <div>
              <IconText
                icon={<BsCash className="w-12 h-12 text-gold" />}
                text={`od ${car.price} zł/dzień`}
              />
              <IconText
                size="small"
                icon={<FaFireAlt className="w-8 h-8 text-gold" />}
                text={`${car.timesReserved} rezerwacji!`}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
}

export default CarShowCase;
