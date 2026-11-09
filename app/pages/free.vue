<template>
  <main class="page" :class="{ 'is-gate': step === 'entry', 'is-stage': step !== 'entry' }">
    <section v-if="step === 'entry'" class="gate">
      <div class="gate-photo">
        <img src="/images/special-code-studio.jpg" alt="">
      </div>
      <LogoMark variant="hero" />
      <form class="gate-card" @submit.prevent="openBooking">
        <div class="gate-copy">
          <h1>book a free class</h1>
          <label>
            your special code
            <input v-model="voucher" type="text" name="voucher" autocomplete="off" placeholder="####" required>
          </label>
          <p v-if="errorMessage" class="notice" role="alert">{{ errorMessage }}</p>
        </div>
        <button class="start" type="submit">start booking</button>
      </form>
    </section>

    <section v-else class="stage" :class="{ 'is-thanks': step === 'success' }">
      <div class="stage-photo">
        <img src="/images/special-code-studio.jpg" alt="">
        <div class="stage-screen" aria-hidden="true">
          <img src="/images/special-code-studio.jpg" alt="">
        </div>
      </div>
      <LogoMark variant="hero" />
      <img v-if="step === 'book'" class="bowls" src="/images/free-bowls.jpg" alt="">

      <form v-if="step === 'book'" class="booking" @submit.prevent="book">
        <h1>book a free class</h1>
        <div class="fields">
          <label>
            full name
            <input v-model="name" type="text" name="name" autocomplete="name" placeholder="placetobe@mail.com" required>
          </label>
          <label>
            e-mail
            <input v-model="email" type="email" name="email" autocomplete="email" placeholder="placetobe@mail.com" required>
          </label>
          <label>
            whatsapp number
            <input v-model="phone" type="tel" name="phone" autocomplete="tel" placeholder="0 1777 042 321" required>
          </label>
        </div>

        <div class="schedule">
          <p class="schedule-label">select your class</p>
          <p class="month">{{ freeMonthLabel }}</p>
          <div class="week-nav">
            <button class="week" type="button" :disabled="weekIndex === 0" @click="showWeek(weekIndex - 1)">
              <img class="chevron prev" src="/images/week-next.svg" alt="" width="16.0908" height="16.0908">
              prev week
            </button>
            <p class="week-label">
              <span class="week-long">woche {{ weekIndex + 1 }}</span>
              <span class="week-short">w{{ weekIndex + 1 }}</span>
            </p>
            <button class="week" type="button" :disabled="weekIndex === freeWeeks.length - 1" @click="showWeek(weekIndex + 1)">
              next week
              <img class="chevron" src="/images/week-next.svg" alt="" width="16.0908" height="16.0908">
            </button>
          </div>

          <div class="board" :class="{ 'is-short': weekDays.length < 7 }">
            <div v-for="date in weekDays" :key="date" class="column">
              <div class="day-head">
                <span class="weekday">{{ dayChip(date).weekday }}</span>
                <span class="date-num">{{ dayChip(date).day }}</span>
              </div>
              <div class="slots">
                <button
                  v-for="item in classesOn(date)"
                  :key="classKey(item)"
                  class="slot"
                  :class="{ 'is-selected': classKey(item) === selectedKey }"
                  type="button"
                  :disabled="!canBook(item)"
                  :aria-pressed="classKey(item) === selectedKey"
                  @click="selectedKey = classKey(item)"
                >
                  <span class="slot-when">
                    <strong>{{ item.hour }}</strong>
                    <span>-</span>
                    <span>{{ item.minutes }} min.</span>
                  </span>
                  <span class="slot-body">
                    <span class="slot-name">{{ item.name }}</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div class="days" :class="{ 'is-short': weekDays.length < 7 }">
            <button
              v-for="date in weekDays"
              :key="`m-${date}`"
              class="day"
              :class="{ 'is-selected': date === selectedDate }"
              type="button"
              :aria-pressed="date === selectedDate"
              @click="pickDay(date)"
            >
              <span class="weekday">{{ dayChip(date).weekday }}</span>
              <span class="date-num">{{ dayChip(date).day }}</span>
            </button>
          </div>
          <div class="classes">
            <p v-if="dayClasses.length === 0" class="empty">No class this day</p>
            <button
              v-for="item in dayClasses"
              :key="`row-${classKey(item)}`"
              class="class"
              :class="{ 'is-selected': classKey(item) === selectedKey }"
              type="button"
              :disabled="!canBook(item)"
              :aria-pressed="classKey(item) === selectedKey"
              @click="selectedKey = classKey(item)"
            >
              <span class="when">
                <strong>{{ item.hour }}</strong>
                <span>{{ item.minutes }} min.</span>
              </span>
              <span class="what">
                <strong>{{ item.name }}</strong>
              </span>
            </button>
          </div>
        </div>

        <p v-if="errorMessage" class="notice" role="alert">{{ errorMessage }}</p>
        <button class="submit book" type="submit" :disabled="status === 'submitting'" :aria-busy="status === 'submitting'" aria-label="book now">
          <span class="button-label" :class="{ 'is-hidden': status === 'submitting' }">book now</span>
          <span v-if="status === 'submitting'" class="dots" aria-hidden="true">
            <span /><span /><span /><span />
          </span>
        </button>
      </form>

      <div v-else class="thanks" role="status">
        <h1>thank you for being!</h1>
        <p>your class is booked. We’ll send you a confirmation on Whatsapp</p>
      </div>
    </section>

    <footer v-if="step !== 'entry'" class="footer" aria-label="Kontakt">
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
import {
  classStartsAt,
  dayChip,
  findFreeClass,
  freeClasses,
  freeMonthLabel,
  freeWeeks,
  type FreeClass,
} from '../../shared/free-schedule'

