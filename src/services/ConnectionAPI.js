import { ref } from 'vue'
import api from './Api'
import axios from 'axios'

export const useApi = () => {
  let data = ref([])
  let dataAll = ref([])
  const limit = ref(10)
  const offset = ref(0)
  const totalPokemons = ref(0)
  let error = ref(null)
  let loading = ref(false)
  let findPokemon = ref(null)

  const fetch = async () => {
    const startedAt = Date.now()
    loading.value = true
    error.value = null
    try {
      let response = await api.get(
        `pokemon?limit=${limit.value}&offset=${offset.value}`,
      )
      data.value = response.data.results
      await getAllPokemons(data)
      totalPokemons.value = response.data.count
    } catch (e) {
      error.value = 'Error al obtener datos'
    } finally {
      const elapsed = Date.now() - startedAt
      const remaining = 3000 - elapsed
      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining))
      }
      loading.value = false
    }
  }

  const getAllPokemons = async (data) => {
    let pokeResponse = data.value.map((pokemon) => axios.get(pokemon.url))
    let pokeDetails = await Promise.all(pokeResponse)
    dataAll.value = pokeDetails.map((res) => ({
      idAll: res.data.id,
      nameAll: res.data.name,
      imageAll: res.data.sprites.other['official-artwork'].front_default,
      typesAll: res.data.types,
      heightAll: res.data.height,
      weightAll: res.data.weight,
    }))
  }

  const searchPokemon = async (searchQuery) => {
    if (!searchQuery) {
      return
    }

    const term = searchQuery.value ? searchQuery.value : searchQuery

    error.value = null
    findPokemon.value = null
    const startedAt = Date.now()
    loading.value = true

    try {
      const cleanQuery = term.toString().trim().toLowerCase()
      let response = await api.get(`pokemon/${cleanQuery}`)

      findPokemon.value = response.data
    } catch (err) {
      error.value = 'Pokemon not found, try with another name.'
    } finally {
      const elapsed = Date.now() - startedAt
      const remaining = 3000 - elapsed
      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining))
      }
      loading.value = false
    }
  }

  return {
    data,
    dataAll,
    limit,
    offset,
    totalPokemons,
    error,
    loading,
    findPokemon,
    fetch,
    searchPokemon,
  }
}
