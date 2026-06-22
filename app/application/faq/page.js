import Accordion from "@/app/_components/Accordion";
import Container from "@/app/_components/Container";
import H1 from "@/app/_components/H1";

export const metadata = {
  title: "FAQ",
  description: "FAQ of studends car",
};

const faqData = [
  {
    title: "Kto może wypożyczyć samochód w Students Car?",
    text: 'Każdy student (i nie tylko!), który ukończył 18 lat i posiada ważne prawo jazdy kategorii B od co najmniej 3 miesięcy. W przeciwieństwie do tradycyjnych wypożyczalni nie pobieramy dodatkowych opłat za wiek ("młody kierowca") ani za krótki staż za kółkiem.',
  },
  {
    title: "Czy jako student muszę wpłacać kaucję?",
    text: "Nie! W Students Car studenci wynajmują BEZ KAUCJI. Jeśli podczas odbioru samochodu okażesz ważną legitymację studencką (fizyczną lub mObywatel), całkowicie znosimy obowiązek wpłaty kaucji zwrotnej. Płacisz tylko za sam wynajem!",
  },
  {
    title: "Jakie dokumenty są potrzebne przy odbiorze auta?",
    text: "Podczas odbioru kluczyków nasz pracownik poprosi Cię o: prawo jazdy (fizyczne lub w aplikacji mObywatel), dowód osobisty lub paszport oraz ważną legitymację studencką (warunek konieczny do zwolnienia z kaucji oraz odebrania zniżki -15% na wynajem).",
  },
  {
    title:
      "Co w przypadku, gdy nie jestem studentem? (Wynajem dla niestudentów)",
    text: "Osoby nieposiadające statusu studenta również mogą wypożyczyć u nas auto. W ich przypadku obowiązuje standardowa kaucja zwrotna zabezpieczana na karcie debetowej, gotówką lub BLIK-iem (300 zł dla aut miejskich, 500 zł dla kompaktowych).",
  },
  {
    title:
      "Skoro nie ma kaucji, to co się stanie w przypadku stłuczki z mojej winy?",
    text: "Wszystkie nasze samochody posiadają pełny pakiet ubezpieczeń (OC/AC). Ponieważ nie pobieramy od studentów kaucji, standardowa odpowiedzialność za drobne szkody (np. zarysowanie zderzaka) jest ograniczona regulaminowo do kwoty 300 zł. Możesz jednak dokupić opcję „Święty Spokój” za 15 zł/dobę, która całkowicie znosi jakąkolwiek odpowiedzialność finansową za stan auta.",
  },
  {
    title:
      "Czy samochodem mogę wyjechać za granicę (np. na Erasmusa lub narty w Austrii)?",
    text: "Tak, ale wymaga to wcześniejszego zgłoszenia. Wyjazd do krajów Unii Europejskiej jest bezpłatny. Musimy jednak przygotować dla Ciebie odpowiednie upoważnienie i dodatkowe ubezpieczenie assistance. Zaznacz opcję „Wyjazd za granicę” podczas rezerwacji online.",
  },
  {
    title: "Czy w aucie obowiązuje limit kilometrów?",
    text: "Przy wynajmie na 1-3 dni limit wynosi 250 km na dobę (sumuje się, np. 3 dni = 750 km). Przy wynajmie na 4 dni i więcej obowiązuje brak limitu kilometrów – jedziesz przed siebie, bez patrzenia na licznik.",
  },
  {
    title:
      "Skoro nie ma kaucji dla studentów, czym jest „Udział Własny” w szkodzie?",
    text: "Brak kaucji oznacza jedynie, że nie zamrażamy Twoich gotówkowych oszczędności na start. Jednak w przypadku kolizji z Twojej winy, w regulaminie istnieje tzw. udział własny w szkodzie (czyli maksymalna kwota, do której odpowiadasz za naprawę). W Students Car dla pojazdów miejskich wynosi on maksymalnie 500 zł. Pamiętaj, że kwotę tę możesz zredukować do 0 zł, wykupując przy rezerwacji pakiet „Święty Spokój”.",
  },
  {
    title:
      "W jakich sytuacjach moja odpowiedzialność finansowa nie będzie ograniczona?",
    text: "Brak kaucji i ubezpieczenie AC przestają działać, a Ty odpowiadasz za pełny koszt naprawy auta, jeśli dojdzie do rażącego złamania regulaminu i polskiego prawa. Mowa tu o sytuacjach takich jak: prowadzenie pojazdu pod wpływem alkoholu lub innych środków odurzających, ucieczka z miejsca wypadku lub udostępnienie kierownicy osobie trzeciej, która nie była wpisana do umowy wynajmu.",
  },
  {
    title:
      "Czy samochód mogę pożyczyć koledze lub jechać „na zmianę” podczas dłuższej trasy?",
    text: "Domyślnie autem może poruszać się wyłącznie osoba, która podpisała umowę. Jeśli planujecie dłuższą trasę i chcecie zmieniać się za kółkiem, podczas rezerwacji dodaj opcję „Dodatkowy Kierowca”. Studencki bonus: dopisanie drugiego studenta do umowy kosztuje symboliczne 20 zł za cały okres wynajmu.",
  },
  {
    title: "W jakim stanie otrzymam samochód i jak muszę go zwrócić?",
    text: "Zasada jest prosta: oddaj auto w takim stanie, w jakim sam chciałbyś je odebrać. Samochód otrzymujesz z pełnym bakiem i z pełnym bakiem należy go zwrócić (zasada Full-to-Full). Samochód wydajemy czysty i zadbany, ale jeśli w środku zostaną ślady po imprezie, błoto czy rozsypany fast food, będziemy musieli doliczyć opłatę za sprzątanie wnętrza w wysokości 150 zł.",
  },
  {
    title:
      "Czy w samochodach Students Car można palić papierosy lub e-papierosy?",
    text: "Kategorycznie nie. W każdym z naszych samochodów obowiązuje bezwzględny zakaz palenia wyrobów tytoniowych oraz korzystania z e-papierosów/vape'ów. Złamanie tego zakazu wiąże się z karą umowną w wysokości 500 zł na pokrycie kosztów specjalistycznego ozonowania i prania tapicerki.",
  },
  {
    title: "Czy dowozicie samochody pod akademik lub na uczelnię?",
    text: 'Tak! Na terenie miasta, w którym znajduje się nasz oddział, oferujemy usługę "Door-to-Door". Nasz kierowca podjedzie pod wskazany adres (np. pod Twój akademik) o umówionej godzinie. Koszt takiej usługi to jedyne 30 zł, a przy wynajmie na ponad 5 dni dostawa jest całkowicie darmowa.',
  },
  {
    title:
      "Czy mogę anulować lub zmienić termin rezerwacji, jeśli zmienią mi się plany?",
    text: "Jasne, rozumiemy dynamikę studenckiego życia. Bezpłatnej anulacji lub zmiany terminu rezerwacji możesz dokonać do 24 godzin przed planowanym rozpoczęciem wynajmu. Wystarczy, że zalogujesz się do panelu klienta lub napiszesz do nas szybki mail.",
  },
  {
    title:
      " Dlaczego na niektóre samochody (np. BMW M3, Mustang, Bugatti) obowiązuje wyższy limit wieku niż 18 lat?",
    text: "Chodzi o bezpieczeństwo oraz warunki naszych ubezpieczycieli (AC). Auta o ekstremalnej mocy wymagają większego doświadczenia za kółkiem.Choć naszą misją jest pełne zaufanie do studentów i brak kaucji, musimy pozostać odpowiedzialni. Samochody z naszej floty podzieliliśmy na kategorie wiekowe z dwóch głównych powodów:• Firmy ubezpieczeniowe kategorycznie zabraniają udostępniania aut o mocy przekraczającej 300, 450 czy 1500 KM osobom, które dopiero odebrały prawo jazdy. Złamanie tego zapisu oznaczałoby brak ochrony ubezpieczeniowej w razie wypadku.• Auta z napędem na tylną oś i ogromnym momentem obrotowym (jak Ford Mustang czy BMW M4) zachowują się na drodze zupełnie inaczej niż miejski Space Star. Chcemy, aby każda Twoja podróż ze Students Car kończyła się bezpiecznym powrotem pod akademik. Dobra wiadomość: Ponad połowa naszej floty – w tym dynamiczny Fiat Punto Abarth (165 KM) czy kultowa Mazda MX-5 Miata – jest dostępna dla Was już od 18.-19. roku życia! Starsze roczniki na studiach (lub po zebraniu odpowiedniego stażu za kółkiem) bez problemu odblokują dostęp do segmentu Premium i Hypercars",
  },
];

function page() {
  return (
    <Container>
      <H1>Często Zadawane Pytania (FAQ) – Students Car</H1>
      <Accordion data={faqData} />
    </Container>
  );
}

export default page;
