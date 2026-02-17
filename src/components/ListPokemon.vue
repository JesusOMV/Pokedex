<template>
  <div class="main-container">
    <div v-if="loading" class="spinner-container">
      <div class="pokeball">
        <p>Catching Pokemons...</p>
      </div>
    </div>
    <div v-else-if="error">
      <Error :error="error"/>
    </div>
    <div v-else>
      <div class="list-pokemons-title">
        <router-link to="/">
          <button id="home-button">I want to return to the Home Page</button>
        </router-link>
        <h1>Official List of Pokemons</h1>
      </div>
      <div class="pokemon-grid">
        <div
          class="pokemon-card"
          v-for="pokemon in pokemones"
          :key="pokemon.idAll"
        >
          <div class="pokemon-image-container">
            <img :src="pokemon.imageAll" alt="" />
          </div>
          <div class="pokemon-info">
            <p class="pokemon-data">Name: {{ pokemon.nameAll }}</p>
            <p class="pokemon-data">
              Types
              <ul v-for="t in pokemon.typesAll" :key="t.slot"><li>{{ t.type.name }}</li></ul>
            </p>
            <p class="pokemon-data">
              Height: {{ pokemon.heightAll }} ft
            </p>
            <p class="pokemon-data">
              Weight: {{ pokemon.weightAll }} lb
            </p>
          </div>
        </div>
      </div>
      <nav class="pages-container">
        <button
          class="nav-button"
          @click="previousP"
          :disabled="offset === 0 || loading"
        >
          Previous
        </button>
        <span id="page-indicator">
          {{ offset + 1 }} - {{ offset + pokemones.length }}
        </span>
        <button
          class="nav-button"
          @click="nextP"
          :disabled="offset + limit >= totalPokemons || loading"
        >
          Next
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useApi } from '@/services/ConnectionAPI'
import Error from './Error.vue'

let {
  dataAll: pokemones,
  limit,
  offset,
  totalPokemons,
  error,
  loading,
  fetch,
} = useApi()

const nextP = () => {
  if (offset.value + limit.value < totalPokemons.value) {
    offset.value += limit.value
    fetch()
  }
}

const previousP = () => {
  if (offset.value - limit.value >= 0) {
    offset.value -= limit.value
    fetch()
  }
}

onMounted(fetch)
</script>

<style scoped>
.main-container {
  background: linear-gradient(to bottom, #e3350d 0%, #b32300 100%);
  min-height: 100vh;
  padding: 20px;
  color: white;
  font-family: 'Segoe UI', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.list-pokemons-title h1{
  text-align: center;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

#home-button{
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
}

.pokemon-grid{
  display: grid;
  grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;
  position: relative;
}

.pokemon-card{
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 15px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.pokemon-card:hover{
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.2);
}

.pokemon-image-container img{
  width: 120px;
  height: 120px;
  object-fit:contain;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.5));
}

.pokemon-info{
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.pokemon-data{
  margin: 0;
  font-weight: 600;
  text-transform: capitalize;
  font-size: 1.2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.pages-container{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
}

.nav-button{
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 10px 25px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.nav-button:hover:not(:disabled){
  background: rgba(255, 255, 255, 0.3);
}

.nav-button:disabled{
  background: #555;
  cursor: not-allowed;
  opacity: 0.5;
}

#page-indicator{
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 100px;
  text-align: center;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.05);
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.pokeball {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border: 4px solid #333;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  animation: shake 1.25s cubic-bezier(.36, .07, .19, .97) infinite;
}

.pokeball::before{
  content: "";
  position: absolute;
  background-color: #f20202;
  width: 100%;
  height: 50%;
  top: 0;
  border-bottom: 4px solid #333;
}

.pokeball::after{
  content: "";
  position: absolute;
  background-color: #fff;
  width: 15px;
  height: 15px;
  border: 4px solid #333;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

@keyframes shake {
  0% { transform: rotate(0deg); }
  20% { transform: rotate(-20deg); }
  40% { transform: rotate(20deg); }
  60% { transform: rotate(-20deg); }
  80% { transform: rotate(20deg); }
  100% { transform: rotate(0deg); }
}

buton:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