const code = 'thankyou111'
const step = ref<'entry' | 'book' | 'success'>('entry')
const name = ref('')
const email = ref('')
const phone = ref('')
const voucher = ref('')
const status = ref<'idle' | 'submitting' | 'error'>('idle')
const errorMessage = ref('')

function withLilly(item: FreeClass) {
  return item.teacher.trim().toLowerCase() === 'lilly'
}

const lillyClasses = freeClasses.filter(withLilly)
const firstOpen = lillyClasses.find(item => classStartsAt(item) > Date.now()) ?? lillyClasses[0]
const weekIndex = ref(Math.max(0, freeWeeks.findIndex(days => days.includes(firstOpen.date))))
const selectedDate = ref(firstOpen.date)
const selectedKey = ref('')

const weekDays = computed(() => freeWeeks[weekIndex.value])
const dayClasses = computed(() => lillyClasses.filter(item => item.date === selectedDate.value))

function digits(value: string) {
  return value.replace(/\D/g, '')
}

function detailsOk() {
  const phoneDigits = digits(phone.value.trim())
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
  return name.value.trim().length >= 2 && emailOk && phoneDigits.length >= 8 && phoneDigits.length <= 15
}

function classKey(item: FreeClass) {
  return `${item.date}|${item.hour}|${item.name}`
}

function classesOn(date: string) {
  return lillyClasses.filter(item => item.date === date)
}

function canBook(item: FreeClass) {
  return classStartsAt(item) > Date.now()
}

function showWeek(next: number) {
  weekIndex.value = next
  const days = freeWeeks[next]
  if (!days.includes(selectedDate.value)) selectedDate.value = days[0]
  selectedKey.value = ''
  errorMessage.value = ''
}

function pickDay(date: string) {
  selectedDate.value = date
  selectedKey.value = ''
  errorMessage.value = ''
}

function openBooking() {
  errorMessage.value = ''
  if (voucher.value.trim() !== code) {
    errorMessage.value = 'This voucher was not recognized.'
    return
  }
  step.value = 'book'
  window.scrollTo({ top: 0 })
}

