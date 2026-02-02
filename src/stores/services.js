// src/stores/services.js
import { defineStore } from 'pinia'
import api from './api'

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: [],
    currentService: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchServices() {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get('/services')
        console.log('Response:', response)         // log penuh
        console.log('Response data:', response.data)  // coba akses data
        console.log('Response type:', typeof response)
        this.services = response.data
      } catch (error) {
        this.error = error.message
        console.error('Failed to fetch services:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchService(id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get(`/services/${id}`)
        this.currentService = response.data
      } catch (error) {
        this.error = error.message
        console.error('Failed to fetch service:', error)
      } finally {
        this.loading = false
      }
    }
  }
})