<template>
  <div v-if="visible" class="consent" role="dialog" aria-labelledby="consent-title">
    <p id="consent-title">
      Wir verwenden Google Analytics, um zu verstehen, wie die Website genutzt wird. Dabei werden Cookies gesetzt.
    </p>
    <div class="actions">
      <button type="button" class="choice decline" @click="decline">Ablehnen</button>
      <button type="button" class="choice accept" @click="accept">Akzeptieren</button>
    </div>
  </div>
</template>

<script setup lang="ts">
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const STORAGE_KEY = 'ptb-analytics'
const GA_ID = 'G-YWFE7H53SL'

const visible = ref(false)

function accept() {
  localStorage.setItem(STORAGE_KEY, 'granted')
  visible.value = false
  loadAnalytics()
}

function decline() {
  localStorage.setItem(STORAGE_KEY, 'denied')
  visible.value = false
}

function loadAnalytics() {
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag() {
    // Google's tag reads the special arguments object, not a rest array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments)
  }
  if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}

onMounted(() => {
  visible.value = localStorage.getItem(STORAGE_KEY) == null
})
</script>

<style scoped>
.consent {
  position: fixed;
  z-index: 1100;
  left: 50%;
  bottom: max(24px, env(safe-area-inset-bottom, 0px));
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: min(560px, calc(100% - 32px));
  margin: 0;
  padding: 24px 28px;
  border-radius: 48px;
  background: #fff;
  color: #3d3122;
  box-shadow: 0 12px 40px rgba(82, 65, 45, 0.12);
}

.consent p {
  margin: 0;
  font-family: "Alte Haas Grotesk", sans-serif;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.choice {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  height: 40px;
  padding: 0 24px;
  border: 0;
  border-radius: 80px;
  color: #52412d;
  font-family: Blur, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
}

.accept {
  background: #c5edf7;
}

.decline {
  background: rgba(197, 237, 247, 0.24);
}

.choice:hover {
  filter: brightness(0.98);
}

.choice:focus-visible {
  outline: 2px solid #52412d;
  outline-offset: 3px;
}

@media (max-width: 480px) {
  .consent {
    padding: 20px;
    border-radius: 32px;
  }

  .actions {
    flex-direction: column;
  }

  .choice {
    width: 100%;
  }
}
</style>