async function book() {
  errorMessage.value = ''
  if (!detailsOk()) {
    errorMessage.value = 'Please check your name, email, and WhatsApp number.'
    status.value = 'error'
    return
  }
  const [classDate, classHour, className] = selectedKey.value.split('|')
  const chosen = findFreeClass(classDate ?? '', classHour ?? '', className ?? '')
  if (!chosen || !canBook(chosen)) {
    errorMessage.value = chosen ? 'This class can no longer be booked.' : 'Please select a class.'
    status.value = 'error'
    return
  }

  status.value = 'submitting'
  try {
    const result = await $fetch<{ ok: boolean, reason?: string }>('/api/free', {
      method: 'POST',
      body: {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        classDate: chosen.date,
        classHour: chosen.hour,
        className: chosen.name,
      },
    })
    if (result.ok) {
      step.value = 'success'
      status.value = 'idle'
      window.scrollTo({ top: 0 })
      return
    }
    errorMessage.value = result.reason === 'details'
      ? 'Please check your name, email, and WhatsApp number.'
      : result.reason === 'class'
        ? 'This class can no longer be booked.'
        : 'The class could not be saved. Please try again.'
    status.value = 'error'
  }
  catch {
    errorMessage.value = 'Something went wrong. Please try again.'
    status.value = 'error'
  }
}

useHead({
  title: 'Book a free class | place to be',
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

.page.is-gate,
.page.is-stage {
  padding-top: 0;
  gap: 0;
}

.page.is-gate,
.page.is-stage {
  width: 100%;
  overflow: visible;
}

.gate {
  position: relative;
  height: 100dvh;
  overflow: visible;
}

.gate-photo {
  position: absolute;
  top: 0;
  left: 32%;
  width: 140vw;
  height: 100%;
  transform: translateX(-50%);
  overflow: hidden;
}

.gate-photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: center 35%;
  
}

.gate :deep(.kind-hero) {
  --size: 200px;
  position: absolute;
  left: 80px;
  top: 80px;
  z-index: 1;
}

.gate-card {
  position: absolute;
  left: calc(50% + 20.779%);
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 56px;
  width: 560px;
  height: 560px;
  margin: 0;
  padding: 96px 56px;
  border-radius: 50%;
  background: #e6f8fc;
  z-index: 1;
}

.gate-card h1 {
  width: 230px;
}

.gate-card label {
  gap: 16px;
  width: 320px;
  color: #52412d;
  font-family: Blur, sans-serif;
  font-size: 22px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0.44px;
}

.gate-card input {
  height: 64px;
  box-sizing: border-box;
  border: 1px solid #52412d;
  border-radius: 4px;
  background: #fff;
  color: #52412d;
}

.gate-card input::placeholder {
  color: #52412d;
  opacity: 0.48;
}

.gate-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.gate-card .notice {
  width: 320px;
}

.start {
  flex-shrink: 0;
  height: 40px;
  padding: 0 24px;
  border: 0;
  border-radius: 80px;
  background: #c5edf7;
  color: #52412d;
  font-family: Blur, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
}

.stage {
  position: relative;
  overflow: visible;
  padding: 88px 80px 64px;
}

.stage-photo {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  pointer-events: none;
  background:
    linear-gradient(rgba(197, 237, 247, 0.24), rgba(197, 237, 247, 0.24)),
    #fff;
}

.stage-photo > img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: center 35%;
  mix-blend-mode: luminosity;
  opacity: 0.56;
}

.stage-screen {
  position: absolute;
  inset: 0;
  mix-blend-mode: screen;
  background: #c5edf7;
}

.stage-screen img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: center 42%;
  opacity: 0.7;
}

.stage-screen::after {
  content: "";
  position: absolute;
  inset: 0;
  background: #c5edf7;
}

.stage :deep(.kind-hero) {
  --size: 200px;
  position: absolute;
  left: 80px;
  top: 80px;
  z-index: 1;
}

