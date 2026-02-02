<!-- src/components/UI/LoadingSpinner.vue -->
<template>
  <div class="flex justify-center items-center" :class="containerClass">
    <div class="animate-spin rounded-full border-4 border-gray-200 border-t-primary-500" :class="spinnerClass"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

const containerClass = computed(() => {
  const sizes = {
    small: 'h-8',
    medium: 'h-16',
    large: 'h-32'
  }
  return sizes[props.size]
})

const spinnerClass = computed(() => {
  const sizes = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-24 w-24'
  }
  return sizes[props.size]
})
</script>