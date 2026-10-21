<template>
  <main class="page">
    <section ref="introEl" class="intro">
      <div class="logo-slot">
        <LogoMark variant="hero" />
      </div>
      <div class="intro-copy">
        <h1>Thank you for making it to here!</h1>
        <p>&</p>
        <p class="congrats">Congrats for your 50% OFF Voucher!</p>
        <p>Here is how to unlock it:</p>
      </div>
    </section>

    <section ref="stepperEl" class="stepper" aria-label="How to unlock the voucher">
      <div class="stepper-row">
        <div ref="headlineViewport" class="headline-viewport">
          <div class="headline-track" :class="{ ready: trackReady }" :style="{ transform: `translateY(${trackOffset}px)` }">
            <div
              v-for="(step, i) in steps"
              :key="step.title"
              :ref="(el) => setHeadline(el, i)"
              class="headline"
              :class="{ active: i === index }"
            >
              <button
                type="button"
                :aria-current="i === index ? 'step' : undefined"
                @click="goTo(i)"
              >
                <span class="num">{{ i + 1 }}.</span>
                <span class="title">{{ step.title }}</span>
              </button>
              <a
                v-if="step.href"
                class="cta"
                :href="step.href"
                :tabindex="i === index ? 0 : -1"
                :aria-hidden="i === index ? undefined : true"
              >Go to eversports</a>
            </div>
          </div>
        </div>

        <div class="circle" aria-hidden="true">
          <div class="phone-track" :class="{ ready: trackReady }" :style="{ transform: `translateY(${-index * 100}%)` }">
            <img
              v-for="(step, i) in steps"
              :key="`phone-${i}`"
              class="phone"
              :style="{ top: `calc(${i} * 100% + 15.714%)` }"
              :src="step.image"
              alt=""
              width="315"
              height="560"
            >
          </div>
        </div>
      </div>
    </section>

    <section
      v-for="(step, i) in steps"
      :key="`screen-${i}`"
      :ref="(el) => setMobileStep(el, i)"
      class="step-screen"
    >
      <div class="step-copy">
        <h2>
          <span class="num">{{ i + 1 }}.</span>
          {{ step.title }}
        </h2>
        <a v-if="step.href" class="book" :href="step.href">Go to eversports</a>
      </div>
      <div class="circle" aria-hidden="true">
        <img class="phone" :src="step.image" alt="" width="315" height="560">
      </div>
    </section>

    <section ref="helpEl" class="help">
      <p class="help-intro">Please if you faced any kind of difficulty, feel free to contact us here:</p>
      <div class="help-links">
        <p><a href="mailto:contact@placetobe.studio">Email: contact@placetobe.studio</a></p>
        <p><a href="https://wa.me/491637431572">Whatsapp: +49 163 7431572</a></p>
      </div>
    </section>

    <footer class="contact" aria-label="Kontakt">
      <div class="contact-card">
        <div class="contact-main">
          <div class="contact-block">
            <p class="label">Adresse</p>
            <p class="detail addr">Börnestraße 16, 13086 Berlin</p>
          </div>
          <LogoMark variant="footer" />
          <div class="contact-block contact-links">
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
const eversportsHref = 'https://www.eversports.de/org/widget/ef5c9de3-75b4-40c1-9907-032896c0992e?venueId=ceda3334-1691-4841-9369-794e50c4945e'

const steps = [
  { title: 'Create an account on eversports', image: '/images/voucher-phone.png', href: '' },
  { title: 'Enter your voucher here', image: '/images/voucher-phone.png', href: eversportsHref },
  { title: 'Select your preferred Payment method and pay', image: '/images/voucher-phone.png', href: '' },
]

const index = ref(0)
const trackOffset = ref(0)
const trackReady = ref(false)
const introEl = ref<HTMLElement | null>(null)
const stepperEl = ref<HTMLElement | null>(null)
const helpEl = ref<HTMLElement | null>(null)
const headlineViewport = ref<HTMLElement | null>(null)
const headlineEls = ref<HTMLElement[]>([])
const mobileStepEls = ref<HTMLElement[]>([])