.bowls {
  position: absolute;
  top: 216px;
  right: -41px;
  z-index: 1;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  object-fit: cover;
}

.booking,
.thanks {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

.booking {
  gap: 32px;
  width: 100%;
}

.stage.is-thanks {
  min-height: 808px;
  padding: 0;
}

.thanks {
  position: absolute;
  left: 489px;
  top: 448px;
  gap: 24px;
  width: 646px;
  text-align: center;
}

.thanks p {
  width: min(398px, 100%);
  margin: 0;
  color: #52412d;
  font-family: Blur, sans-serif;
  font-size: 22px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0.44px;
}

.booking input {
  height: 48px;
  box-sizing: border-box;
  border: 1px solid #52412d;
  border-radius: 4px;
  background: #fff;
}

.fields,
.schedule,
label {
  width: 100%;
}

h1 {
  margin: 0;
  color: #52412d;
  font-family: Blur, sans-serif;
  font-size: 44px;
  font-weight: 500;
  line-height: 56px;
  letter-spacing: 0.88px;
  text-align: center;
}

.fields,
.schedule,
.classes {
  display: flex;
  flex-direction: column;
}

.fields {
  gap: 32px;
  width: 480px;
}

.schedule {
  gap: 16px;
}

.classes {
  gap: 4px;
}

label,
.notice,
.empty,
.weekday,
.slot-teacher,
.slot-when span,
.when span,
.what span,
.week-label {
  color: #52412d;
  font-family: "Alte Haas Grotesk", sans-serif;
  font-size: 16px;
  line-height: 24px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
}

input {
  width: 100%;
  margin: 0;
  padding: 16px;
  border: 1px solid #002008;
  border-radius: 2px;
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

.schedule-label,
.month,
.week-label,
.empty {
  margin: 0;
  text-align: center;
}

.schedule-label,
.month {
  color: #52412d;
  font-family: "Alte Haas Grotesk", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.month {
  text-transform: lowercase;
}

.date-num,
.when strong,
.what strong,
.slot-when strong,
.slot-name {
  color: #52412d;
  font-family: Blur, sans-serif;
  font-weight: 500;
  line-height: 24px;
}

.date-num {
  font-size: 22px;
}

.slot-when strong,
.slot-name,
.when strong,
.what strong {
  font-size: 16px;
}

.week-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
}

.days {
  display: none;
}

.days {
  gap: 4px;
}

.week,
.day,
.slot,
.class,
.submit {
  border: 0;
  cursor: pointer;
}

.week {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 4px;
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

.week-short {
  display: none;
}

.week:disabled,
.slot:disabled,
.class:disabled {
  cursor: default;
  opacity: 0.4;
}

.week-label {
  display: flex;
  align-items: center;
  color: #52412d;
}

.chevron {
  display: block;
  width: 16.0908px;
  height: 16.0908px;
  flex-shrink: 0;
}

.chevron.prev {
  transform: scaleX(-1);
}

.board {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
}

.board.is-short {
  justify-content: center;
}

.column {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.board.is-short .column {
  flex: 0 1 145px;
}

.day-head,
.day {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 90px;
  color: #52412d;
}

.slots {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 24px 12px;
  border: 0;
  border-radius: 24px;
  background: #fff;
  color: #52412d;
  text-align: center;
}

.slot-when,
.slot-body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.slot-when {
  gap: 8px;
  white-space: nowrap;
}

.slot-when span,
.slot-teacher {
  font-size: 14px;
  line-height: 24px;
}

.slot-body {
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.slot.is-selected,
.day.is-selected,
.class.is-selected {
  border: 1px solid #52412d;
  background: #c5edf7;
}

.weekday {
  color: #52412d;
}

.classes {
  display: none;
}

.class {
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 24px;
  border: 1px solid transparent;
  border-radius: 24px;
  background: #fff;
  text-align: left;
}

.when,
.what {
  display: flex;
  flex-direction: column;
}

.when {
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
}

.what {
  flex: 1;
  align-items: center;
  gap: 10px;
  text-align: center;
}

.submit {
  position: relative;
  height: 48px;
  padding: 0 24px;
  border-radius: 80px;
  background: #f1fbfd;
  color: #52412d;
  font-family: Blur, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.submit.book {
  background: #c5edf7;
}

.submit:disabled {
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
  animation: redeem-dot 1.05s ease-in-out infinite;
}

.dots span:nth-child(2) { animation-delay: 0.14s; }
.dots span:nth-child(3) { animation-delay: 0.28s; }
.dots span:nth-child(4) { animation-delay: 0.42s; }

@keyframes redeem-dot {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-4px); }
}

@media (prefers-reduced-motion: reduce) {
  .dots span { animation: none; }
}

input:focus-visible,
button:focus-visible,
.socials a:focus-visible,
.footer-legal a:focus-visible {
  outline: 2px solid #52412d;
  outline-offset: 0px;
}

.notice {
  margin: 0;
  text-align: center;
}

.footer {
  position: relative;
  z-index: 1;
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

.contact-links { gap: 8px; }

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

.addr { width: 215px; }

.socials {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.socials img { display: block; }

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

.footer-legal a { text-decoration: none; }

.detail a {
  color: inherit;
  text-decoration: none;
}

@media (max-width: 1099px) {
  .bowls {
    display: none;
  }

  .stage {
    padding-inline: 24px;
  }

  .fields {
    width: min(480px, 100%);
  }
}

@media (max-width: 839px) {
  .page {
    gap: 64px;
    padding-top: 32px;
  }

  .page.is-gate,
  .page.is-stage {
    gap: 0;
    padding-top: 0;
  }

  .page.is-gate {
    height: 100dvh;
    overflow: hidden;
  }

  .gate {
    height: 100%;
    overflow: hidden;
  }

  .gate-photo img {
    left: 11%;
    top: -32%;
    bottom: auto;
    height: 120%;
  }

  .gate :deep(.kind-hero) {
    display: none;
  }

  .gate-card {
    left: 50%;
    bottom: -8%;
    transform: translate(-50%, -8%);
    gap: 32px;
    width: min(480px, calc(100dvh - 32px));
    height: min(480px, calc(100dvh - 32px));
    padding: 56px 48px;
  }

  .gate-copy {
    gap: 24px;
  }

  .page.is-stage {
    width: min(1440px, 100%);
    overflow: clip;
  }

  .stage {
    overflow: hidden;
    padding: 32px 24px 48px;
  }

  .stage-photo {
    position: absolute;
    height: 720px;
    mix-blend-mode: luminosity;
    opacity: 0; 
  }

  .stage-photo img {
    left: -150%;
    top: -20%;
    width: 396%;
    height: 130%;
    object-position: center center;

  mix-blend-mode: luminosity;
  opacity: 0; 
  }

  .stage :deep(.kind-hero) {
    position: static;
    --size: 160px;
    display: block;
    margin: 0 auto 48px;
  }

  .booking {
    gap: 48px;
  }

  .fields {
    width: 100%;
  }

  .board {
    display: none;
  }

  .days,
  .classes {
    display: flex;
  }

  .days {
    gap: 4px;
  }

  .day {
    flex: 1 1 0;
    min-width: 0;
    padding: 8px 0;
    border: 1px solid transparent;
    border-radius: 80px;
    background: transparent;
  }

  .days.is-short .day {
    flex: 0 0 49px;
  }

  .week-nav {
    gap: 8px;
  }

  .week {
    flex: 1 1 0;
    min-width: 0;
    padding: 0 8px;
  }

  .week-long {
    display: none;
  }

  .week-short {
    display: inline;
  }

  .stage.is-thanks {
    min-height: 0;
    padding: 32px 24px 64px;
  }

  .thanks {
    position: static;
    width: 100%;
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

  .addr { width: auto; }
}
</style>
