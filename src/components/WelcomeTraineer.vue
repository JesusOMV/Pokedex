<!-- This is the Welcome Traineer Component. -->
<template>
  <div class="bg-gradient-to-b from-poke-red to-poke-red-dark min-h-screen">
    <div class="text-center py-10 px-5">
      <Transition name="fade-down" appear>
        <img
          v-if="startAnimations"
          :src="pokemonLogo"
          alt="Pokemon Logo"
          class="w-[300px] h-auto block mx-auto drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)]"
        />
      </Transition>
    </div>

    <Transition name="slide-fade" appear>
      <div v-if="startAnimations">
        <h1
          class="font-pokedex text-center text-4xl md:text-6xl font-black uppercase tracking-wider text-poke-yellow pokedex-title"
        >
          Welcome to the Pokedex!
        </h1>
      </div>
    </Transition>

    <div
      class="flex flex-col md:flex-row items-center md:items-start justify-center gap-5 mt-[100px] animate-[appear-message_0.5s_ease_both_0.6s]"
    >
      <Transition name="slide-oak" appear>
        <img
          v-if="startAnimations"
          :src="professorOak"
          class="flex-shrink-0 h-[280px] w-auto"
          alt="Professor Oak"
        />
      </Transition>
      <Transition name="fade-message" appear>
        <div v-if="startAnimations" class="message">
          <p>
            {{ displayedText
            }}<span
              class="inline-block w-[10px] h-5 bg-black ml-[5px] animate-blink"
              v-if="!showButtons"
              >|</span
            >
          </p>
          <Transition name="fade-in-up">
            <div
              v-if="showButtons"
              class="flex flex-wrap gap-2.5 w-full mt-2.5 items-center justify-center"
            >
              <router-link to="/pokemonList">
                <button>Let's check all of them!</button>
              </router-link>
              <router-link to="/search">
                <button>Let's search for a Pokemon!</button>
              </router-link>
            </div>
          </Transition>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import pokemonLogo from '../assets/pokemon-logo.png'
import professorOak from '../assets/ProfessorOak.png'

const fullText =
  "Hello there, I'm Professor Oak. Ready to know more about Pokemons?"
const displayedText = ref('')
const showButtons = ref(false)
const startAnimations = ref(false)

onMounted(() => {
  startAnimations.value = true
  setTimeout(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < fullText.length) {
        displayedText.value += fullText.charAt(i)
        i++
      } else {
        clearInterval(interval)
        showButtons.value = true
      }
    }, 50)
  }, 2200)
})
</script>

<style scoped>
.pokedex-title {
  text-shadow:
    -2px -2px 0 theme('colors.poke-blue'),
    2px -2px 0 theme('colors.poke-blue'),
    -2px 2px 0 theme('colors.poke-blue'),
    2px 2px 0 theme('colors.poke-blue'),
    0px 4px 5px rgba(0, 0, 0, 0.5);
}

.message {
  font-family: theme('fontFamily.poke-message');
  font-weight: 900;
  text-transform: uppercase;
  font-size: 18px;
  position: relative;
  top: 20px;
  background-color: white;
  padding: 20px;
  border: 4px solid black;
  border-radius: 10px;
  filter: none;
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.15);
  z-index: 1;
  overflow: visible;
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 300px;
  width: 450px;
  min-height: 180px;
  justify-content: flex-start;
  height: auto;
  overflow: visible;
}

.message p {
  min-height: 1.2em;
  margin-bottom: 15px;
}

.message p:not(:empty) .cursor {
}

.message::after {
  content: '';
  position: absolute;
  top: 25px;
  left: -24px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 14px solid transparent;
  border-bottom: 14px solid transparent;
  border-right: 24px solid black;
  display: block;
  z-index: 1;
}

button {
  background-color: white;
  backdrop-filter: blur(10px);
  border: 3px solid black;
  color: black;
  padding: 10px 20px;
  font-family: theme('fontFamily.poke-message');
  font-weight: 900;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  position: relative;
}

button:active {
  transform: translateY(2px);
  box-shadow: 0px 2px 0px #2a4380;
}

button:hover {
  background-color: theme('colors.poke-yellow');
  color: theme('colors.poke-blue');
  text-shadow: 2px 2px 0px rgba(60, 90, 166, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 6px 0px #2a4380;
}

.fade-down-enter-from {
  opacity: 0;
}

.fade-down-enter-active {
  transition: opacity 1s ease;
}

.fade-down-enter-to {
  opacity: 1;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-fade-enter-active {
  transition: all 1s ease-out;
  transition-delay: 0.5s;
}

.slide-oak-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-oak-enter-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: 1s;
}

.slide-oak-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.fade-message-enter-active {
  transition: all 0.8s ease;
  transition-delay: 1.5s;
}

.fade-message-enter-from {
  opacity: 0;
  transform: translateY(20px);
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

.roll-to-bottom-appear-active {
  animation: roll-in-bottom 1.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

@keyframes appear-message {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
