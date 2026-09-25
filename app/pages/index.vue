<template>
  <main class="page">
    <section class="hero">
      <div class="hero-nav">
        <a class="nav-link place" href="https://maps.app.goo.gl/cdR8k1HVQb9f53nt9">
          <img src="/images/mappin.png" width="32" height="32" alt="">
          Börnestraße 16
        </a>
        <div class="hero-core">
          <a class="nav-link" href="#schedule">
            <img src="/images/schedule.png" width="32" height="32" alt="">
            Stundenplan
          </a>
          <LogoMark variant="hero" />
          <a class="nav-link" href="#angebote">
            <img src="/images/price.png" width="32" height="32" alt="">
            Preise
          </a>
        </div>
      </div>

      <div class="intro">
        <h1>Yoga, Kunst und Zeit für Dich</h1>
        <a class="book book-lg" href="https://www.eversports.de/org/widget/ef5c9de3-75b4-40c1-9907-032896c0992e?venueId=ceda3334-1691-4841-9369-794e50c4945e">Jetzt buchen</a>
      </div>
    </section>

    <section id="angebote" class="offers">
      <h2>Angebote zur Eröffnung</h2>
      <OfferCard
        class="feature"
        size="lg"
        image="/images/doo1.png"
        title="Herbstangebot : Karte für einen Monat"
        :lines="['30 Klassen für 1 Monat', '1. Klasse pro Tag']"
        price="99€"
        href="https://www.eversports.de/org/product/04fdefcc-b5fc-43f5-a0f2-61f0477e3064?venueId=ceda3334-1691-4841-9369-794e50c4945e"
      />
      <div class="offer-row">
        <OfferCard
          size="sm"
          image="/images/doo2.png"
          title="8er Karte +2 Freikarten"
          :lines="['10 Klassen für 3 Monate']"
          price="120€"
          href="https://www.eversports.de/org/product/686dbaf2-dba1-4ea1-a780-1c899d76e97e?venueId=ceda3334-1691-4841-9369-794e50c4945e"
        />
        <a class="book book-sm see-all" href="https://www.eversports.de/org/widget/ef5c9de3-75b4-40c1-9907-032896c0992e?venueId=ceda3334-1691-4841-9369-794e50c4945e">Alle Angebote hier</a>
        <OfferCard
          size="sm"
          image="/images/doo3.png"
          title="3er Starterangebot"
          :lines="['3 Klassen für 1 Monat']"
          price="44€"
          href="https://www.eversports.de/org/product/41a9e72b-20d0-4515-b102-ae9a947b1536?venueId=ceda3334-1691-4841-9369-794e50c4945e"
        />
      </div>
    </section>

    <section id="schedule" class="schedule">
      <h2>Stundenplan</h2>
      <div
        class="schedule-widget"
        data-eversports-widget-id="64d2a8a6-517e-4e61-9de3-8e0f01ab99dd"
      />
    </section>

    <footer id="kontakt" class="footer">
      <div class="footer-main">
        <div class="footer-block">
          <div class="footer-block-icon" gap="2px">
            <img src="/images/mappin.png" width="48" height="48" alt="">
            <p class="label">Adresse</p>
          </div>
          
          <p class="detail addr-wide">
            Börnestraße 16, 13086 Berlin
          </p>
          <p class="detail addr-narrow">
            Börnestraße 16<br>
            13086 Berlin
          </p>
        </div>
        <LogoMark variant="footer" />
        <div class="footer-block">
          <div class="footer-block-icon" gap="2px">
            <img src="/images/contact.png" width="48" height="48" alt="">
            <p class="label">Kontakt</p>
          </div>
          
          <p class="detail">
            <a href="mailto:contact@placetobe.studio">lilly@placetobe.studio</a>
          </p>
          <p class="detail">
            <a href="tel:+491637431572">+49 163 7431572</a>
          </p>
        </div>
      </div>
      <div class="socials">
        <a href="https://www.tiktok.com" aria-label="TikTok">
          <img src="/images/tiktok.svg" width="24" height="24" alt="">
        </a>
        <a href="https://www.instagram.com" aria-label="Instagram">
          <img src="/images/instagram.svg" width="24" height="24" alt="">
        </a>
        <a class="facebook" href="https://www.facebook.com" aria-label="Facebook">
          <img class="fb-base" src="/images/fb-g27.svg" width="20" height="20" alt="">
          <img class="fb-mark" src="/images/fb-g31.svg" width="9.118" height="16.298" alt="">
        </a>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
const eversportsSrc = 'https://widget-static.eversports.io/loader.js'

useHead({
  title: 'place to be',
  htmlAttrs: { lang: 'de' },
})

onMounted(() => {
  if (document.querySelector(`script[src="${eversportsSrc}"]`)) return

  const script = document.createElement('script')
  script.type = 'module'
  script.src = eversportsSrc
  script.async = true
  document.body.appendChild(script)
})
</script>

<style scoped>
.page {
  width: min(1440px, 100%);
  margin-inline: auto;
  padding-top: 88px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 120px;
  overflow: clip;
}

.page > * {
  width: min(1232px, 100%);
}

#angebote,
#schedule,
#kontakt {
  scroll-margin-top: 48px;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 88px;
}

.hero-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 88px;
  width: min(928px, 100%);
}

