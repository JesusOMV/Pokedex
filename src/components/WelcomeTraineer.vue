<template>
  <div class="container">
    <div class="logo-container">
      <Transition name="fade-down" appear>
        <img src="/pokemon-logo.svg" alt="Pokemon Logo" class="pokemon-logo" />
      </Transition>
    </div>

    <Transition name="slide-fade" appear>
      <div>
        <h1>Welcome to the Pokedex!</h1>
      </div>
    </Transition>

    <p class="message">Ready to know more about Pokemons?</p>
    <div class="buttons-container">
      <router-link to="/pokemonList">
        <button>Let's check all of them!</button>
      </router-link>
      <router-link to="/search">
        <button>Let's search for a Pokemon!</button>
      </router-link>
      <div class="pokeball-container">
        <transition name="roll-to-bottom" appear="">
          <img class="pokeball" src="/pokeball.svg" alt="Pokeball" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.container {
  background: linear-gradient(to bottom, #e3350d 0%, #b32300 100%);
  min-height: 100vh;
}
.logo-container {
  text-align: center;
  padding: 40px 20px;
}

.pokemon-logo {
  width: 300px;
  height: auto;
  display: block;
  margin: 0 auto;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3));
}

.message {
  color: white;
  text-align: center;
  font-size: 2.5em;
  font-weight: bold;
  letter-spacing: 2px;
  margin-top: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.buttons-container {
  display: flex;
  gap: 100px;
  height: 25vh;
  align-items: center;
  justify-content: center;
}

button {
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

.buttons-style:hover {
  background: rgba(255, 255, 255, 0.3);
}

.pokeball-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 40vh;
  width: 100vw;
  padding-bottom: 50px;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
}

.pokeball {
  width: 200px;
  height: 200px;
}

h1 {
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
}

.fade-down-enter-active {
  transition: all 1s ease-out;
}

.face-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.face-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-fade-enter-active {
  transition: all 1s ease-out;
}

.roll-to-bottom-appear-active {
  animation: roll-in-bottom 1.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

@keyframes roll-in-bottom {
  0% {
    /* Empieza fuera de la pantalla por la izquierda */
    transform: translateX(-100vw) rotate(-1080deg);
    opacity: 0;
  }
  100% {
    /* Llega al centro (0) y deja de rotar */
    transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
}
</style>
