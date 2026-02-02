<!-- src/components/UI/ServiceCard.vue -->
<template>
  <div 
    class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center group hover:-translate-y-2"
    data-aos="fade-up"
    :data-aos-delay="delay"
  >
    <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#D97742] transition-colors duration-300">
      <i :class="service.icon" class="text-2xl text-[#D97742] group-hover:text-white transition-colors duration-300"></i>
    </div>
    <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ service.title }}</h3>
    <p class="text-gray-600 leading-relaxed">{{ service.description }}</p>
  </div>
</template>

<script setup>
defineProps({
  service: {
    type: Object,
    required: true
  },
  delay: {
    type: String,
    default: '0'
  }
})
</script>