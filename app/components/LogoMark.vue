<template>
  <div class="mark" :class="`kind-${variant}`">
    <div class="stage">
      <template v-if="variant === 'hero'">
        <img class="ring" src="/images/ring-1.svg" width="433.725" height="433.725" alt="">
        <img class="ring" src="/images/ring-2.svg" width="650.588" height="650.588" alt="">
        <img class="ring" src="/images/ring-3.svg" width="929.412" height="929.412" alt="">
        <img class="ring" src="/images/ring-4.svg" width="1208.235" height="1208.235" alt="">
        <img class="ring" src="/images/ring-5.svg" width="1580" height="1580" alt="">
      </template>
      <img
        class="logo"
        src="/images/placetobe_logo_off.png"
        width="283"
        height="283"
        alt="place to be, yoga and art studio"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  variant: 'hero' | 'footer'
}>()
</script>

<style scoped>
.mark {
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
}

.mark.kind-hero {
  --size: clamp(222px, 28vw, 288px);
  width: var(--size);
  height: var(--size);
}

.mark.kind-footer {
  width: 201px;
  height: 200px;
}

.stage {
  position: relative;
  display: grid;
  place-items: center;
}

.kind-hero .stage {
  width: 100%;
  height: 100%;
}

.kind-footer .stage {
  width: 201px;
  height: 200px;
}

.ring {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  pointer-events: none;
}

.kind-hero .ring:nth-child(1) { width: 150.6%; height: 150.6%; }
.kind-hero .ring:nth-child(2) { width: 225.9%; height: 225.9%; }
.kind-hero .ring:nth-child(3) { width: 322.7%; height: 322.7%; }
.kind-hero .ring:nth-child(4) { width: 419.5%; height: 419.5%; }
.kind-hero .ring:nth-child(5) { width: 548.6%; height: 548.6%; }

.logo {
  width: 97.22%;
  height: 97.22%;
  border-radius: 50%;
  object-fit: cover;
}

.kind-hero .logo {
  --logo: calc(var(--size) * 0.9722);
  width: var(--logo);
  height: var(--logo);
  animation: logo-breathe 3s ease-in-out infinite;
}

@keyframes logo-breathe {
  0%,
  100% {
    scale: calc((var(--logo) + 8px) / var(--logo));
  }

  33.333% {
    scale: calc((var(--logo) - 8px) / var(--logo));
  }
}

@media (prefers-reduced-motion: reduce) {
  .kind-hero .logo {
    animation: none;
  }
}

.kind-footer .logo {
  width: 200px;
  height: 200px;
}
</style>
