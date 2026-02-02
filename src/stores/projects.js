// src/stores/projects.js
import { defineStore } from 'pinia'
import api from './api'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    featuredProjects: [],
    currentProject: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchProjects() {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get('/projects')
        this.projects = response.data
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
        const response = await api.get('/projects/featured')
        this.featuredProjects = response.data
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
        const response = await api.get(`/projects/${id}`)
        this.currentProject = response.data
      } catch (error) {
        this.error = error.message
        console.error('Failed to fetch project:', error)
      } finally {
        this.loading = false
      }
    }
  }
})