const MOTION_MS = 680
const GESTURE_GAP = 220
let locked = false
let busy = false
let animating = false
let consumed = false
let gestureTimer = 0
let motionTimer = 0
let touchStartY = 0
let touchStartX = 0

useHead({
  title: '50% off a yoga class | place to be',
  htmlAttrs: { lang: 'en' },
})

function setHeadline(el: Element | ComponentPublicInstance | null, i: number) {
  if (el instanceof HTMLElement) headlineEls.value[i] = el
}

function setMobileStep(el: Element | ComponentPublicInstance | null, i: number) {
  if (el instanceof HTMLElement) mobileStepEls.value[i] = el
}

function isMobile() {
  return window.matchMedia('(max-width: 839px)').matches
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function centerDistance() {
  const el = stepperEl.value
  if (!el) return 9999
  const rect = el.getBoundingClientRect()
  return rect.top + rect.height / 2 - window.innerHeight / 2
}

function syncTrack() {
  const viewport = headlineViewport.value
  const current = headlineEls.value[index.value]
  if (!viewport || !current) return
  const viewportCenter = viewport.clientHeight / 2
  const currentCenter = current.offsetTop + current.offsetHeight / 2
  trackOffset.value = viewportCenter - currentCenter
}

function noteGesture() {
  window.clearTimeout(gestureTimer)
  gestureTimer = window.setTimeout(() => {
    consumed = false
  }, GESTURE_GAP)
}

function holdMotion() {
  busy = true
  window.clearTimeout(motionTimer)
  motionTimer = window.setTimeout(() => {
    busy = false
  }, MOTION_MS)
}

function animateScrollTo(top: number) {
  const from = window.scrollY
  const distance = top - from
  if (Math.abs(distance) < 1) return
  const duration = reducedMotion() ? 0 : MOTION_MS
  const start = performance.now()
  animating = true
  function frame(now: number) {
    const t = duration === 0 ? 1 : Math.min(1, (now - start) / duration)
    const eased = 1 - (1 - t) ** 3
    window.scrollTo(0, from + distance * eased)
    if (t < 1) requestAnimationFrame(frame)
    else animating = false
  }
  requestAnimationFrame(frame)
}

function smoothCenter() {
  animateScrollTo(window.scrollY + centerDistance())
}

function goTo(next: number) {
  if (isMobile() || next === index.value || next < 0 || next >= steps.length) return
  index.value = next
  if (!locked) {
    locked = true
    holdMotion()
    smoothCenter()
  }
}

function mobilePanels() {
  return mobileStepEls.value.filter((panel) => panel.isConnected && panel.getClientRects().length > 0)
}

function mobileStepIndex() {
  const panels = mobilePanels()
  let best = -1
  let bestOverlap = 0
  panels.forEach((panel, i) => {
    const rect = panel.getBoundingClientRect()
    const overlap = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
    if (overlap > bestOverlap) {
      bestOverlap = overlap
      best = i
    }
  })
  if (bestOverlap < window.innerHeight * 0.45) return -1
  return best
}

function scrollToPanel(panel: HTMLElement) {
  holdMotion()
  animateScrollTo(window.scrollY + panel.getBoundingClientRect().top)
}

function stepBy(direction: 1 | -1) {
  const next = index.value + direction
  if (next >= 0 && next < steps.length) {
    index.value = next
    holdMotion()
    if (Math.abs(centerDistance()) > 2) smoothCenter()
    return
  }
  release(direction)
}

function onDesktopWheel(event: WheelEvent) {
  const dist = centerDistance()
  const down = event.deltaY > 0
  const reach = Math.max(240, Math.abs(event.deltaY) + 80)
  const centered = Math.abs(dist) <= 2
  const enteringDown = down && dist > 0 && dist < reach
  const enteringUp = !down && dist < 0 && dist > -reach

  if (!locked && !centered && !enteringDown && !enteringUp) return
  event.preventDefault()
  noteGesture()
  if (busy || consumed || Math.abs(event.deltaY) < 8) return
  consumed = true

  if (!locked && !centered) {
    index.value = enteringDown ? 0 : steps.length - 1
    locked = true
    holdMotion()
    smoothCenter()
    nextTick(syncTrack)
    return
  }

  locked = true
  stepBy(down ? 1 : -1)
}

function release(direction: 1 | -1) {
  locked = false
  holdMotion()
  animateScrollTo(window.scrollY + direction * window.innerHeight * 0.72)
}

function onMobileWheel(event: WheelEvent) {
  if (Math.abs(event.deltaY) < 4) return
  const down = event.deltaY > 0
  const panels = mobilePanels()
  const first = panels[0]
  const last = panels[panels.length - 1]
  if (!first || !last) return

  const current = mobileStepIndex()
  if (current === -1) {
    const firstTop = first.getBoundingClientRect().top
    const lastBottom = last.getBoundingClientRect().bottom
    const wouldEnterDown = down && firstTop > 0 && firstTop - event.deltaY < window.innerHeight * 0.92
    const wouldEnterUp = !down && lastBottom < window.innerHeight && lastBottom - event.deltaY > window.innerHeight * 0.08
    if (!wouldEnterDown && !wouldEnterUp) return
    event.preventDefault()
    noteGesture()
    if (busy || consumed) return
    consumed = true
    scrollToPanel(wouldEnterDown ? first : last)
    return
  }

  event.preventDefault()
  noteGesture()
  if (busy || consumed) return
  consumed = true
  const next = current + (down ? 1 : -1)
  const panel = panels[next]
  if (panel) {
    scrollToPanel(panel)
    return
  }
  const destination = down ? helpEl.value : introEl.value
  if (!destination) return
  holdMotion()
  animateScrollTo(window.scrollY + destination.getBoundingClientRect().top)
}

function onWheel(event: WheelEvent) {
  if (event.ctrlKey) return
  if (isMobile()) onMobileWheel(event)
  else onDesktopWheel(event)
}

function onScroll() {
  if (isMobile() || animating || !locked) return
  const dist = centerDistance()
  if (Math.abs(dist) > 1) {
    animating = true
    window.scrollTo(0, window.scrollY + dist)
    animating = false
  }
}

function onTouchStart(event: TouchEvent) {
  const touch = event.touches[0]
  if (!touch) return
  touchStartY = touch.clientY
  touchStartX = touch.clientX
}

function onTouchMove(event: TouchEvent) {
  const touch = event.touches[0]
  if (!touch) return
  const dy = touchStartY - touch.clientY
  const dx = touchStartX - touch.clientX
  if (Math.abs(dy) < 24 || Math.abs(dy) <= Math.abs(dx)) return
  const fake = new WheelEvent('wheel', { deltaY: dy, cancelable: true })
  onWheel(fake)
  if (fake.defaultPrevented) event.preventDefault()
}

function onResize() {
  if (isMobile()) {
    locked = false
    return
  }
  syncTrack()
  if (locked) window.scrollTo(0, window.scrollY + centerDistance())
}

watch(index, () => nextTick(syncTrack))

onMounted(() => {
  syncTrack()
  trackReady.value = true
  document.fonts?.ready.then(() => syncTrack())
  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: false })
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.clearTimeout(gestureTimer)
  window.clearTimeout(motionTimer)
  window.removeEventListener('wheel', onWheel)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('resize', onResize)
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

.intro {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  padding-inline: 88px;
}

.logo-slot {
  display: flex;
  flex: none;
  justify-content: center;
  width: 424px;
}

.intro-copy {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-width: 0;
  color: #52412d;
  font-family: Blur, sans-serif;
  font-size: 28px;
  font-weight: 500;
  line-height: 44px;
  text-align: center;
}

.intro-copy h1,
.intro-copy p {
  width: 100%;
  margin: 0;
  color: inherit;
  font: inherit;
}

.congrats {
  width: min(560px, 100%);
}

.stepper-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  min-height: 560px;
  padding-inline: 24px;
}

