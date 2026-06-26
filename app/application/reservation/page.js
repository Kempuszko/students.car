import AdminFormReservation from "@/app/_components/AdminFormReservation";
import Container from "@/app/_components/Container";
import H1 from "@/app/_components/H1";
import { getUserReservations } from "@/app/dataProvider/data";
import { cookies } from "next/headers";

export const metadata = {
  title: "Twoje rezerwacje",
  description: "user reservations",
};

async function page() {
  const cookieStore = await cookies();
  const cookieReservations = cookieStore.get("my_reservations")?.value;

  let reservationIds = [];
  let reservations = [];

  if (cookieReservations) {
    try {
      reservationIds = JSON.parse(cookieReservations);
    } catch (e) {
      reservationIds = [];
    }
  }

  if (reservationIds.length)
    reservations = await getUserReservations(reservationIds);

  return (
    <Container isMain={true}>
      {reservationIds.length === 0 ? (
        <H1>Brak rezerwacji</H1>
      ) : (
        reservations.map((reservation) => (
          <AdminFormReservation
            reservation={reservation}
            key={reservation.id}
          />
        ))
      )}
    </Container>
  );
}

export default page;
