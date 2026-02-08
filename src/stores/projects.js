// // src/stores/projects.js
// import { defineStore } from 'pinia'
// import api from './api'

// export const useProjectsStore = defineStore('projects', {
//   state: () => ({
//     projects: [],
//     featuredProjects: [],
//     currentProject: null,
//     loading: false,
//     error: null
//   }),

//   actions: {
//     async fetchProjects() {
//       this.loading = true
//       this.error = null
      
//       try {
//         const response = await api.get('/projects')
//         this.projects = response.data
//       } catch (error) {
//         this.error = error.message
//         console.error('Failed to fetch projects:', error)
//       } finally {
//         this.loading = false
//       }
//     },

//     async fetchFeaturedProjects() {
//       this.loading = true
//       this.error = null
      
//       try {
//         const response = await api.get('/projects/featured')
//         this.featuredProjects = response.data
//       } catch (error) {
//         this.error = error.message
//         console.error('Failed to fetch featured projects:', error)
//       } finally {
//         this.loading = false
//       }
//     },

//     async fetchProject(id) {
//       this.loading = true
//       this.error = null
      
//       try {
//         const response = await api.get(`/projects/${id}`)
//         this.currentProject = response.data
//       } catch (error) {
//         this.error = error.message
//         console.error('Failed to fetch project:', error)
//       } finally {
//         this.loading = false
//       }
//     }
//   }
// })

// src/stores/projects.js
import { defineStore } from 'pinia'

// Data projects statis
const projectsData = [
  {
    "id": 1,
    "title": "ZEISS Surfcom",
    "description": "A comprehensive e-commerce platform built with modern technologies. Features include product catalog, shopping cart, payment integration, order management, and admin dashboard.",
    "short_description": "ZEISS Surfcom machines are a series of profile and contour measuring instruments (profilometers) used to analyze the surfaces of manufactured components. These instruments measure surface roughness, waviness, and profile parameters, which are important for quality control in the manufacturing industry. The latest models in this series, such as the ZEISS Surfcom Touch, use a color touch screen for easier operation and support data analysis and result printing.",
    "image": "projects/pAtJUyuXgNsb5UsKVEPLHE4DL2nCu89O2icPCLIC.png",
    "gallery": null,
    "client": "ABC Store",
    "project_date": "2024-01-15T00:00:00.000000Z",
    "category": "Web Development",
    "url": "https://abcstore.com",
    "technologies": [
      "Laravel",
      "Vue.js",
      "MySQL",
      "Stripe"
    ],
    "is_featured": true,
    "is_active": true,
    "sort_order": 1,
    "created_at": "2025-08-28T06:38:58.000000Z",
    "updated_at": "2025-09-01T05:42:41.000000Z"
  },
  {
    "id": 2,
    "title": "Mobile Banking App",
    "description": "A secure mobile banking application with features like account management, money transfer, bill payments, and transaction history.",
    "short_description": "Secure mobile banking solution",
    "image": "projects/LF6qEHgJnrGP2nT2XlnCW6OH6cKyE1fIsA9xxSnh.jpg",
    "gallery": null,
    "client": "XYZ Bank",
    "project_date": "2024-02-20T00:00:00.000000Z",
    "category": "Mobile Development",
    "url": null,
    "technologies": [
      "React Native",
      "Node.js",
      "PostgreSQL"
    ],
    "is_featured": true,
    "is_active": true,
    "sort_order": 2,
    "created_at": "2025-08-28T06:38:58.000000Z",
    "updated_at": "2025-09-01T05:20:35.000000Z"
  },
  {
    "id": 3,
    "title": "Electrical Discharge Machining",
    "description": "A professional corporate website with modern design, content management system, and SEO optimization.",
    "short_description": "Electrical Discharge Machining",
    "image": "projects/wx11zmEdU1mM2Kq9Sa8sPGt7fpIYjr3b3hkfg38o.jpg",
    "gallery": null,
    "client": "DEF Corporation",
    "project_date": "2024-03-10T00:00:00.000000Z",
    "category": "Web Development",
    "url": "https://defcorp.com",
    "technologies": [
      "WordPress",
      "PHP",
      "MySQL"
    ],
    "is_featured": true,
    "is_active": true,
    "sort_order": 3,
    "created_at": "2025-08-28T06:38:58.000000Z",
    "updated_at": "2025-09-01T05:24:47.000000Z"
  },
  {
    "id": 4,
    "title": "Learning Management System",
    "description": "A comprehensive LMS platform for online education with course management, student tracking, and assessment tools.",
    "short_description": "Online learning platform",
    "image": "projects/lms.jpg",
    "gallery": null,
    "client": "GHI Academy",
    "project_date": "2024-04-05T00:00:00.000000Z",
    "category": "Web Development",
    "url": null,
    "technologies": [
      "Laravel",
      "Vue.js",
      "MySQL",
      "AWS"
    ],
    "is_featured": true,
    "is_active": true,
    "sort_order": 4,
    "created_at": "2025-08-28T06:38:58.000000Z",
    "updated_at": "2025-08-28T06:38:58.000000Z"
  }
]

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: projectsData,
    featuredProjects: projectsData.filter(p => p.is_featured),
    currentProject: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchProjects() {
      this.loading = true
      this.error = null
      
      try {
        // Simulasi delay API call (opsional)
        await new Promise(resolve => setTimeout(resolve, 100))
        this.projects = projectsData
      } catch (error) {
        this.error = error.message
        console.error('Failed to fetch projects:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchFeaturedProjects() {
      this.loading = true
      this.error = null
      
      try {
        // Simulasi delay API call (opsional)
        await new Promise(resolve => setTimeout(resolve, 100))
        this.featuredProjects = projectsData.filter(p => p.is_featured && p.is_active)
      } catch (error) {
        this.error = error.message
        console.error('Failed to fetch featured projects:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchProject(id) {
      this.loading = true
      this.error = null
      
      try {
        // Simulasi delay API call (opsional)
        await new Promise(resolve => setTimeout(resolve, 100))
        this.currentProject = projectsData.find(p => p.id === parseInt(id))
        
        if (!this.currentProject) {
          throw new Error('Project not found')
        }
      } catch (error) {
        this.error = error.message
        console.error('Failed to fetch project:', error)
      } finally {
        this.loading = false
      }
    }
  }
})