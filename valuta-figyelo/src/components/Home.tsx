export default function Home() {
  return (
    <>
      <h2>Mi ez?</h2>
      <p>
        Az oldallal megtekinthetjük egyes bankok valuta adás vételi adatait,
        valamint periódusokat is megfigyelhetünk, valuták között korrelációkat
        kereshetünk.
      </p>
      <h2>Élő oldalak</h2>
      <ul>
        <li>
          <h3>Valuta</h3>
          <div>
            <p>
              A valuta oldalon a felhasználó kiválaszthat egy valutát ami ez
              után megjeleníti azon bankokat amelyek árultak adott valutát.
              <br />
              Amennyiben a megjelenített táblázat zoldel kijelölt bankra
              kattintunk annyiban az adott bank 7 napos eladási és vételi
              adatait mitatja meg egy chart-on.
            </p>
          </div>
        </li>
        <li>
          <h3>Periódus</h3>
          <p>
            A periódus fülön a felhasználó ki tud választani egy tól-ig idő
            intervallumot (max 30 nap) és egy bankot.
            <br />
            A keresés gomb megnyomása után megjelenik a bank adott valutáinak
            vétel árai közötti korráleciós táblázat.
            <br />
            Zöldel kiemelt cellára kattintva megtekinthető mind két valuta adott
            periódusára chat.
          </p>
        </li>
      </ul>
    </>
  );
}
