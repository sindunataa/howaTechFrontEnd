<!-- src/components/Layout/Footer.vue -->
<template>
  <footer class="bg-[#4E6E66] text-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="col-span-1 md:col-span-2">
          <h3 class="text-2xl font-bold text-white mb-4">{{ companyName }}</h3>
          <p class="text-gray-300 mb-4">{{ companyDescription }}</p>
          <div class="flex space-x-4">
            <a
              v-for="(url, platform) in socialLinks"
              :key="platform"
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <i :class="getSocialIcon(platform)" class="text-xl"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="item in navigation" :key="item.name">
              <router-link
                :to="item.href"
                class="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">Contact Info</h4>
          <div class="space-y-2">
            <p class="text-gray-300">
              <i class="fas fa-map-marker-alt mr-2"></i>
              {{ companyAddress }}
            </p>
            <p class="text-gray-300">
              <i class="fas fa-phone mr-2"></i>
              {{ companyPhone }}
            </p>
            <p class="text-gray-300">
              <i class="fas fa-envelope mr-2"></i>
              {{ companyEmail }}
            </p>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-8 text-center">
        <p class="text-gray-400">
          &copy; {{ currentYear }} {{ companyName }}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCompanyStore } from '@/stores/company'

const companyStore = useCompanyStore()
const mobileMenuOpen = ref(false)

const companyName = computed(() => companyStore.companyName)

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Team', href: '/team' },
  { name: 'Contact', href: '/contact' },
]
</script>