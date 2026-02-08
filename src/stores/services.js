// // src/stores/services.js
// import { defineStore } from 'pinia'
// import api from './api'

// export const useServicesStore = defineStore('services', {
//   state: () => ({
//     services: [],
//     currentService: null,
//     loading: false,
//     error: null
//   }),

//   actions: {
//     async fetchServices() {
//       this.loading = true
//       this.error = null
      
//       try {
//         const response = await api.get('/services')
//         console.log('Response:', response)         // log penuh
//         console.log('Response data:', response.data)  // coba akses data
//         console.log('Response type:', typeof response)
//         this.services = response.data
//       } catch (error) {
//         this.error = error.message
//         console.error('Failed to fetch services:', error)
//       } finally {
//         this.loading = false
//       }
//     },

//     async fetchService(id) {
//       this.loading = true
//       this.error = null
      
//       try {
//         const response = await api.get(`/services/${id}`)
//         this.currentService = response.data
//       } catch (error) {
//         this.error = error.message
//         console.error('Failed to fetch service:', error)
//       } finally {
//         this.loading = false
//       }
//     }
//   }
// })

// src/stores/services.js
import { defineStore } from 'pinia'

// Data services statis
const servicesData = [
  {
    "id": 1,
    "title": "Web Developments",
    "description": "We create modern, responsive websites and web applications using the latest technologies. Our team delivers high-quality solutions that are scalable, secure, and user-friendly.",
    "icon": "fas fa-code",
    "image": "services/HAZIU5IrYwttXRxkdsAbE4NBvbuNHK2hbCzwom36.jpg",
    "is_active": true,
    "sort_order": 1,
    "created_at": "2025-08-28T06:38:58.000000Z",
    "updated_at": "2025-09-01T04:51:21.000000Z"
  },
  {
    "id": 2,
    "title": "Mobile App Development",
    "description": "Native and cross-platform mobile applications for iOS and Android. We build apps that provide excellent user experience and performance.",
    "icon": "fas fa-mobile-alt",
    "image": null,
    "is_active": true,
    "sort_order": 2,
    "created_at": "2025-08-28T06:38:58.000000Z",
    "updated_at": "2025-08-28T06:38:58.000000Z"
  },
  {
    "id": 3,
    "title": "Digital Marketing",
    "description": "Comprehensive digital marketing strategies including SEO, social media marketing, content marketing, and paid advertising to grow your online presence.",
    "icon": "fas fa-chart-line",
    "image": null,
    "is_active": true,
    "sort_order": 3,
    "created_at": "2025-08-28T06:38:58.000000Z",
    "updated_at": "2025-08-28T06:38:58.000000Z"
  },
  {
    "id": 4,
    "title": "UI/UX Design",
    "description": "Beautiful and intuitive user interface and user experience designs that engage users and drive conversions.",
    "icon": "fas fa-paint-brush",
    "image": null,
    "is_active": true,
    "sort_order": 4,
    "created_at": "2025-08-28T06:38:58.000000Z",
    "updated_at": "2025-08-28T06:38:58.000000Z"
  },
  {
    "id": 5,
    "title": "Cloud Solutions",
    "description": "Cloud infrastructure setup, migration, and management services to help your business leverage the power of cloud computing.",
    "icon": "fas fa-cloud",
    "image": null,
    "is_active": true,
    "sort_order": 5,
    "created_at": "2025-08-28T06:38:58.000000Z",
    "updated_at": "2025-08-28T06:38:58.000000Z"
  },
  {
    "id": 6,
    "title": "IT Consulting",
    "description": "Strategic IT consulting services to help you make informed technology decisions and optimize your IT infrastructure.",
    "icon": "fas fa-users",
    "image": null,
    "is_active": true,
    "sort_order": 6,
    "created_at": "2025-08-28T06:38:58.000000Z",
    "updated_at": "2025-08-28T06:38:58.000000Z"
  }
]

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: servicesData,
    currentService: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchServices() {
      this.loading = true
      this.error = null
      
      try {
        // Simulasi delay API call (opsional)
        await new Promise(resolve => setTimeout(resolve, 100))
        this.services = servicesData.filter(s => s.is_active)
        console.log('Services loaded:', this.services)
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
        // Simulasi delay API call (opsional)
        await new Promise(resolve => setTimeout(resolve, 100))
        this.currentService = servicesData.find(s => s.id === parseInt(id))
        
        if (!this.currentService) {
          throw new Error('Service not found')
        }
      } catch (error) {
        this.error = error.message
        console.error('Failed to fetch service:', error)
      } finally {
        this.loading = false
      }
    }
  }
})