.headline-viewport {
  width: 320px;
  height: 400px;
  overflow: hidden;
  flex: none;
}

.headline-track {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  will-change: transform;
}

.headline-track.ready,
.phone-track.ready {
  transition: transform 0.68s cubic-bezier(0.22, 1, 0.36, 1);
}

.headline {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
}

.headline button {
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  color: #52412d;
  cursor: pointer;
  font-family: Blur, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  opacity: 0.48;
}

.headline.active {
  width: 320px;
}

.headline.active button {
  font-size: 28px;
  line-height: 44px;
  opacity: 1;
  cursor: default;
}

.headline button:focus-visible,
.cta:focus-visible,
.book:focus-visible,
.help a:focus-visible,
.socials a:focus-visible,
.footer-legal a:focus-visible {
  outline: 2px solid #52412d;
  outline-offset: 4px;
  border-radius: 8px;
}

.num {
  display: block;
}

.cta,
.book {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
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

.cta {
  height: 0;
  margin-top: 0;
  padding-block: 0;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.headline.active .cta {
  height: 48px;
  margin-top: 24px;
  opacity: 1;
  pointer-events: auto;
}

.circle {
  position: relative;
  width: 560px;
  height: 560px;
  flex: none;
  overflow: hidden;
  border-radius: 50%;
  background: rgba(197, 237, 247, 0.24);
}

.phone-track {
  position: absolute;
  inset: 0;
  will-change: transform;
}

.phone {
  position: absolute;
  left: 50%;
  width: 56.306%;
  height: 100%;
  translate: -50% 0;
  border: 8px solid #c5edf7;
  border-radius: 48px;
  object-fit: cover;
  object-position: top center;
}

.step-screen {
  display: none;
}

.help {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
  padding-inline: 88px;
  color: #52412d;
  font-family: Blur, sans-serif;
  font-size: 28px;
  font-weight: 500;
  line-height: 44px;
  text-align: center;
}

.help p {
  margin: 0;
}

.help-intro {
  width: min(512px, 100%);
}

.help-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.help-links p {
  width: min(560px, 100%);
}

.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.contact-card {
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

.contact-main {
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
}

.contact-block {
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

@media (prefers-reduced-motion: reduce) {
  .headline-track.ready,
  .phone-track.ready {
    transition: none;
  }
}

@media (max-width: 1099px) {
  .intro {
    padding-inline: 48px;
  }

  .logo-slot {
    width: auto;
  }

  .stepper-row {
    gap: 40px;
  }

  .circle {
    width: min(560px, 46vw);
    height: min(560px, 46vw);
  }
}

@media (max-width: 839px) {
  .page {
    gap: 0;
    padding-top: 88px;
  }

  .intro {
    flex-direction: column;
    gap: 64px;
    padding: 0 24px 72px;
  }

  .intro-copy,
  .congrats {
    width: min(320px, 100%);
  }

  .stepper {
    display: none;
  }

  .step-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 48px;
    height: 100svh;
    overflow: hidden;
  }

  .step-copy {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: min(256px, calc(100% - 48px));
  }

  .step-screen h2 {
    width: 100%;
    margin: 0;
    color: #52412d;
    font-family: Blur, sans-serif;
    font-size: 28px;
    font-weight: 500;
    line-height: 44px;
    text-align: center;
  }

  .step-screen .circle {
    width: min(560px, 62svh);
    height: min(560px, 62svh);
  }

  .step-screen .phone {
    top: 15.714%;
  }

  .help {
    gap: 56px;
    padding: 72px 32px;
  }

  .help-intro,
  .help-links p {
    width: min(352px, 100%);
  }

  .contact {
    padding-top: 24px;
  }

  .contact-card {
    gap: 32px;
    min-height: 0;
    padding: 48px 16px;
  }

  .contact-main {
    flex-direction: column;
    gap: 32px;
  }

  .addr {
    width: auto;
  }
}
</style>
