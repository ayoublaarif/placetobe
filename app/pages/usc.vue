<template>
  <main class="page">
    <section class="signup">
      <LogoMark variant="hero" />
      <form v-if="status !== 'success'" class="card" @submit.prevent="submit">
        <span class="badge" aria-hidden="true">
          <span class="badge-disc">
            <img src="/images/usc-badge.png" alt="" width="104" height="104">
          </span>
        </span>
        <div class="card-head">
          <p class="offer">4 = 6</p>
          <p class="subtitle">4 mal eingecheckt ?<br class="mobile-break"> 2 mal geschenkt!</p>
        </div>
        <div class="fields">
          <label>
            name
            <input v-model="name" type="text" name="name" autocomplete="name" placeholder="placetobe@mail.com" required>
          </label>
          <label>
            e-mail
            <input v-model="email" type="email" name="email" autocomplete="email" placeholder="placetobe@mail.com" required>
          </label>
          <label>
            whatsapp nummer
            <input v-model="phone" type="tel" name="phone" autocomplete="tel" placeholder="0 1777 042 321" required>
          </label>
        </div>
        <p v-if="errorMessage" class="notice" role="alert">{{ errorMessage }}</p>
        <button type="submit" :disabled="status === 'submitting'" :aria-busy="status === 'submitting'" aria-label="2 Gratis-Tickets sichern">
          <span class="button-label" :class="{ 'is-hidden': status === 'submitting' }">2 gratis-tickets sichern</span>
          <span v-if="status === 'submitting'" class="dots" aria-hidden="true">
            <span /><span /><span /><span />
          </span>
        </button>
      </form>
      <div v-else class="card is-success" role="status">
        <span class="badge" aria-hidden="true">
          <span class="badge-disc">
            <img src="/images/usc-badge.png" alt="" width="88" height="88">
          </span>
        </span>
        <img class="check" src="/images/gift-redeemed.svg" alt="" width="99.5519" height="97.7475">
        <div class="success-copy">
          <p class="success-title">Geschafft!</p>
          <p class="success-body">Wir prüfen jetzt deine 4 USC Check-ins. Wenn alles passt, bekommst du 2 Gratis-Klassen bei place to be über Whatsapp.</p>
        </div>
      </div>
    </section>

    <footer class="footer" aria-label="Kontakt">
      <div class="footer-card">
        <div class="footer-main">
          <div class="footer-block">
            <p class="label">Adresse</p>
            <p class="detail addr">Börnestraße 16, 13086 Berlin</p>
          </div>
          <LogoMark variant="footer" />
          <div class="footer-block contact-links">
            <p class="label">Kontakt</p>
            <p class="detail"><a href="mailto:lilly@placetobe.studio">lilly@placetobe.studio</a></p>
            <p class="detail"><a href="tel:+491637431572">+49 163 7431572</a></p>
          </div>
        </div>
        <div class="socials">
          <a href="https://www.tiktok.com" aria-label="TikTok">
            <img src="/images/tiktok.svg" width="24" height="24" alt="">
          </a>
          <a href="https://www.instagram.com/placetobe.studio/" aria-label="Instagram">
            <img src="/images/instagram.svg" width="24" height="24" alt="">
          </a>
          <a class="facebook" href="https://www.facebook.com" aria-label="Facebook">
            <img class="fb-base" src="/images/fb-g27.svg" width="20" height="20" alt="">
            <img class="fb-mark" src="/images/fb-g31.svg" width="9.118" height="16.298" alt="">
          </a>
        </div>
      </div>
      <nav class="footer-legal" aria-label="Rechtliches">
        <NuxtLink to="/impressum">Impressum</NuxtLink>
        <NuxtLink to="/datenschutz">Datenschutz</NuxtLink>
      </nav>
    </footer>
  </main>
</template>

<script setup lang="ts">
const name = ref('')
const email = ref('')
const phone = ref('')
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const errorMessage = ref('')

function digits(value: string) {
  return value.replace(/\D/g, '')
}

async function submit() {
  errorMessage.value = ''
  const payload = {
    name: name.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
  }
  const phoneDigits = digits(payload.phone)
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)
  if (payload.name.length < 2 || !emailOk || phoneDigits.length < 8 || phoneDigits.length > 15) {
    errorMessage.value = 'Please check your name, email, and WhatsApp number.'
    status.value = 'error'
    return
  }

  status.value = 'submitting'
  try {
    const result = await $fetch<{ ok: boolean, reason?: string }>('/api/usc', {
      method: 'POST',
      body: payload,
    })
    if (result.ok) {
      status.value = 'success'
      return
    }
    errorMessage.value = result.reason === 'details'
      ? 'Please check your name, email, and WhatsApp number.'
      : 'Something went wrong. Please try again.'
    status.value = 'error'
  }
  catch {
    errorMessage.value = 'Something went wrong. Please try again.'
    status.value = 'error'
  }
}

