<!-- src/views/Home.vue -->
<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-[url('/images/bg-hero.png')] bg-cover bg-[center_60%] text-white py-20 mt-20 overflow-hidden">
      <div class="absolute inset-0 bg-black/40 shadow-inner"></div>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6" data-aos="fade-up">
            {{ heroTitle }}
          </h1>
          <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            {{ heroSubtitle }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="400">
            <router-link 
              to="/services" 
              class="bg-white text-[#FF6700] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Our Services
            </router-link>
            <router-link 
              to="/contact" 
              class="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#FF6700] transition-colors duration-200"
            >
              Get In Touch
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Services Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Our Services" 
          subtitle="We provide comprehensive solutions to help your business grow"
        />
        
        <div v-if="servicesStore.loading" class="text-center">
          <LoadingSpinner size="large" />
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            v-for="(service, index) in featuredServices" 
            :key="service.id"
            :service="service"
            :delay="(index * 100).toString()"
          />
        </div>
        
        <div class="text-center mt-12" data-aos="fade-up">
          <router-link 
            to="/services" 
            class="bg-[#D97742] text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
          >
            View All Services
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Featured Projects" 
          subtitle="Take a look at some of our best work"
        />
        
        <div v-if="projectsStore.loading" class="text-center">
          <LoadingSpinner size="large" />
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard 
            v-for="(project, index) in projectsStore.featuredProjects" 
            :key="project.id"
            :project="project"
            :delay="(index * 100).toString()"
          />
        </div>
        
        <div class="text-center mt-12" data-aos="fade-up">
          <router-link 
            to="/projects" 
            class="bg-[#D97742] text-[#FFF] px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
          >
            View All Projects
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-[#D97742] text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6" data-aos="fade-up">
          Ready to Start Your Project?
        </h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          Let's work together to bring your ideas to life. Contact us today for a free consultation.
        </p>
        <router-link 
          to="/contact" 
          class="bg-white text-[#D97742] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
          data-aos="fade-up" 
          data-aos-delay="400"
        >
          Start Your Project
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useCompanyStore } from '@/stores/company'
import { useServicesStore } from '@/stores/services'
import { useProjectsStore } from '@/stores/projects'
import SectionTitle from '@/components/UI/SectionTitle.vue'
import ServiceCard from '@/components/UI/ServiceCard.vue'
import ProjectCard from '@/components/UI/ProjectCard.vue'
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue'

const companyStore = useCompanyStore()
const servicesStore = useServicesStore()
const projectsStore = useProjectsStore()

const heroTitle = computed(() => companyStore.heroTitle)
const heroSubtitle = computed(() => companyStore.heroSubtitle)
const featuredServices = computed(() => (servicesStore.services || []).slice(0, 6))

onMounted(async () => {
  await companyStore.fetchCompanyInfo()
  await servicesStore.fetchServices()
  await projectsStore.fetchFeaturedProjects()
})
</script>