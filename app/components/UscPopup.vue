<template>
  <div
    v-if="open"
    class="usc-popup"
    role="dialog"
    aria-modal="true"
    aria-labelledby="usc-popup-title"
  >
    <div class="card">
      <button ref="closeButton" type="button" class="close" aria-label="Schließen" @click="close">
        <img src="/images/usc-close.svg" width="20" height="20" alt="">
      </button>

      <div class="mark">
        <span class="bubble" aria-hidden="true">
          <img class="bubble-photo" src="/images/usc-photo.png" alt="">
          <span class="bubble-fill" />
        </span>
        <span class="badge" aria-hidden="true">
          <span class="badge-disc">
            <img src="/images/usc-badge.png" alt="">
          </span>
        </span>
      </div>

      <div class="copy">
        <p id="usc-popup-title" class="title">
          Urban Sports, Wellhub & Wellpass
        </p>
        <p class="body">
          Bis 15. Oktober wie gewohnt über YogaCircle buchen. Ab dem 16. Oktober erfolgt die Buchung exklusiv über das neue place to be Profil.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)
const closeButton = ref<HTMLButtonElement | null>(null)
let timer: number | undefined

function close() {
  open.value = false
}

onMounted(() => {
  timer = window.setTimeout(() => {
    open.value = true
  }, 2400)
})

onUnmounted(() => {
  window.clearTimeout(timer)
  document.body.style.overflow = ''
})

watch(open, async (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (!isOpen) return
  await nextTick()
  closeButton.value?.focus()
})
</script>

<style scoped>
.usc-popup {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: min(416px, 100%);
  height: 400px;
  padding: 48px 56px;
  border-radius: 200px;
  background: #c5edf7;
}

.close {
  position: absolute;
  left: 56px;
  top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #75362d;
  cursor: pointer;
}

.close img {
  width: 20px;
  height: 20px;
}

.close:focus-visible {
  outline: 2px solid #52412d;
  outline-offset: 3px;
}

.mark {
  position: relative;
  width: 48px;
  height: 48px;
  flex: none;
}

.bubble {
  display: block;
  width: 48px;
  height: 48px;
  -webkit-mask: url("/images/usc-mask.png") center / 100% 100% no-repeat;
  mask: url("/images/usc-mask.png") center / 100% 100% no-repeat;
}

.bubble-photo {
  position: absolute;
  width: 589.07%;
  height: 883.6%;
  left: -246.8%;
  top: -349.98%;
  max-width: none;
}

.bubble-fill {
  position: absolute;
  inset: 0;
  background: #75362d;
}

.badge {
  position: absolute;
  left: 38.5px;
  top: -34.3px;
  display: grid;
  width: 68.586px;
  height: 68.586px;
  place-items: center;
  pointer-events: none;
}

.badge-disc {
  width: 56px;
  height: 56px;
  overflow: hidden;
  border-radius: 76px;
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

.copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.title,
.body {
  margin: 0;
  text-align: center;
}

.title {
  color: #52412d;
  font-family: Blur, sans-serif;
  font-size: 22px;
  font-weight: 500;
  line-height: 32px;
}

.body {
  width: 287px;
  max-width: 100%;
  color: #3d3122;
  font-family: "Alte Haas Grotesk", sans-serif;
  font-size: 16px;
  line-height: 24px;
}

@media (max-width: 440px) {
  .close {
    left: 13.46%;
  }
}
</style>
