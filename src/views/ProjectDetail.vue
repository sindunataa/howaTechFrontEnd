<!-- src/views/ProjectDetail.vue -->
<template>
  <div class="min-h-screen pt-20">
    <div v-if="projectsStore.loading" class="flex justify-center items-center h-96">
      <LoadingSpinner size="large" />
    </div>
    
    <div v-else-if="project">
      <!-- Hero Section -->
      <section class="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <div class="flex items-center mb-4">
                <span class="bg-primary-500 text-white text-sm px-3 py-1 rounded-full">
                  {{ project.category }}
                </span>
                <span v-if="project.is_featured" class="ml-2 bg-yellow-500 text-white text-sm px-3 py-1 rounded-full">
                  Featured
                </span>
              </div>
              <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {{ project.title }}
              </h1>
              <p class="text-xl text-gray-600 mb-6">
                {{ project.short_description }}
              </p>
              <div class="flex flex-wrap gap-2 mb-6">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="bg-white text-primary-600 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ tech }}
                </span>
              </div>
              <a 
                v-if="project.url"
                :href="project.url" 
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200"
              >
                Visit Website
                <i class="fas fa-external-link-alt ml-2"></i>
              </a>
            </div>
            <div data-aos="fade-left">
              <img 
                :src="`http://localhost:8000/storage/${project.image}`" 
                :alt="project.title"
                class="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Project Details -->
      <section class="py-20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div class="lg:col-span-2">
              <h2 class="text-3xl font-bold text-gray-900 mb-6" data-aos="fade-up">Project Overview</h2>
              <div class="prose prose-lg text-gray-600 mb-8" data-aos="fade-up" data-aos-delay="200">
                <p>{{ project.description }}</p>
              </div>
              
              <!-- Gallery -->
              <div v-if="project.gallery && project.gallery.length > 0" class="mb-8">
                <h3 class="text-2xl font-bold text-gray-900 mb-6" data-aos="fade-up">Gallery</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <img 
                    v-for="(image, index) in project.gallery" 
                    :key="index"
                    :src="`http://localhost:8000/storage/${project.image}`" 
                    :alt="`${project.title} Gallery ${index + 1}`"
                    class="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                    data-aos="fade-up"
                    :data-aos-delay="(index * 100).toString()"
                  />
                </div>
              </div>
            </div>
            
            <div class="lg:col-span-1">
              <div class="bg-gray-50 rounded-lg p-8 sticky top-24" data-aos="fade-up">
                <h3 class="text-xl font-bold text-gray-900 mb-6">Project Info</h3>
                <div class="space-y-4">
                  <div v-if="project.client">
                    <dt class="text-sm font-medium text-gray-500 mb-1">Client</dt>
                    <dd class="text-gray-900">{{ project.client }}</dd>
                  </div>
                  <div v-if="project.project_date">
                    <dt class="text-sm font-medium text-gray-500 mb-1">Date</dt>
                    <dd class="text-gray-900">{{ formatDate(project.project_date) }}</dd>
                  </div>
                  <div v-if="project.category">
                    <dt class="text-sm font-medium text-gray-500 mb-1">Category</dt>
                    <dd class="text-gray-900">{{ project.category }}</dd>
                  </div>
                  <div v-if="project.technologies && project.technologies.length > 0">
                    <dt class="text-sm font-medium text-gray-500 mb-2">Technologies</dt>
                    <dd class="flex flex-wrap gap-2">
                      <span 
                        v-for="tech in project.technologies" 
                        :key="tech"
                        class="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm"
                      >
                        {{ tech }}
                      </span>
                    </dd>
                  </div>
                </div>
                
                <div class="mt-8 pt-8 border-t border-gray-200">
                  <router-link 
                    to="/projects"
                    class="text-primary-500 font-medium hover:text-primary-600 transition-colors duration-200"
                  >
                    ← Back to Projects
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <div v-else class="flex justify-center items-center h-96">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
        <p class="text-gray-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <router-link 
          to="/projects"
          class="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200"
        >
          Back to Projects
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue'

const route = useRoute()
const projectsStore = useProjectsStore()

const project = computed(() => projectsStore.currentProject)

const getImageUrl = (imagePath) => {
  return imagePath ? `/storage/${imagePath}` : '/images/placeholder-project.jpg'
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

onMounted(async () => {
  const projectId = route.params.id
  await projectsStore.fetchProject(projectId)
})
</script>