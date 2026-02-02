// src/stores/company.js
import { defineStore } from 'pinia'
import api from './api'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    info: {},
    loading: false,
    error: null
  }),

  actions: {
    async fetchCompanyInfo() {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get('/company')
        this.info = response.data
      } catch (error) {
        this.error = error.message
        console.error('Failed to fetch company info:', error)
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    companyName: (state) => state.info?.name || 'Howa Technology',
    companyDescription: (state) => state.info?.description || '',
    companyAddress: (state) => state.info?.address || '',
    companyPhone: (state) => state.info?.phone || '',
    companyEmail: (state) => state.info?.email || '',
    socialLinks: (state) => state.info?.social_links || {},
    heroTitle: (state) => state.info?.hero_title || 'Welcome',
    heroSubtitle: (state) => state.info?.hero_subtitle || 'We create amazing solutions'
  }
})