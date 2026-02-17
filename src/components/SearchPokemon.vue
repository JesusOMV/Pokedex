<template>
  <div class="container">
    <div v-if="loading" class="spinner-container">
      <div class="pokeball">
        <p>Catching Pokemons...</p>
      </div>
    </div>
    <div v-else class="container-else">
      <div class="container-pokemon-message">
        <h1 id="title-pokemon-search">What Pokemon do you want to search?</h1>
      </div>
      <div class="container-search">
        <input
          id="input-find-pokemon"
          v-model="query"
          type="text"
          @keyup.enter="searchPokemon(query)"
          placeholder="Escribe Pokemon aqui."
        />
        <button id="button-find-pokemon" @click="searchPokemon(query)">
          Find it
        </button>
      </div>
      <div v-if="findPokemon" class="pokemon-card">
        <div v-if="loading" class="spinner-container">
          <div class="pokeball">
            <p>Catching Pokemon...</p>
          </div>
        </div>
        <p id="pokemon-name">{{ findPokemon.name }}</p>
        <div class="pokemon-detail-card">
          <div class="pokemon-image">
            <img
              :src="findPokemon.sprites.other['official-artwork'].front_default"
              alt=""
            />
          </div>
          <div class="pokemon-details">
            Type(s):
            <p>
              <ul v-for="t in findPokemon.types" :key="t.slot"><li>{{ t.type.name }}</li></ul>
            </p>
            <p>Height: {{ findPokemon.height }} ft</p>
            <p>Weight: {{ findPokemon.weight }} lb</p>
          </div>
        </div>
      </div>
      <div v-else-if="error" class="pokemon-card">
        <p id="pokemon-name">FAILED</p>
        <div class="pokemon-detail-card">
          <div class="pokemon-image">
            <img
              src="/error.svg"
              alt=""
            />
          </div>
          <div class="pokemon-details">
            <p>{{ error }}</p>
          </div>
        </div>
      </div>
      <div v-else class="pokemon-card">
        <p>Welcome</p>
      </div>
      <router-link to="/">
        <button id="home-button">I want to return to the Home Page</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useApi } from '@/services/ConnectionAPI'
import { ref, computed, onMounted } from 'vue'
import Error from './Error.vue'

let query = ref('')

let { loading, error, findPokemon, searchPokemon, fetch } = useApi()

onMounted(fetch)
</script>

<style>
.container {
  background: linear-gradient(to bottom, #e3350d 0%, #b32300 100%);
  min-height: 100vh;
}

.container-else{
  background: linear-gradient(to bottom, #e3350d 0%, #b32300 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
}
 #title-pokemon-search{
    font-family: 'Arial Black', Gadget, sans-serif;
  color: #ffcb05;
  text-align: center;
  font-size: 60px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow:
    -2px -2px 0 #3c5aa6,
    2px -2px 0 #3c5aa6,
    -2px 2px 0 #3c5aa6,
    2px 2px 0 #3c5aa6,
    0px 4px 5px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  padding-bottom: 20px;
 }

.container-pokemon-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.container-search {
  display: flex;
  height: 50px;
  width: 300px;
  max-width: 400px;
  overflow: hidden;
  align-items: center;
  padding-left: 10px;
}

#input-find-pokemon {
  flex: 1;
  border: none;
  outline: none;
  height: 100%;
  border-radius: 10px;
  font-size: large;
  padding-left: 10px;
}

#button-find-pokemon {
  width: 65px;
  height: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  border-radius: 50%;
  background-color: #8b0000;
  margin-right: 5px;
  margin-left: 15px;
  color: white;
  border: none;
  font-size: 15px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.container-pokemon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 100%;
}

#pokemon-name{
  text-align: center;
  margin-top: 0;
  font-size: 24px;
  text-transform: capitalize;
}

.pokemon-card {
  background-color: white;
  border: 10px solid gray;
  outline: 2px solid black;
  border-radius: 20px;
  width: 350px;
  padding: 20px;
}

.pokemon-detail-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.pokemon-image img {
  width: 100px;
  height: auto;
}

.pokemon-details {
  font-size: 20px;
  line-height: 1.2;
}

.pokemon-details p, ul, li {
  margin: 5px 0;
  text-transform: capitalize;
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
</style>
