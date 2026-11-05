<script setup>
</script>

<template>
  <div class="not-found section-band">
    <div class="container">
      <h1>404</h1>
      <p>We couldn't find that page.</p>
      <router-link to="/PFDAV-quick-insight/" class="underline-link">← Back to home</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  padding-top: calc(var(--space) * 14);
  padding-bottom: calc(var(--space) * 14);
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 16px;
}

p {
  color: var(--text-muted);
  margin: 0 auto 24px;
}

a {
  font-weight: 500;
  color: var(--accent-2);
}
</style>
