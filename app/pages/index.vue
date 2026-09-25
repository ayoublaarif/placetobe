<template>
  <main class="page">
    <section class="hero">
      <div class="hero-nav">
        <a class="nav-link place" href="#kontakt">
          <img src="/images/dot.svg" width="16" height="16" alt="">
          Börnestraße 16
        </a>
        <div class="hero-core">
          <a class="nav-link" href="#schedule">
            <img src="/images/dot.svg" width="16" height="16" alt="">
            Schedule
          </a>
          <LogoMark variant="hero" />
          <a class="nav-link" href="#angebote">
            <img src="/images/dot.svg" width="16" height="16" alt="">
            Preis
          </a>
        </div>
      </div>

      <div class="intro">
        <h1>Yoga, Kunst, und Zeit für Dich</h1>
        <a class="book book-lg" href="#buchen">Jetzt buchen</a>
      </div>
    </section>

    <section id="angebote" class="offers">
      <h2>Angebote zur Eröffnung</h2>
      <OfferCard
        class="feature"
        size="lg"
        title="Herbst Angebot - ein Monat Karte"
        :lines="['30 Classes für ein Monat', 'Max. 1 participation / day']"
        price="99€"
      />
      <div class="offer-row">
        <OfferCard
          size="sm"
          title="8er + 2 Frei Karte"
          :lines="['10 Classes für 3 Monat']"
          price="120€"
        />
        <a class="book book-sm see-all" href="#angebote">See all offers</a>
        <OfferCard
          size="sm"
          title="3er Starter Angebot"
          :lines="['3 Classes für ein Monat']"
          price="44€"
        />
      </div>
    </section>

    <footer id="kontakt" class="footer">
      <div class="footer-main">
        <div class="footer-block">
          <p class="label">Adress</p>
          <p class="detail addr-wide">
            Börnestraße 16, 13086 Berlin
          </p>
          <p class="detail addr-narrow">
            Lychenerstraße 11<br>
            10437 Berlin
          </p>
        </div>
        <LogoMark variant="footer" />
        <div class="footer-block">
          <p class="label">Kontakt</p>
          <p class="detail">
            <a href="mailto:contact@placetobe.studio">contact@placetobe.studio</a>
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
useHead({
  title: 'place to be',
  htmlAttrs: { lang: 'de' },
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
  gap: 8px;
  width: 160px;
  height: 48px;
  color: #3d3022;
  font-family: "Alte Haas Grotesk", sans-serif;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
}

.nav-link img {
  width: 16px;
  height: 16px;
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
    width: 12.4px;
    height: 12.4px;
  }
}

@media (max-width: 839px) {
  .page {
    gap: 104px;
  }

  .hero {
    gap: 80px;
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
