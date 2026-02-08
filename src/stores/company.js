// // src/stores/company.js
// import { defineStore } from 'pinia'
// import api from './api'

// export const useCompanyStore = defineStore('company', {
//   state: () => ({
//     info: {},
//     loading: false,
//     error: null
//   }),

//   actions: {
//     async fetchCompanyInfo() {
//       this.loading = true
//       this.error = null
      
//       try {
//         const response = await api.get('/company')
//         this.info = response.data
//       } catch (error) {
//         this.error = error.message
//         console.error('Failed to fetch company info:', error)
//       } finally {
//         this.loading = false
//       }
//     }
//   },

//   getters: {
//     companyName: (state) => state.info?.name || 'Howa Technology',
//     companyDescription: (state) => state.info?.description || '',
//     companyAddress: (state) => state.info?.address || '',
//     companyPhone: (state) => state.info?.phone || '',
//     companyEmail: (state) => state.info?.email || '',
//     socialLinks: (state) => state.info?.social_links || {},
//     heroTitle: (state) => state.info?.hero_title || 'Welcome',
//     heroSubtitle: (state) => state.info?.hero_subtitle || 'We create amazing solutions'
//   }
// })

// src/stores/company.js
import { defineStore } from 'pinia'

// Data perusahaan statis
const companyData = {
  "name": "PT. Howa Technology",
  "description": "We are a leading technology company providing innovative solutions.",
  "mission": "To deliver innovative technology solutions that empower businesses to thrive in the digital age.",
  "vision": "To be the most trusted technology partner for businesses worldwide.",
  "address": "Jl. Sudirman No. 123, Jakarta, Indonesia",
  "phone": "+62 21 12345678",
  "email": "info@company.com",
  "website": "https://company.com",
  "social_links": {
    "facebook": "https://facebook.com/company",
    "twitter": "https://twitter.com/company",
    "linkedin": "https://linkedin.com/company",
    "instagram": "https://instagram.com/company"
  },
  "about_content": "Our company has been at the forefront of technological innovation for over a decade. We specialize in creating cutting-edge solutions that help businesses transform their operations and achieve their goals. Our team of experienced professionals is dedicated to delivering exceptional results and building long-lasting relationships with our clients.",
  "hero_title": "Welcome to Our Company",
  "hero_subtitle": "We create amazing digital solutions for your business"
}

export const useCompanyStore = defineStore('company', {
  state: () => ({
    info: companyData,
    loading: false,
    error: null
  }),

  actions: {
    async fetchCompanyInfo() {
      this.loading = true
      this.error = null
      
      try {
        // Simulasi delay API call (opsional)
        await new Promise(resolve => setTimeout(resolve, 100))
        this.info = companyData
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