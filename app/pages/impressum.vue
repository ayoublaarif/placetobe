<template>
  <main class="legal">
    <NuxtLink class="back" to="/">place to be</NuxtLink>
    <h1>Impressum</h1>
    <p>Angaben gemäß § 5 DDG</p>
    <address>
      Lilly Passora<br>
      Einzelunternehmen<br>
      Börnestraße 16<br>
      13086 Berlin
    </address>
    <h2>Kontakt</h2>
    <p>
      Telefon: <a href="tel:+491637431572">+49 163 7431572</a><br>
      E-Mail: <a href="mailto:lilly@placetobe.studio">lilly@placetobe.studio</a>
    </p>
    <h2>Verantwortlich für den Inhalt</h2>
    <p>Verantwortlich nach § 18 Abs. 2 MStV:</p>
    <address>
      Lilly Passora<br>
      Börnestraße 16<br>
      13086 Berlin
    </address>
    <nav class="legal-nav" aria-label="Rechtliches">
      <NuxtLink to="/impressum">Impressum</NuxtLink>
      <NuxtLink to="/datenschutz">Datenschutz</NuxtLink>
    </nav>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Impressum – place to be',
  htmlAttrs: { lang: 'de' },
})
</script>

<style src="~/assets/css/legal.css"></style>