.hero-core {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(32px, calc((100% - 608px) / 2), 160px);
  width: 100%;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 160px;
  height: 48px;
  color: #52412D;
  font-family: "Alte Haas Grotesk", sans-serif;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
}

.nav-link img {
  width: 48px;
  height: 48px; 
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
  width: min(431px, 100%);
}

h1 {
  margin: 0;
  color: #3d3122;
  font-family: "Alte Haas Grotesk", sans-serif;
  font-size: 32px;
  font-weight: 400;
  line-height: 44px;
  text-align: center;
}

.book {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  border-radius: 80px;
  background: #c5edf7;
  color: #52412d;
  font-family: Blur, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  white-space: nowrap;
}

.book:hover {
  filter: brightness(0.98);
}

.book:focus-visible,
.nav-link:focus-visible,
.socials a:focus-visible {
  outline: 2px solid #52412d;
  outline-offset: 3px;
}

.book-lg {
  height: 48px;
}

.book-sm {
  height: 40px;
}

.offers {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.schedule {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.schedule h2 {
  position: static;
  width: auto;
  margin-bottom: 32px;
}

.schedule-widget {
  width: 100%;
}

h2 {
  position: absolute;
  top: 88px;
  left: 88px;
  width: 256px;
  margin: 0;
  color: #3d3122;
  font-family: "Alte Haas Grotesk", sans-serif;
  font-size: 32px;
  font-weight: 400;
  line-height: 44px;
  text-align: center;
}

.feature {
  margin-bottom: -88px;
  position: relative;
  z-index: 1;
}

.offer-row {
  display: grid;
  grid-template-columns: minmax(0, 320px) auto minmax(0, 320px);
  align-items: center;
  justify-content: center;
  gap: clamp(20px, 5vw, 85px);
  width: 100%;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  min-height: 397px;
  padding: 48px 0;
  border-radius: 48px;
  background: rgba(197, 237, 247, 0.24);
}

.footer-main {
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
}

.footer-block {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

.footer-block:last-child {
  gap: 8px;
}

.label {
  margin: 0;
  color: #52412d;
  font-family: "Alte Haas Grotesk", sans-serif;
  font-size: 16px;
  line-height: 24px;
}

.detail {
  margin: 0;
  color: #52412d;
  font-family: Blur, sans-serif;
  font-size: 22px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0.44px;
}

.addr-wide {
  width: 215px;
}

.addr-narrow {
  display: none;
}

.socials {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.socials img {
  display: block;
}

.facebook {
  position: relative;
  display: block;
  width: 24px;
  height: 24px;
}

.fb-base,
.fb-mark {
  position: absolute;
  transform: scaleY(-1);
}

.fb-base {
  left: 1.83px;
  top: 1.83px;
  width: 20px;
  height: 19.927px;
}

.fb-mark {
  left: 7.35px;
  top: 5.53px;
  width: 9.118px;
  height: 16.298px;
}

@media (max-width: 1099px) {
  h2 {
    position: static;
    width: min(280px, 90%);
    margin-bottom: 24px;
  }
}

@media (max-width: 959px) {
  .page {
    gap: clamp(80px, 10vw, 120px);
  }

  .hero {
    gap: clamp(64px, 8vw, 88px);
  }

  .hero-nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    row-gap: 49px;
    width: 100%;
  }

  .hero-core {
    display: contents;
  }

  .place {
    grid-column: 1 / -1;
    grid-row: 1;
  }

  .hero-core > .nav-link:first-child {
    grid-column: 1;
    grid-row: 2;
    justify-self: start;
  }

  .hero-core > .nav-link:last-child {
    grid-column: 2;
    grid-row: 2;
    justify-self: end;
  }

  .hero-core > .mark {
    grid-column: 1 / -1;
    grid-row: 3;
    margin-top: 4px;
  }

  .nav-link {
    width: auto;
    min-width: 120px;
    height: 44px;
  }

  .nav-link img {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 839px) {
  .page {
    gap: 104px;
    padding-top: 0;
  }

  .hero {
    box-sizing: border-box;
    height: calc(100vh - 32px);
    height: calc(100svh - 32px);
    justify-content: flex-end;
    gap: 16px;
    padding-top: max(16px, env(safe-area-inset-top, 0px));
  }

  .hero-nav {
    flex: 1 1 auto;
    row-gap: 12px;
    align-content: space-evenly;
  }

  .hero-core > .mark {
    margin-top: 0;
  }

  .intro {
    gap: 20px;
  }

  .intro {
    width: min(296px, 100%);
  }

  h1 {
    line-height: 48px;
  }

  .offers {
    gap: 24px;
  }

  h2 {
    width: min(238px, 90%);
    margin-bottom: 0;
    line-height: 48px;
  }

  .feature {
    margin-bottom: -24px;
  }

  .offer-row {
    grid-template-columns: minmax(0, 400px);
    justify-items: center;
    gap: 0;
  }

  .see-all {
    grid-row: 3;
    justify-self: center;
    margin-top: 24px;
  }

  .offer-row > :last-child {
    grid-row: 2;
  }

  .footer {
    gap: 32px;
    min-height: 640px;
    padding: 48px 16px;
  }

  .footer-main {
    flex-direction: column;
    gap: 32px;
  }

  .addr-wide {
    display: none;
  }

  .addr-narrow {
    display: block;
  }
}
</style>
