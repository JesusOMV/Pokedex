<template>
  <div class="bg-poke-green min-h-screen p-5 text-white">
    <Transition name="screen-fade" mode="out-in">
      <div
        v-if="loading"
        key="loading"
        class="fixed inset-0 flex flex-col items-center justify-center z-[2000]"
      >
        <div class="pokeball"></div>
        <p class="loading-text">Catching pokemons...</p>
      </div>
      <div v-else-if="error" key="error">
        <Error :error="error" />
      </div>
      <div v-else key="list">
        <div class="flex flex-col items-center">
          <router-link to="/">
            <button
              class="bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2.5 rounded-full uppercase tracking-wide cursor-pointer transition hover:bg-white/30"
            >
              I want to return to the Home Page
            </button>
          </router-link>
          <h1
            class="font-pokedex text-center mb-[30px] text-4xl md:text-5xl py-2 font-black uppercase tracking-wider text-poke-yellow title-pokemon-list"
          >
            Official List of Pokemons
          </h1>
        </div>
        <div class="pokemon-grid">
          <div
            class="pokemon-card-list"
            v-for="pokemon in pokemones"
            :key="pokemon.idAll"
            @click="selectPokemon(pokemon)"
          >
            <div class="pokemon-image-container">
              <img :src="pokemon.imageAll" alt="" />
            </div>
          </div>
        </div>
        <Teleport to="body">
          <Transition name="modal-pop">
            <div
              v-if="selectedPokemon"
              class="fixed inset-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000]"
              @click="closeCard"
              role="dialog"
              aria-modal="true"
            >
              <div
                class="bg-gradient-to-b from-poke-red to-poke-red-dark font-poke-message card-content"
                @click.stop
              >
                <button
                  class="bg-black text-white border-none px-3 py-2 rounded-lg cursor-pointer mb-[10px] hover:bg-gray-800 transition-colors"
                  @click="closeCard"
                >
                  Close
                </button>
                <div
                  class="bg-white border-[4px] border-black rounded-[14px] p-3 w-[min(330px,85vw)] mx-auto flex justify-center items-center my-[10px]"
                >
                  <img
                    class="block w-[180px] h-auto object-contain"
                    :src="selectedPokemon.imageAll"
                    :alt="selectedPokemon.nameAll"
                  />
                </div>

                <h2 class="text-[36px] m-0 text-black capitalize">
                  {{ selectedPokemon.nameAll }}
                </h2>

                <h2>Type(s):</h2>
                <ul
                  class="list-none p-0 my-[10px] flex flex-wrap justify-center gap-2"
                >
                  <li
                    v-for="t in selectedPokemon.typesAll"
                    :key="t.slot"
                    class="bg-black/20 px-[10px] py-[6px] rounded-full capitalize list-none"
                  >
                    {{ t.type.name }}
                  </li>
                </ul>

                <p class="my-[6px] text-black font-semibold">
                  Height: {{ selectedPokemon.heightAll }} ft
                </p>
                <p class="my-[6px] text-black font-semibold">
                  Weight: {{ selectedPokemon.weightAll }} lb
                </p>
              </div>
            </div>
          </Transition>
        </Teleport>
        <nav class="flex justify-center items-center gap-5 mt-5">
          <button
            class="nav-button bg-white/20 border-none text-white py-[10px] px-[15px] rounded-[25px] font-bold cursor-pointer transition duration-300"
            @click="previousP"
            :disabled="offset === 0 || loading"
          >
            Previous
          </button>
          <span
            class="text-base font-bold text-white bg-white/10 px-4 py-2 rounded-xl border border-white/20 min-w-[100px] text-center shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]"
          >
            {{ offset + 1 }} - {{ offset + pokemones.length }}
          </span>
          <button
            class="nav-button nav-button bg-white/20 border-none text-white py-[10px] px-[15px] rounded-[25px] font-bold cursor-pointer transition duration-300"
            @click="nextP"
            :disabled="offset + limit >= totalPokemons || loading"
          >
            Next
          </button>
        </nav>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useApi } from '@/services/ConnectionAPI'
import Error from './Error.vue'

const {
  dataAll: pokemones,
  limit,
  offset,
  totalPokemons,
  error,
  loading,
  fetch,
} = useApi()

const selectedPokemon = ref(null)

const selectPokemon = (pokemon) => {
  selectedPokemon.value = pokemon
}

const closeCard = () => {
  selectedPokemon.value = null
}

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
.title-pokemon-list {
  text-shadow:
    -2px -2px 0 theme('colors.poke-blue'),
    2px -2px 0 theme('colors.poke-blue'),
    -2px 2px 0 theme('colors.poke-blue'),
    2px 2px 0 theme('colors.poke-blue'),
    0px 4px 5px rgba(0, 0, 0, 0.5);
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
  position: relative;
}

.pokemon-card-list {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 15px;
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
}

.pokemon-card-list:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.2);
}

.pokemon-image-container img {
  width: 100%;
  height: auto;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.5));
}

.card-content {
  padding: 20px 15px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: fit-content;
  max-width: 90vw;
}

.modal-types li {
  background: rgba(0, 0, 0, 0.2);
  padding: 6px 10px;
  border-radius: 999px;
  text-transform: capitalize;
}

.nav-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.nav-button:disabled {
  background: theme('colors.poke-gray');
  cursor: not-allowed;
  opacity: 0.5;
}

.pokeball {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border: 4px solid #333;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  animation: shake 1.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
}

.pokeball::before {
  content: '';
  position: absolute;
  background-color: #f20202;
  width: 100%;
  height: 50%;
  top: 0;
  border-bottom: 4px solid #333;
}

.pokeball::after {
  content: '';
  position: absolute;
  background-color: white;
  width: 15px;
  height: 15px;
  border: 4px solid #333;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.loading-text {
  margin-top: 20px;
  text-align: center;
  white-space: nowrap;
  color: white;
  font-weight: 700;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}

.screen-fade-enter-active,
.screen-fade-leave-active {
  transition: opacity 0.25s ease;
}

.screen-fade-enter-from,
.screen-fade-leave-to {
  opacity: 0;
}

.modal-pop-enter-active,
.modal-pop-leave-active {
  transition: opacity 0.2s ease;
}

.modal-pop-enter-active .card-content,
.modal-pop-leave-active .card-content {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.modal-pop-enter-from,
.modal-pop-leave-to {
  opacity: 0;
}

.modal-pop-enter-from .card-content,
.modal-pop-leave-to .card-content {
  transform: translateY(10px) scale(0.97);
  opacity: 0;
}

@keyframes shake {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-20deg);
  }
  40% {
    transform: rotate(20deg);
  }
  60% {
    transform: rotate(-20deg);
  }
  80% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
