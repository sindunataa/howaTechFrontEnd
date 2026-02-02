<!-- src/views/Team.vue -->
<template>
  <div class="min-h-screen pt-20">
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6" data-aos="fade-up">
          Meet Our Team
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          Our talented team of professionals is dedicated to delivering exceptional results and building lasting relationships with our clients.
        </p>
      </div>
    </section>

    <!-- Team Grid -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="teamStore.loading" class="text-center">
          <LoadingSpinner size="large" />
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <TeamMember 
            v-for="(member, index) in teamStore.team" 
            :key="member.id"
            :member="member"
            :delay="(index * 100).toString()"
          />
        </div>
      </div>
    </section>

    <!-- Join Team CTA -->
    <section class="py-20 bg-primary-600 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6" data-aos="fade-up">
          Want to Join Our Team?
        </h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          We're always looking for talented individuals to join our growing team. Check out our current openings or send us your resume.
        </p>
        <router-link 
          to="/contact" 
          class="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
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
import { useTeamStore } from '@/stores/team'
import TeamMember from '@/components/UI/TeamMember.vue'
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue'

const teamStore = useTeamStore()

onMounted(async () => {
  await teamStore.fetchTeam()
})
</script>