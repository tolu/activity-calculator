import TimeEntryForm from "./components/TimeEntryForm";
import Calendar from "./components/Calendar";
import EffortGraph from "./components/EffortGraph";

function App() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Aktivitetskalkulatoren</h1>
      <details>
        <summary>
          <strong>Hva er Aktivitetskalkulatoren?</strong>
        </summary>
        <p>
          Aktivitetskalkulatoren er en metode for planlegging av daglige
          aktiviteter og benytter seg av verktøy som kan hjelpe deg med å
          strukturere hverdagen for å unngå at energiforbruket blir for høyt
          eller for lavt. Metoden kan brukes for:
          <ul className="list-disc list-inside">
            <li>
              Å finne en balanse mellom hva en klarer å utføre og hva en faktisk
              gjør
            </li>
            <li>Å bygge opp evne til å tåle et høyere aktivitetsnivå</li>
          </ul>
        </p>
        <p>
          Hentet fra{" "}
          <a
            className="text-blue-500 hover:underline"
            href="https://uni.oslomet.no/aktivitetskalkulator/wp-content/uploads/sites/376/2023/02/Aktivitetskalkulator-Informasjonsbrosjyre-ny-versjon.pdf"
            target="_blank"
            rel="noopener noreferrer">
            Aktivitetskalkulator-Informasjonsbrosjyre
          </a>
        </p>
      </details>
      <br />
      <TimeEntryForm />
      <Calendar />
      <EffortGraph />
    </div>
  );
}

export default App;
