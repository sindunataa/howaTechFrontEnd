<!-- src/views/About.vue -->
<template>
  <div class="min-h-screen pt-20">
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6" data-aos="fade-up">
            About {{ companyName }}
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            {{ companyDescription }}
          </p>
        </div>
      </div>
    </section>

    <!-- About Content -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div class="prose prose-lg text-gray-600" v-html="aboutContent"></div>
          </div>
          <div data-aos="fade-left">
            <img 
              src="/images/about-image.jpg" 
              alt="About Us" 
              class="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div class="text-center" data-aos="fade-up">
            <div class="w-16 h-16 bg-[#D97742] rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-bullseye text-2xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p class="text-gray-600 leading-relaxed">{{ companyMission }}</p>
          </div>
          <div class="text-center" data-aos="fade-up" data-aos-delay="200">
            <div class="w-16 h-16 bg-[#D97742] rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-eye text-2xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p class="text-gray-600 leading-relaxed">{{ companyVision }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-[#D97742] text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div data-aos="fade-up">
            <div class="text-4xl font-bold mb-2">100+</div>
            <div class="text-primary-100">Projects Completed</div>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <div class="text-4xl font-bold mb-2">50+</div>
            <div class="text-primary-100">Happy Clients</div>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <div class="text-4xl font-bold mb-2">5+</div>
            <div class="text-primary-100">Years Experience</div>
          </div>
          <div data-aos="fade-up" data-aos-delay="300">
            <div class="text-4xl font-bold mb-2">24/7</div>
            <div class="text-primary-100">Support</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useCompanyStore } from '@/stores/company'

const companyStore = useCompanyStore()

const companyName = computed(() => companyStore.companyName)
const companyDescription = computed(() => companyStore.companyDescription)
const aboutContent = computed(() => companyStore.info?.about_content || '')
const companyMission = computed(() => companyStore.info?.mission || '')
const companyVision = computed(() => companyStore.info?.vision || '')

onMounted(async () => {
  await companyStore.fetchCompanyInfo()
})
</script>