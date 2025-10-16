import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-8 font-['DM_Serif_Text']">
          Datenschutzerklärung
        </h1>
        
        <div className="prose prose-lg max-w-none text-foreground/80 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Allgemeine Hinweise</h2>
            <p>
              Der Schutz Ihrer persönlichen Daten ist uns sehr wichtig. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p>
              Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und den Zweck der Verarbeitung von personenbezogenen Daten auf dieser Website: https://hydrotrace.io
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Verantwortliche Stelle</h2>
            <p>Verantwortlich im Sinne der DSGVO:</p>
            <p>info@hydrotrace.io</p>
            <p>Telefon: +49 176 84375997</p>
            <p>69198 Schriesheim, Baden-Württemberg</p>
            <p className="text-sm">(Vollständige Adresse aus Datenschutzgründen nicht veröffentlicht)</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Erhebung und Verarbeitung personenbezogener Daten</h2>
            <h3 className="text-xl font-semibold text-foreground mb-3">Kontaktaufnahme</h3>
            <p>
              Wenn Sie uns per Kontaktformular kontaktieren, werden die von Ihnen gemachten Angaben (z. B. Name, E-Mail-Adresse, Nachricht) ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Die Daten werden per E-Mail an uns übermittelt und nicht auf der Website gespeichert.
            </p>
            <p>Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Ihre Rechte</h2>
            <p>Sie haben gemäß DSGVO das Recht:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Auskunft über Ihre gespeicherten Daten zu erhalten</li>
              <li>Die Berichtigung unrichtiger Daten zu verlangen</li>
              <li>Die Löschung Ihrer Daten zu beantragen (sofern keine gesetzlichen Aufbewahrungspflichten bestehen)</li>
              <li>Die Einschränkung der Verarbeitung zu verlangen</li>
              <li>Der Verarbeitung Ihrer Daten zu widersprechen</li>
            </ul>
            <p className="mt-4">Bitte wenden Sie sich dazu an: info@hydrotrace.io</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Datensicherheit</h2>
            <p>
              Diese Website verwendet technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten gegen Manipulation, Verlust oder unbefugten Zugriff zu schützen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Externe Inhalte</h2>
            <p>
              Diese Website kann eingebettete Inhalte Dritter (z. B. Karten, Videos, Schriften) enthalten. Diese externen Anbieter können Ihre IP-Adresse sehen oder Cookies setzen. Bitte beachten Sie die Datenschutzrichtlinien dieser Drittanbieter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Keine Verwendung von Cookies oder Tracking</h2>
            <p>
              Diese Website verwendet keine Cookies zur Nutzerverfolgung und keine Analyse- oder Tracking-Tools wie Google Analytics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Änderungen</h2>
            <p>
              Wir behalten uns das Recht vor, diese Datenschutzerklärung zu aktualisieren. Die jeweils aktuelle Version finden Sie auf dieser Seite.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
