<template>
  <div
    class="bg-poke-green min-h-screen flex flex-col items-center justify-center py-4"
  >
    <Transition name="fade-in-up" appear>
      <router-link to="/">
        <button
          class="bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2.5 rounded-full uppercase tracking-wide cursor-pointer transition hover:bg-white/30"
        >
          I want to return to the Home Page
        </button>
      </router-link>
    </Transition>
    <h1
      class="font-pokedex text-center text-4xl md:text-5xl py-7 font-black uppercase tracking-wider text-poke-yellow title-pokemon-search typing"
    >
      What Pokemon do you want to search?
    </h1>

    <div
      class="bg-gradient-to-b from-poke-red to-poke-red-dark mt-19 w-100 h-auto min-h-137.5 flex flex-col items-center justify-start pb-10 rounded-l-3xl shadow-2xl shadow-black/40 p-6 border-r-8 border-red-800"
    >
      <div class="pokemon-card">
        <div class="pokedex-screen">
          <Transition name="screen-fade" mode="out-in">
            <div
              v-if="loading"
              key="loading"
              class="flex flex-col items-center justify-center min-h-[200px]"
            >
              <div class="pokeball"></div>
            </div>
            <div v-else-if="findPokemon" key="result">
              <div
                class="bg-poke-pixel-green border-[3px] border-solid border-poke-border-dark-gray rounded-md w-64 min-h-[200px] flex flex-col items-center justify-center shadow-[inset_2px_2px_10px_rgba(0,0,0,0.3)]"
              >
                <div class="pokemon-image">
                  <img
                    :src="
                      findPokemon.sprites.other['official-artwork']
                        .front_default
                    "
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div
              v-else-if="error"
              key="error"
              class="bg-poke-pixel-green border-[3px] border-solid border-poke-border-dark-gray rounded-md w-64 min-h-[200px] flex flex-col items-center justify-center shadow-[inset_2px_2px_10px_rgba(0,0,0,0.3)]"
            >
              <div class="pokemon-image-error">
                <img
                  src="/error.svg"
                  alt="Error"
                  class="w-20 h-auto mb-[10px] drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
                />
              </div>
              <div
                class="text-sm font-bold m-0 leading-[1.2] text-poke-border-dark-gray"
              >
                <p>{{ error }}</p>
              </div>
            </div>
            <div v-else key="welcome">
              <div class="flex items-center justify-center">
                <p
                  class="poke-border-dark-gray text-poke-pixel-green poke-message p-[5px] rounded-[3px] mb-[10px] text-lg w-full text-center font-bold"
                >
                  Welcome
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <div
        class="flex flex-row w-full justify-center items-center gap-[10px] z-50"
      >
        <div class="w-10 h-10 bg-poke-dark-gray rounded-full"></div>
        <div class="bg-red-900 w-[100px] h-2.5 rounded-2xl"></div>
        <div class="bg-green-500 w-[100px] h-2.5 rounded-2xl"></div>
      </div>
      <div
        class="flex flex-row w-full justify-center items-center gap-[10px] z-50"
      >
        <input
          class="bg-[#222] text-[#00ff00] border-2 border-solid border-poke-gray w-[220px] p-2 rounded-[5px] mt-2"
          v-model="query"
          type="text"
          @keyup.enter="searchPokemon(query)"
          placeholder="Write Pokemon name here."
        />
        <button
          class="w-12 h-12 rounded-full bg-[#8b0000] text-white text-sm border-4 border-solid border-black cursor-pointer transition-transform duration-100 mt-2 active:scale-90 transform"
          @click="searchPokemon(query)"
        >
          Find it
        </button>
      </div>
      <div
        class="flex flex-row w-full justify-center items-center gap-[10px] z-50"
      >
        <Transition name="screen-fade" mode="out-in">
          <div
            key="info-box"
            class="bg-green-600 border-2 border-black w-[200px] h-[100px] mt-2 mr-2 flex flex-col p-2 text-[10px] font-bold uppercase overflow-hidden"
          >
            <div
              v-if="loading"
              class="w-full h-full flex items-center justify-center text-[14px] tracking-wider"
            >
              Loading...
            </div>
            <template v-else-if="findPokemon">
              <div
                class="text-[15px] text-center uppercase border-b border-black/30 mb-1"
              >
                {{ findPokemon?.name || 'Pokemon Name' }}
              </div>
              <div
                class="flex justify-start gap-8 text-[11px] leading-tight px-2"
              >
                <div class="flex flex-col">
                  <span class="text-[12px] opacity-70 mb-1">Type(s):</span>
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="t in findPokemon?.types"
                      :key="t.slot"
                      class="inline-block bg-black/20 px-[6px] py-[2px] rounded-[4px] text-[10px] border border-black/30 shadow-none"
                    >
                      {{ t?.type.name }}
                    </span>
                  </div>
                </div>
                <div class="flex flex-col text-left ml-1 whitespace-nowrap">
                  <span>Height: {{ findPokemon?.height || 0 }} ft</span>
                  <span>Weight: {{ findPokemon?.weight || 0 }} lb</span>
                </div>
              </div>
            </template>
            <div
              v-else-if="error"
              class="w-full h-full flex items-center justify-center text-[14px] tracking-wider"
            >
              Info not available.
            </div>
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-[14px] tracking-wider"
            >
              Ready to search Pokemon.
            </div>
          </div>
        </Transition>
        <div
          class="flex justify-center items-center w-20 h-20 mt-2.5 drop-shadow-[5px_5px_0px_rgba(0,0,0,0.3)]"
        >
          <div class="cross"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApi } from '@/services/ConnectionAPI'
