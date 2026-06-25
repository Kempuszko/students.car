import Container from "@/app/_components/Container";
import Login from "@/app/_components/Login";

export const metadata = {
  title: "Login",
  description: "Admin login page",
};

function page() {
  return (
    <Container>
      <Login />
    </Container>
  );
}

export default page;
