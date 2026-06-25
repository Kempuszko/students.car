import Container from "@/app/_components/Container";
import H1 from "@/app/_components/H1";
import NavLink from "@/app/_components/NavLink";

function notFound() {
  return (
    <Container>
      <H1>Przepraszamy, auto którego szukasz nie znajduje się u nas!</H1>
      <NavLink
        href="/"
        text="Strona główna"
        customClassName={`border-solid border-[0.05rem] bg-gold-dark hover:bg-gold text-background rounded-xl inline-block no-underline transition-all duration-150 w-60 m-auto p-3 text-xl text-center font-semibold hover:border-surfaceHover`}
      />
    </Container>
  );
}

export default notFound;