import { ref, onMounted } from 'vue'
import Error from './Error.vue'

let query = ref('')

let { loading, error, findPokemon, searchPokemon, fetch } = useApi()

onMounted(fetch)
</script>

<style>
.title-pokemon-search {
  text-shadow:
    -2px -2px 0 theme('colors.poke-blue'),
    2px -2px 0 theme('colors.poke-blue'),
    -2px 2px 0 theme('colors.poke-blue'),
    2px 2px 0 theme('colors.poke-blue'),
    0px 4px 5px rgba(0, 0, 0, 0.5);
}

.typing {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  border-right: 4px solid theme('colors.poke-blue');
  animation:
    typing 3s steps(30) forwards,
    hide-caret 0.01s linear 3s forwards;
}

.pokemon-card {
  width: 340px;
  height: 330px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
  padding: 40px 15px 20px 15px;
  margin-top: 50px;
}

.pokemon-card::before {
  content: '';
  position: absolute;
  top: -60px;
  left: -15px;
  width: 65px;
  height: 65px;
  background: radial-gradient(circle at 30% 30%, #51e1ff, #005c82) !important;
  border: 5px solid #fff;
  border-radius: 50%;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.3),
    3px 3px 0 theme('colors.poke-border-dark-gray');
  z-index: 50;
}

.pokemon-card::after {
  content: '';
  position: absolute;
  top: -60px;
  left: 50px;
  width: 15px;
  height: 15px;
  background-color: #ff0000;
  border: 2px solid theme('colors.poke-border-dark-gray');
  border-radius: 50%;
  box-shadow:
    25px 0 0 #f0f000,
    50px 0 0 #00ff00;
  z-index: 50;
}

.cross {
  background: theme('colors.poke-dark-gray');
  height: 85px;
  width: 20px;
  position: relative;
}

.cross::after {
  content: '';
  background: theme('colors.poke-dark-gray');
  height: 20px;
  width: 80px;
  position: absolute;
  left: -32px;
  top: 30px;
}

.pokemon-image img {
  width: 100%;
  max-width: 180px;
  height: auto;
  object-fit: contain;
}

.pokedex-screen {
  background-color: #515151;
  border: 20px solid #dedede;
  border-bottom-width: 60px;
  outline: 4px solid theme('colors.poke-border-dark-gray');
  border-radius: 10px 10px 10px 60px;
  width: 95%;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: none;
  overflow: visible;
}

.pokedex-screen::before {
  content: '';
  position: absolute;
  top: -16px;
  left: 45%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background-color: #ff0000;
  border: none;
  border-radius: 50%;
  box-shadow:
    0 0 0 2px theme('colors.poke-border-dark-gray'),
    25px 0 0 0 #ff0000,
    25px 0 0 2px theme('colors.poke-border-dark-gray');
}

.pokedex-screen::after {
  content: '';
  position: absolute;
  bottom: -45px;
  left: 5%;
  width: 90%;
  height: 30px;
  background:
    radial-gradient(
      circle at 20px 50%,
      #ff0000 0,
      #ff0000 10px,
      theme('colors.poke-border-dark-gray') 10px,
      theme('colors.poke-border-dark-gray') 13px,
      transparent 13px
    ),
    repeating-linear-gradient(
      to bottom,
      theme('colors.poke-border-dark-gray'),
      theme('colors.poke-border-dark-gray') 2px,
      transparent 3px,
      transparent 4px
    );
  background-size:
    100% 100%,
    45px 18px;
  background-position:
    0 0,
    95% 50%;
  background-repeat: no-repeat;
  z-index: 20;
}

.pokedex-screen::-webkit-scrollbar {
  width: 5px;
}

.pokedex-screen::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.pokeball {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border: 4px solid theme('colors.poke-border-dark-gray');
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
  border-bottom: 4px solid theme('colors.poke-border-dark-gray');
}

.pokeball::after {
  content: '';
  position: absolute;
  background-color: #fff;
  width: 15px;
  height: 15px;
  border: 4px solid theme('colors.poke-border-dark-gray');
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.fade-in-up-enter-active {
  transition: all 0.8s ease-out;
}

.fade-in-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-in-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.screen-fade-enter-active,
.screen-fade-leave-active {
  transition: opacity 0.22s ease;
}

.screen-fade-enter-from,
.screen-fade-leave-to {
  opacity: 0;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes hide-caret {
  to {
    border-right-color: transparent;
  }
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
</style>
