<template>
  <div class="error-container">
    <div class="error-card">
      <div class="pixel-border">
        <img src="/error.svg" class="error-icon" />
        <h2>Ups...</h2>
        <p>Un error acaba de aparecer.</p>
        <div class="error-code">ERROR: {{ error }}</div>
        <router-link to="/">
          <button id="home-button">Come back later.</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: String,
})
</script>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  text-align: center;
}

.error-card {
  background: #f0f0f0;
  border: 4px solid #333;
  padding: 5px;
  box-shadow: 8px 8px 0px #222;
  max-width: 400px;
}

.pixel-border {
  border: 2px solid #888;
  padding: 20px;
  background: gray;
}

.error-icon {
  width: 60px;
  image-rendering: pixelated;
  margin-bottom: 10px;
  animation: bounce 1s infinite;
}

h2 {
  color: #333;
  font-family: 'Courier New', Courier, monospace;
  margin: 10px 0;
}

.error-code {
  background: #333;
  color: #00ff00;
  padding: 5px;
  font-family: monospace;
  font-size: 0.8rem;
  margin: 15px 0;
}

#home-button {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: red;
  padding: 10px 20px;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
