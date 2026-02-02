<!-- src/views/Projects.vue -->
<template>
  <div class="min-h-screen pt-20">
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6" data-aos="fade-up">
          Our Projects
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          Explore our portfolio of successful projects and see how we've helped businesses achieve their goals.
        </p>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="py-8 bg-white border-b">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center gap-4">
          <button 
            @click="selectedCategory = 'All'"
            :class="[
              'px-6 py-2 rounded-full font-medium transition-colors duration-200',
              selectedCategory === 'All' 
                ? 'bg-[#D97742] text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-primary-100'
            ]"
          >
            All Projects
          </button>
          <button 
            v-for="category in categories" 
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-6 py-2 rounded-full font-medium transition-colors duration-200',
              selectedCategory === category 
                ? 'bg-[#D97742] text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-primary-100'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="projectsStore.loading" class="text-center">
          <LoadingSpinner size="large" />
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard 
            v-for="(project, index) in filteredProjects" 
            :key="project.id"
            :project="project"
            :delay="(index * 100).toString()"
          />
        </div>
        
        <div v-if="filteredProjects.length === 0 && !projectsStore.loading" class="text-center py-12">
          <p class="text-gray-500 text-lg">No projects found in this category.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import ProjectCard from '@/components/UI/ProjectCard.vue'
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue'

const projectsStore = useProjectsStore()
const selectedCategory = ref('All')

const categories = computed(() => {
  const cats = [...new Set(projectsStore.projects.map(p => p.category).filter(Boolean))]
  return cats
})

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return projectsStore.projects
  }
  return projectsStore.projects.filter(project => project.category === selectedCategory.value)
})

onMounted(async () => {
  await projectsStore.fetchProjects()
})
</script>