useHead({
  title: '4 = 6 | place to be',
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

.signup {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 120px;
}

.signup :deep(.kind-hero) {
  --size: 288px;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 488px;
  margin: 0;
  padding: 32px;
  border-radius: 24px;
  background: #c5edf7;
}

.badge {
  position: absolute;
  top: -57px;
  right: -28px;
  display: grid;
  width: 127.373px;
  height: 127.373px;
  place-items: center;
  pointer-events: none;
}

.badge-disc {
  width: 104px;
  height: 104px;
  overflow: hidden;
  border-radius: 50%;
  transform: rotate(15deg);
}

.badge-disc img {
  display: block;
  width: 116.57%;
  height: 116.57%;
  max-width: none;
  margin-left: -8.28%;
  margin-top: -8.28%;
}

.card-head,
.fields,
label {
  width: 100%;
}

.card-head {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.offer,
.subtitle {
  margin: 0;
  color: #52412d;
  font-family: Blur, sans-serif;
  font-weight: 500;
  text-align: center;
}

.offer {
  font-size: 56px;
  line-height: 56px;
  letter-spacing: 1.12px;
}

.subtitle {
  font-size: 28px;
  line-height: 32px;
}

.mobile-break {
  display: none;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #52412d;
  font-family: "Alte Haas Grotesk", sans-serif;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
}

input {
  width: 100%;
  height: 48px;
  margin: 0;
  padding: 16px;
  border: 1px solid #52412d;
  border-radius: 4px;
  background: #f1fbfd;
  color: #3d3122;
  font: inherit;
  line-height: 16px;
  text-align: center;
}

input::placeholder {
  color: #3d3122;
  opacity: 0.48;
}

input:focus-visible,
button:focus-visible,
.socials a:focus-visible,
.footer-legal a:focus-visible {
  outline: 2px solid #52412d;
  outline-offset: 0px;
}

button {
  position: relative;
  height: 48px;
  padding: 0 24px;
  border: 0;
  border-radius: 80px;
  background: #f1fbfd;
  color: #52412d;
  font-family: Blur, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
}

button:disabled {
  cursor: default;
}

.button-label.is-hidden {
  visibility: hidden;
}

.dots {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  animation: usc-dot 1.05s ease-in-out infinite;
}

.dots span:nth-child(2) {
  animation-delay: 0.14s;
}

.dots span:nth-child(3) {
  animation-delay: 0.28s;
}

.dots span:nth-child(4) {
  animation-delay: 0.42s;
}

@keyframes usc-dot {
  0%,
  60%,
  100% {
    transform: translateY(0);
  }

  30% {
    transform: translateY(-4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .dots span {
    animation: none;
  }
}

.notice {
  margin: 0;
  color: #3d3122;
  font-family: "Alte Haas Grotesk", sans-serif;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
}

.is-success {
  gap: 24px;
  padding: 24px;
}

.is-success .badge {
  top: -56px;
  width: 107.778px;
  height: 107.778px;
}

.is-success .badge-disc {
  width: 88px;
  height: 88px;
}

.check {
  display: block;
  flex-shrink: 0;
}

.success-copy {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding-inline: 24px;
  text-align: center;
}

.success-title,
.success-body {
  margin: 0;
}

.success-title {
  color: #52412d;
  font-family: Blur, sans-serif;
  font-size: 28px;
  font-weight: 500;
  line-height: 40px;
}

.success-body {
  color: #3d3122;
  font-family: "Alte Haas Grotesk", sans-serif;
  font-size: 16px;
  line-height: 24px;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.footer-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  width: 100%;
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

.contact-links {
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

.addr {
  width: 215px;
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

.footer-legal {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 0 0 24px;
  color: #52412d;
  font-family: "Alte Haas Grotesk", sans-serif;
  font-size: 16px;
  line-height: 24px;
}

.footer-legal a {
  text-decoration: none;
}

@media (max-width: 1099px) {
  .signup {
    gap: 48px;
    padding-inline: 24px;
  }

  .card {
    width: min(488px, 100%);
  }
}

@media (max-width: 839px) {
  .page {
    gap: 64px;
    padding-top: 32px;
  }

  .signup {
    flex-direction: column;
    align-items: center;
    gap: 48px;
    padding-inline: 24px;
  }

  .signup :deep(.kind-hero) {
    --size: 160px;
  }

  .card {
    width: min(368px, 100%);
    padding: 24px;
  }

  .badge {
    top: -54px;
    right: -22px;
    width: 107.778px;
    height: 107.778px;
  }

  .badge-disc {
    width: 88px;
    height: 88px;
  }

  .mobile-break {
    display: block;
  }

  .subtitle {
    line-height: 40px;
  }

  .footer-card {
    gap: 32px;
    min-height: 0;
    padding: 48px 16px;
  }

  .footer-main {
    flex-direction: column;
    gap: 32px;
  }

  .addr {
    width: auto;
  }
}
</style>
