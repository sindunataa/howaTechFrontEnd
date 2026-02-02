// src/stores/contact.js
import { defineStore } from 'pinia'
import api from './api'

export const useContactStore = defineStore('contact', {
  state: () => ({
    loading: false,
    error: null,
    success: false
  }),

  actions: {
    async sendMessage(data) {
      this.loading = true
      this.error = null
      this.success = false
      
      try {
        const response = await api.post('/contact', data)
        this.success = true
        return response
      } catch (error) {
        this.error = error.response?.data?.message || error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    resetState() {
      this.loading = false
      this.error = null
      this.success = false
    }
  }
})