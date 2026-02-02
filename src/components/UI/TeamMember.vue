<!-- src/components/UI/TeamMember.vue -->
<template>
  <div 
    class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
    data-aos="fade-up"
    :data-aos-delay="delay"
  >
    <div class="relative overflow-hidden">
      <img 
        :src="getImageUrl(member.image)" 
        :alt="member.name"
        class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="absolute bottom-4 left-4 right-4">
          <div class="flex space-x-3">
            <a
              v-for="(url, platform) in member.social_links"
              :key="platform"
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-100 hover:text-gray-900 transition-all duration-200"
            >
              <i :class="getSocialIcon(platform)" class="text-sm"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="p-6 text-center">
      <h3 class="text-xl font-semibold text-gray-900 mb-1">{{ member.name }}</h3>
      <p class="text-primary-500 font-medium mb-3">{{ member.position }}</p>
      <p class="text-gray-600 text-sm leading-relaxed">{{ member.bio }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  member: {
    type: Object,
    required: true
  },
  delay: {
    type: String,
    default: '0'
  }
})

const getImageUrl = (imagePath) => {
  return imagePath ? `/storage/${imagePath}` : '/images/placeholder-avatar.jpg'
}

const getSocialIcon = (platform) => {
  const icons = {
    facebook: 'fab fa-facebook',
    twitter: 'fab fa-twitter',
    instagram: 'fab fa-instagram',
    linkedin: 'fab fa-linkedin',
    github: 'fab fa-github',
    dribbble: 'fab fa-dribbble',
    behance: 'fab fa-behance',
  }
  return icons[platform] || 'fas fa-link'
}
</script>