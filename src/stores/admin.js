// src/stores/admin.js
import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    services: [],
    projects: [],
    contacts: [],
    loading: false,
    error: null,
    currentService: null,
    currentProject: null,
    currentContact: null,
    pagination: {
      services: {},
      projects: {},
      contacts: {}
    }
  }),

  actions: {
    // Services CRUD
    async fetchServices(page = 1) {
      this.loading = true
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/services?page=${page}`)
        this.services = response.data.data.data
        this.pagination.services = {
          current_page: response.data.data.current_page,
          last_page: response.data.data.last_page,
          per_page: response.data.data.per_page,
          total: response.data.data.total
        }
        this.error = null
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch services'
        console.error('Error fetching services:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchService(id) {
      this.loading = true
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/services/${id}`)
        this.currentService = response.data.data
        this.error = null
        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch service'
        console.error('Error fetching service:', error)
      } finally {
        this.loading = false
      }
    },

    async createService(serviceData) {
      this.loading = true
      try {
        const formData = new FormData()
        Object.keys(serviceData).forEach(key => {
          if (serviceData[key] !== null && serviceData[key] !== undefined) {
              if (key === 'is_active') {
                formData.append(key, serviceData[key] ? '1' : '0')
              } else {
                formData.append(key, serviceData[key])
              }
          }
        })

        const response = await axios.post(`${API_BASE_URL}/admin/services`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        await this.fetchServices()
        this.error = null
        return response.data
      } catch (error) {
        this.error = error.response?.data?.errors || error.response?.data?.message || 'Failed to create service'
        console.error('Error creating service:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateService(id, serviceData) {
      this.loading = true
      try {
        const formData = new FormData()
        Object.keys(serviceData).forEach(key => {
          if (serviceData[key] !== null && serviceData[key] !== undefined) {
            if (key === 'is_active') {
              formData.append(key, serviceData[key] ? '1' : '0')
            } else {
              formData.append(key, serviceData[key])
            }
          }
        })
        formData.append('_method', 'PUT')

        const response = await axios.post(`${API_BASE_URL}/admin/services/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        await this.fetchServices()
        this.error = null
        return response.data
      } catch (error) {
        this.error = error.response?.data?.errors || error.response?.data?.message || 'Failed to update service'
        console.error('Error updating service:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteService(id) {
      this.loading = true
      try {
        await axios.delete(`${API_BASE_URL}/admin/services/${id}`)
        await this.fetchServices()
        this.error = null
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete service'
        console.error('Error deleting service:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Projects CRUD
    async fetchProjects(page = 1) {
      this.loading = true
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/projects?page=${page}`)
        this.projects = response.data.data.data
        this.pagination.projects = {
          current_page: response.data.data.current_page,
          last_page: response.data.data.last_page,
          per_page: response.data.data.per_page,
          total: response.data.data.total
        }
        this.error = null
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch projects'
        console.error('Error fetching projects:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchProject(id) {
      this.loading = true
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/projects/${id}`)
        this.currentProject = response.data.data
        this.error = null
        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch project'
        console.error('Error fetching project:', error)
      } finally {
        this.loading = false
      }
    },

    async createProject(projectData) {
      this.loading = true
      try {
        const formData = new FormData()
        
        Object.keys(projectData).forEach(key => {
          if (key === 'gallery' && Array.isArray(projectData[key])) {
            projectData[key].forEach((file, index) => {
              formData.append(`gallery[${index}]`, file)
            })
          } else if (key === 'technologies' && Array.isArray(projectData[key])) {
            projectData[key].forEach((tech, index) => {
              formData.append(`technologies[${index}]`, tech)
            })
          } else if (key === 'is_featured' || key === 'is_active') {
              formData.append(key, projectData[key] ? '1' : '0')
          } else if (projectData[key] !== null && projectData[key] !== undefined) {
              formData.append(key, projectData[key])
          }
        })

        const response = await axios.post(`${API_BASE_URL}/admin/projects`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        await this.fetchProjects()
        this.error = null
        return response.data
      } catch (error) {
        this.error = error.response?.data?.errors || error.response?.data?.message || 'Failed to create project'
        console.error('Error creating project:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProject(id, projectData) {
      this.loading = true
      try {
        const formData = new FormData()
        
        Object.keys(projectData).forEach(key => {
          if (key === 'gallery' && Array.isArray(projectData[key])) {
            projectData[key].forEach((file, index) => {
              if (file instanceof File) {
                formData.append(`gallery[${index}]`, file)
              }
            })
          } else if (key === 'technologies' && Array.isArray(projectData[key])) {
            projectData[key].forEach((tech, index) => {
              formData.append(`technologies[${index}]`, tech)
            })
          } else if (key === 'is_featured' || key === 'is_active') {
              formData.append(key, projectData[key] ? '1' : '0')
          } else if (projectData[key] !== null && projectData[key] !== undefined) {
            formData.append(key, projectData[key])
          }
        })
        formData.append('_method', 'PUT')

        const response = await axios.post(`${API_BASE_URL}/admin/projects/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        await this.fetchProjects()
        this.error = null
        return response.data
      } catch (error) {
        this.error = error.response?.data?.errors || error.response?.data?.message || 'Failed to update project'
        console.error('Error updating project:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteProject(id) {
      this.loading = true
      try {
        await axios.delete(`${API_BASE_URL}/admin/projects/${id}`)
        await this.fetchProjects()
        this.error = null
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete project'
        console.error('Error deleting project:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Contacts Management
    async fetchContacts(page = 1) {
      this.loading = true
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/contacts?page=${page}`)
        this.contacts = response.data.data.data
        this.pagination.contacts = {
          current_page: response.data.data.current_page,
          last_page: response.data.data.last_page,
          per_page: response.data.data.per_page,
          total: response.data.data.total
        }
        this.error = null
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch contacts'
        console.error('Error fetching contacts:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchContact(id) {
      this.loading = true
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/contacts/${id}`)
        this.currentContact = response.data.data
        this.error = null
        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch contact'
        console.error('Error fetching contact:', error)
      } finally {
        this.loading = false
      }
    },

    async deleteContact(id) {
      this.loading = true
      try {
        await axios.delete(`${API_BASE_URL}/admin/contacts/${id}`)
        await this.fetchContacts()
        this.error = null
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete contact'
        console.error('Error deleting contact:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async markContactAsRead(id) {
      this.loading = true
      try {
        await axios.patch(`${API_BASE_URL}/admin/contacts/${id}/read`)
        await this.fetchContacts()
        if (this.currentContact && this.currentContact.id === id) {
          this.currentContact.is_read = true
          this.currentContact.read_at = new Date().toISOString()
        }
        this.error = null
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to mark contact as read'
        console.error('Error marking contact as read:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Utility methods
    clearError() {
      this.error = null
    },

    clearCurrentData() {
      this.currentService = null
      this.currentProject = null
      this.currentContact = null
    }
  }
})