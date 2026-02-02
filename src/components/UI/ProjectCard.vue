<!-- src/components/UI/ProjectCard.vue -->
<template>
  <div 
    class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
    data-aos="fade-up"
    :data-aos-delay="delay"
  >
    <div class="relative overflow-hidden">
      <img 
        :src="`http://localhost:8000/storage/${project.image}`" 
        :alt="project.title"
        class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
        <router-link 
          :to="`/projects/${project.id}`"
          class="bg-white text-[#D97742] px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#D97742] hover:text-white"
        >
          View Details
        </router-link>
      </div>
    </div>
    <div class="p-6">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-[#D97742] font-medium">{{ project.category }}</span>
        <span v-if="project.is_featured" class="bg-[#D97742] text-white text-xs px-2 py-1 rounded-full">Featured</span>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ project.title }}</h3>
      <p class="text-gray-600 mb-4">{{ shortDesc }}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tech in project.technologies?.slice(0, 3)" 
          :key="tech"
          class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
        >
          {{ tech }}
        </span>
      </div>
      <router-link 
        :to="`/projects/${project.id}`"
        class="text-[#D97742] font-medium hover:text-orange-600 transition-colors duration-200"
      >
        Learn More →
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// simpan props ke variabel
const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  delay: {
    type: String,
    default: '0'
  }
})

const getImageUrl = (imagePath) => {
  return imagePath ? `/storage/${imagePath}` : '/images/placeholder-project.jpg'
}

// computed untuk deskripsi pendek
const shortDesc = computed(() => {
  if (!props.project.short_description) return ''
  return props.project.short_description.length > 250
    ? props.project.short_description.substring(0, 250) + '...'
    : props.project.short_description
})
</script>