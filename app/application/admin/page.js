import AdminFormAddCar from "@/app/_components/AdminFormAddCar";
import AdminFormCar from "@/app/_components/AdminFormCar";
import AdminFormReservation from "@/app/_components/AdminFormReservation";
import Container from "@/app/_components/Container";
import H1 from "@/app/_components/H1";
import { getCars, getReservations, logoutAdmin } from "@/app/dataProvider/data";
import { query } from "@/app/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "CMS",
  description: "CMS of studends car",
};

async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token) {
    redirect("/application/login");
  }

  const session = await query(
    "SELECT * FROM admin_sessions WHERE token = ? AND expires_at > NOW()",
    [token],
  );

  if (session.length === 0) {
    redirect("/application/login");
  }

  const [cars, reservations] = await Promise.all([
    getCars(true),
    getReservations(),
  ]);

  return (
    <>
      <H1 customClassName="py-4">Auta</H1>
      <Container isMain={true} footer={false}>
        {cars.map((car) => (
          <AdminFormCar car={car} key={car.id} />
        ))}
        <AdminFormAddCar />
      </Container>
      <H1 customClassName="py-4">Rezerwacje</H1>
      <Container isMain={true} footer={false}>
        {reservations.map((reservation) => (
          <AdminFormReservation
            reservation={reservation}
            key={reservation.id}
          />
        ))}
      </Container>
    </>
  );
}

export default page;
