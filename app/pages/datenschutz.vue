<template>
  <main class="legal">
    <NuxtLink class="back" to="/">place to be</NuxtLink>
    <h1>Datenschutz</h1>
    <p>
      Hier steht, welche Daten beim Besuch von placetobe.studio verarbeitet werden und welche Rechte Sie haben.
    </p>

    <h2>Verantwortliche</h2>
    <address>
      Lilly Passora<br>
      Einzelunternehmen<br>
      Börnestraße 16<br>
      13086 Berlin
    </address>
    <p>
      Telefon: <a href="tel:+491637431572">+49 163 7431572</a><br>
      E-Mail: <a href="mailto:lilly@placetobe.studio">lilly@placetobe.studio</a>
    </p>

    <h2>Hosting</h2>
    <p>
      Die Website wird bei einem externen Anbieter gehostet. Beim Aufruf verarbeitet der Server technisch erforderliche Verbindungsdaten, damit die Seite ausgeliefert werden kann: IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse und Angaben zum Browser. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das Interesse ist der sichere und zuverlässige Betrieb der Website.
    </p>

    <h2>Google Analytics</h2>
    <p>
      Wenn Sie einwilligen, nutzt diese Website Google Analytics, um zu verstehen, wie die Seiten verwendet werden. Dabei können Cookies gesetzt und Nutzungsdaten an Google übermittelt werden, auch in die USA. Die Messung startet erst nach „Akzeptieren“ im Hinweis auf der Website. Ohne Einwilligung wird das Google-Skript nicht geladen.
    </p>
    <p>
      Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO. Ihre Entscheidung wird in diesem Browser gespeichert. Sie können die Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Danach erscheint der Hinweis wieder.
    </p>
    <button type="button" class="revoke" @click="revoke">Einwilligung widerrufen</button>
    <p>
      Hinweise von Google: <a href="https://policies.google.com/privacy" rel="noopener">Datenschutzerklärung von Google</a>.
    </p>

    <h2>Stundenplan und Buchung</h2>
    <p>
      Der Stundenplan auf der Startseite wird von Eversports geladen. Dabei kann Eversports Ihre IP-Adresse und technische Nutzungsdaten verarbeiten. Buchungen über „Jetzt buchen“ und die Angebotslinks öffnen Seiten von Eversports. Dort gilt die Datenschutzerklärung von Eversports.
    </p>
    <p>
      Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Verarbeitung der Buchung dient, und Art. 6 Abs. 1 lit. f DSGVO für die Anzeige des Stundenplans.
    </p>

    <h2>Instagram</h2>
    <p>
      Die Website verlinkt auf das Profil <a href="https://www.instagram.com/placetobe.studio/" rel="noopener">instagram.com/placetobe.studio</a>. Es ist kein Instagram-Inhalt eingebettet. Daten werden an Instagram erst übermittelt, wenn Sie den Link öffnen. Danach gilt die Datenschutzerklärung von Instagram.
    </p>

    <h2>Hinweis zum Urban-Sports-Popup</h2>
    <p>
      Damit der Hinweis zu Urban Sports in einem Besuch nur einmal erscheint, wird ein Sitzungs-Cookie gesetzt. Es speichert keine persönlichen Angaben und wird gelöscht, wenn Sie den Browser schließen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
    </p>

    <h2>E-Mail und Telefon</h2>
    <p>
      Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir die Angaben, die Sie uns dafür schicken, um zu antworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn es um eine Buchung oder Anfrage zu unseren Angeboten geht, sonst Art. 6 Abs. 1 lit. f DSGVO.
    </p>

    <h2>Ihre Rechte</h2>
    <p>
      Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Eine erteilte Einwilligung können Sie jederzeit widerrufen. Sie können sich außerdem bei einer Aufsichtsbehörde beschweren, zum Beispiel bei der Berliner Beauftragten für Datenschutz und Informationsfreiheit, Alt-Moabit 59-61, 10555 Berlin.
    </p>
    <p>
      Anfragen richten Sie an <a href="mailto:lilly@placetobe.studio">lilly@placetobe.studio</a>.
    </p>

    <nav class="legal-nav" aria-label="Rechtliches">
      <NuxtLink to="/impressum">Impressum</NuxtLink>
      <NuxtLink to="/datenschutz">Datenschutz</NuxtLink>
    </nav>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Datenschutz – place to be',
  htmlAttrs: { lang: 'de' },
})

function revoke() {
  localStorage.removeItem('ptb-analytics')
  window.location.reload()
}
</script>

<style src="~/assets/css/legal.css"></style>
