<template>
  <article class="card" :class="size">
    <img class="icon" :src="image" alt="">
    <div class="copy">
      <h3>{{ title }}</h3>
      <p v-for="line in lines" :key="line">
        {{ line }}
      </p>
      <p class="price">
        {{ price }}
      </p>
    </div>
    <a class="book" :href="href">Jetzt buchen</a>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  size: 'lg' | 'sm'
  title: string
  lines: string[]
  price: string
  image: string
  href: string
}>()
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin: 0;
  border-radius: 200px;
  background: rgba(197, 237, 247, 0.24);
  text-align: center;
}

.card.lg {
  width: min(400px, 100%);
  height: min(400px, 100vw);
  aspect-ratio: 1;
  padding: 48px 56px;
}

.card.sm {
  width: min(320px, 100%);
  height: min(320px, 86vw);
  aspect-ratio: 1;
  padding: 48px 28px;
}

.icon {
  display: block;
  width: 48px;
  height: 48px;
  flex: none;
  object-fit: contain;
}

.copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

h3,
p {
  margin: 0;
}

h3 {
  font-family: Blur, sans-serif;
  font-size: 22px;
  font-weight: 500;
  color: #52412d;
}

.lg h3 {
  max-width: 288px;
  line-height: 32px;
}

.sm h3 {
  line-height: 24px;
}

.copy p {
  font-family: "Alte Haas Grotesk", sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #3d3122;
}

.copy p.price {
  font-size: 28px;
  line-height: 32px;
}

.book {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px !important;
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

.book:focus-visible {
  outline: 2px solid #52412d;
  outline-offset: 3px;
}
</style>
