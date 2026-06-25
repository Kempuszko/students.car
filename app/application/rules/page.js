import Container from "@/app/_components/Container";
import H1 from "@/app/_components/H1";
import H2 from "@/app/_components/H2";
import H3 from "@/app/_components/H3";
import Ul from "@/app/_components/Ul";

export const metadata = {
  title: "Pliki",
  description: "files section of SPK app",
};

async function page() {
  return (
    <>
      <Container>
        <div className="flex flex-col gap-3 justify-center">
          <H1>REGULAMIN WYPOŻYCZALNI STUDENTS.CAR</H1>
          <H2>1. Postanowienia ogólne </H2>
          <Ul>
            <li>
              Niniejszy regulamin określa zasady wynajmu pojazdów w wypożyczalni
              Nazwa
            </li>
            <li>
              Wypożyczalni. Klient, dokonując rezerwacji lub podpisując umowę
              najmu,
            </li>
            <li>
              akceptuje postanowienia regulaminu. Pojazdy mogą być wynajmowane
              osobom fizycznym oraz firmom, które spełniają warunki określone w
              regulaminie.
            </li>
          </Ul>
          <H2>2. Warunki wynajmu Najemcą może zostać osoba, która:</H2>
          <Ul>
            <li>ukończyła 21 lat</li>
            <li>posiada ważne prawo jazdy od minimum 12 miesięcy</li>
            <li>przedstawi ważny dokument tożsamości.</li>
            <li>
              Najemca zobowiązuje się używać pojazdu zgodnie z przepisami ruchu
              drogowego.
            </li>
          </Ul>
          <p>Wypożyczalnia może odmówić wynajmu bez podania przyczyny.</p>
          <H2>
            3. Rezerwacja i płatności Rezerwacji można dokonać tylko osobiście.
          </H2>
          <Ul>
            <li>
              Wypożyczalnia może wymagać wpłaty kaucji zwrotnej w wysokości
              określonej w umowie.
            </li>
            <li>
              Opłata za wynajem pobierana jest z góry za cały okres najmu.
            </li>
            <li>
              W przypadku anulowania rezerwacji: do 24h przed odbiorem — zwrot
              100%, poniżej 24h — brak zwrotu.
            </li>
          </Ul>
          <H2>
            4. Odbiór i zwrot pojazdu Pojazd wydawany jest z pełnym bakiem i w
            takim samym stanie musi zostać zwrócony.
          </H2>
          <Ul>
            <li>
              Najemca zobowiązuje się zwrócić pojazd w terminie określonym w
              umowie.
            </li>
            <li>
              Opóźnienie powyżej 1 godziny może skutkować naliczeniem dodatkowej
              opłaty.
            </li>
            <li>
              Pojazd musi zostać zwrócony w stanie niepogorszonym, z wyjątkiem
              normalnego zużycia.
            </li>
          </Ul>
          <H2>
            5. Odpowiedzialność Najemcy Najemca ponosi odpowiedzialność za:
          </H2>
          <Ul>
            <li>
              szkody powstałe z jego winy, mandaty i opłaty drogowe, utratę
              dokumentów pojazdu lub kluczyków.
            </li>
            <Ul>
              <H3 className="pt-2 font-semibold">Zabrania się:</H3>
              <li>palenia w pojeździe</li>
              <li>przewożenia zwierząt bez zabezpieczenia</li>
              <li>
                uczestnictwa w wyścigach, rajdach lub szkoleniach sportowych.
              </li>
              <li>
                W przypadku kolizji Najemca zobowiązany jest niezwłocznie
                powiadomić policję oraz wypożyczalnię.
              </li>
            </Ul>
          </Ul>
          <H2>
            6. Ubezpieczenie Pojazdy posiadają obowiązkowe ubezpieczenie OC.
          </H2>
          <Ul>
            <li>
              Dodatkowe ubezpieczenia (AC, Assistance) mogą być wykupione za
              dopłatą.
            </li>
            <H3 className="pt-2 font-semibold">
              Ubezpieczenie nie obejmuje szkód powstałych wskutek:
            </H3>
            <Ul>
              <li>jazdy pod wpływem alkoholu lub środków odurzających</li>
              <li>rażącego niedbalstwa</li>
              <li>naruszenia warunków umowy.</li>
            </Ul>
          </Ul>
          <H2>
            7. Postanowienia końcowe W sprawach nieuregulowanych regulaminem
          </H2>
          <Ul>
            <li>obowiązują przepisy Kodeksu Cywilnego.</li>
            <li>
              Wypożyczalnia zastrzega sobie prawo do zmian regulaminu. Aktualna
              wersja regulaminu dostępna jest w siedzibie wypożyczalni oraz na
              stronie internetowej.
            </li>
          </Ul>
        </div>
      </Container>
    </>
  );
}

export default page;
