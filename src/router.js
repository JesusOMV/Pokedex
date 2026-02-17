import { createRouter, createWebHistory } from 'vue-router'
import WelcomeTraineer from './components/WelcomeTraineer.vue'
import SearchPokemon from './components/SearchPokemon.vue'
import ListPokemon from './components/ListPokemon.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: WelcomeTraineer,
  },
  {
    path: '/pokemonList',
    name: 'pokemonList',
    component: ListPokemon,
  },
  {
    path: '/search',
    name: 'search',
    component: SearchPokemon,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
