<!-- src/views/Services.vue -->
<template>
  <div class="min-h-screen pt-20">
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6" data-aos="fade-up">
          Our Services
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          We offer a comprehensive range of services to help your business succeed in the digital world.
        </p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="servicesStore.loading" class="text-center">
          <LoadingSpinner size="large" />
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            v-for="(service, index) in servicesStore.services" 
            :key="service.id"
            :service="service"
            :delay="(index * 100).toString()"
          />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-[#D97742] text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6" data-aos="fade-up">
          Need a Custom Solution?
        </h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          We're here to help you find the perfect solution for your unique needs.
        </p>
        <router-link 
          to="/contact" 
          class="bg-white text-[#D97742] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
          data-aos="fade-up" 
          data-aos-delay="400"
        >
          Get In Touch
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useServicesStore } from '@/stores/services'
import ServiceCard from '@/components/UI/ServiceCard.vue'
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue'

const servicesStore = useServicesStore()

onMounted(async () => {
  await servicesStore.fetchServices()
})
</script>