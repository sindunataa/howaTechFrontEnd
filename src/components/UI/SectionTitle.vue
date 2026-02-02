<!-- src/components/UI/SectionTitle.vue -->
<template>
  <div class="text-center mb-16" data-aos="fade-up">
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-xl text-gray-600 max-w-2xl mx-auto">
      {{ subtitle }}
    </p>
    <div class="w-20 h-1 bg-[#FF6500] mx-auto mt-6"></div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>