// src/stores/team.js
import { defineStore } from 'pinia'
import api from './api'

export const useTeamStore = defineStore('team', {
  state: () => ({
    team: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchTeam() {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get('/team')
        this.team = response.data
      } catch (error) {
        this.error = error.message
        console.error('Failed to fetch team:', error)
      } finally {
        this.loading = false
      }
    }
  }
})