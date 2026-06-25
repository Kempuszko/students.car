import { notFound } from "next/navigation";
import Container from "@/app/_components/Container";
import H1 from "@/app/_components/H1";
import CarShowCase from "@/app/_components/CarShowCase";
import DateSelector from "@/app/_components/DateSelector";
import TechnicalInformationList from "@/app/_components/TechnicalInformationList";
import { BookingProvider } from "@/app/_context/BookingContext";
import Form from "@/app/_components/Form";
import { getCar, getBookedDates } from "@/app/dataProvider/data";
import {
  LuCpu,
  LuLuggage,
  LuSmartphoneNfc,
  LuFileCheck2,
} from "react-icons/lu";

export default async function CarDetailPage({ params }) {
  const paramsCarId = await params;
  const [car, bookedDates] = await Promise.all([
    getCar(paramsCarId.carId),
    getBookedDates(paramsCarId.carId),
  ]);

  if (!car.id) {
    notFound();
  }

  return (
    <BookingProvider>
      <Container isMain={true}>
        <div className="flex gap-24">
          <CarShowCase cars={[car]} isCarDetail={true} />
          <div className="flex flex-col">
            <H1>{car.name}</H1>
            <DateSelector RentPrice={car.price} bookedDates={bookedDates} />
          </div>
        </div>
        <div className="grid grid-cols-4 px-12 w-full pt-6">
          <TechnicalInformationList
            header="Dane techniczne"
            data={car.technical}
            icon={<LuCpu className="w-8 h-8" />}
          />
          <TechnicalInformationList
            header="Praktyczność i Gabaryty"
            data={car.practicality}
            icon={<LuLuggage className="w-8 h-8" />}
          />
          <TechnicalInformationList
            header="Technologia i Komfort"
            data={car.technology}
            icon={<LuSmartphoneNfc className="w-8 h-8" />}
          />
          <TechnicalInformationList
            header="Warunki Wynajmu"
            data={car.rentalConditions}
            icon={<LuFileCheck2 className="w-8 h-8" />}
          />
        </div>
        <Form rentPrice={car.price} deposit={car.deposit} carId={car.id} />
      </Container>
    </BookingProvider>
  );
}
