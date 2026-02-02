<template>
  <div class="admin-service-form">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center">
          <button
            @click="$router.go(-1)"
            class="mr-4 text-gray-400 hover:text-gray-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">
              {{ isEdit ? 'Edit Service' : 'Create New Service' }}
            </h1>
            <p class="mt-1 text-sm text-gray-500">
              {{ isEdit ? 'Update service information' : 'Add a new service to your portfolio' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Error Messages -->
      <div v-if="errors" class="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
        <div class="flex">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Please fix the following errors:</h3>
            <div class="mt-2 text-sm text-red-700">
              <ul class="list-disc space-y-1 pl-5">
                <li v-for="(error, field) in errors" :key="field">
                  <span class="font-medium">{{ field }}:</span> {{ Array.isArray(error) ? error[0] : error }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Service Information</h3>
              <p class="mt-1 text-sm text-gray-500">Basic information about the service.</p>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div class="grid grid-cols-6 gap-6">
                <!-- Title -->
                <div class="col-span-6">
                  <label for="title" class="block text-sm font-medium text-gray-700">
                    Title <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    v-model="form.title"
                    required
                    class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter service title"
                  />
                </div>

                <!-- Description -->
                <div class="col-span-6">
                  <label for="description" class="block text-sm font-medium text-gray-700">
                    Description <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    v-model="form.description"
                    rows="4"
                    required
                    class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter service description"
                  ></textarea>
                </div>

                <!-- Icon -->
                <div class="col-span-6 sm:col-span-3">
                  <label for="icon" class="block text-sm font-medium text-gray-700">
                    Icon Class
                  </label>
                  <input
                    type="text"
                    id="icon"
                    v-model="form.icon"
                    class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., fas fa-laptop-code"
                  />
                  <p class="mt-1 text-sm text-gray-500">CSS class for icon (Font Awesome, etc.)</p>
                </div>

                <!-- Sort Order -->
                <div class="col-span-6 sm:col-span-3">
                  <label for="sort_order" class="block text-sm font-medium text-gray-700">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    id="sort_order"
                    v-model.number="form.sort_order"
                    min="0"
                    class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="0"
                  />
                </div>

                <!-- Is Active -->
                <div class="col-span-6">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="is_active"
                        v-model="form.is_active"
                        type="checkbox"
                        class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="is_active" class="font-medium text-gray-700">Active</label>
                      <p class="text-gray-500">This service will be visible to visitors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Image Upload -->
        <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Service Image</h3>
              <p class="mt-1 text-sm text-gray-500">Upload an image to represent this service.</p>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <!-- Current Image -->
              <div v-if="currentImageUrl && !form.image" class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Current Image</label>
                <div class="relative">
                  <img
                    :src="currentImageUrl"
                    :alt="form.title"
                    class="h-32 w-48 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    @click="removeCurrentImage"
                    class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- File Upload -->
              <div class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="image"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload an image</span>
                      <input
                        id="image"
                        ref="imageInput"
                        type="file"
                        accept="image/*"
                        @change="handleImageUpload"
                        class="sr-only"
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                </div>
              </div>

              <!-- Preview New Image -->
              <div v-if="imagePreview" class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">New Image Preview</label>
                <div class="relative">
                  <img
                    :src="imagePreview"
                    :alt="form.title"
                    class="h-32 w-48 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    @click="removeNewImage"
                    class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="$router.go(-1)"
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="adminStore.loading"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <svg v-if="adminStore.loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ adminStore.loading ? 'Saving...' : (isEdit ? 'Update Service' : 'Create Service') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()

const isEdit = computed(() => !!route.params.id)
const serviceId = computed(() => route.params.id)

const form = reactive({
  title: '',
  description: '',
  icon: '',
  image: null,
  is_active: true,
  sort_order: 0
})

const errors = ref(null)
const imagePreview = ref(null)
const currentImageUrl = ref(null)
const imageInput = ref(null)

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file size (2MB)
  if (file.size > 2048 * 1024) {
    alert('Image size must be less than 2MB')
    return
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please select a valid image file')
    return
  }

  form.image = file

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const removeNewImage = () => {
  form.image = null
  imagePreview.value = null
  if (imageInput.value) {
    imageInput.value.value = ''
  }
}

const removeCurrentImage = () => {
  currentImageUrl.value = null
  // Set a flag to indicate image should be removed
  form.remove_image = true
}

const submitForm = async () => {
  try {
    errors.value = null
    
    const formData = { ...form }
    
    if (isEdit.value) {
      await adminStore.updateService(serviceId.value, formData)
    } else {
      await adminStore.createService(formData)
    }
    
    router.push('/admin/services')
  } catch (error) {
    if (error.response && error.response.status === 422) {
      errors.value = error.response.data.errors
    } else {
      errors.value = { general: 'An error occurred while saving the service' }
    }
  }
}

const loadService = async () => {
  if (!isEdit.value) return

  try {
    const service = await adminStore.fetchService(serviceId.value)
    if (service) {
      form.title = service.title || ''
      form.description = service.description || ''
      form.icon = service.icon || ''
      form.is_active = service.is_active ?? true
      form.sort_order = service.sort_order || 0
      
      if (service.image) {
        currentImageUrl.value = `http://localhost:8000/storage/${service.image}`
      }
    }
  } catch (error) {
    console.error('Error loading service:', error)
    router.push('/admin/services')
  }
}

onMounted(() => {
  if (isEdit.value) {
    loadService()
  }
})
</script>

<style scoped>
.admin-service-form {
  min-height: 100vh;
  background-color: #f9fafb;
}
</style>