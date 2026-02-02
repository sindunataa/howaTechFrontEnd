<template>
  <div class="admin-project-form">
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
              {{ isEdit ? 'Edit Project' : 'Create New Project' }}
            </h1>
            <p class="mt-1 text-sm text-gray-500">
              {{ isEdit ? 'Update project information' : 'Add a new project to your portfolio' }}
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
        <!-- Basic Information -->
        <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Project Information</h3>
              <p class="mt-1 text-sm text-gray-500">Basic details about the project.</p>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div class="grid grid-cols-6 gap-6">
                <!-- Title -->
                <div class="col-span-6">
                  <label for="title" class="block text-sm font-medium text-gray-700">
                    Project Title <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    v-model="form.title"
                    required
                    class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter project title"
                  />
                </div>

                <!-- Short Description -->
                <div class="col-span-6">
                  <label for="short_description" class="block text-sm font-medium text-gray-700">
                    Short Description
                  </label>
                  <input
                    type="text"
                    id="short_description"
                    v-model="form.short_description"
                    class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Brief project summary"
                  />
                  <p class="mt-1 text-sm text-gray-500">Brief summary for cards and previews</p>
                </div>

                <!-- Full Description -->
                <div class="col-span-6">
                  <label for="description" class="block text-sm font-medium text-gray-700">
                    Full Description <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    v-model="form.description"
                    rows="5"
                    required
                    class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Detailed project description"
                  ></textarea>
                </div>

                <!-- Client and Category -->
                <div class="col-span-6 sm:col-span-3">
                  <label for="client" class="block text-sm font-medium text-gray-700">
                    Client
                  </label>
                  <input
                    type="text"
                    id="client"
                    v-model="form.client"
                    class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Client name"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="category" class="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    v-model="form.category"
                    class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., Web Development"
                  />
                </div>

                <!-- Project Date and URL -->
                <div class="col-span-6 sm:col-span-3">
                  <label for="project_date" class="block text-sm font-medium text-gray-700">
                    Project Date
                  </label>
                  <input
                    type="date"
                    id="project_date"
                    v-model="form.project_date"
                    class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="url" class="block text-sm font-medium text-gray-700">
                    Project URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    v-model="form.url"
                    class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="https://example.com"
                  />
                </div>

                <!-- Sort Order -->
                <div class="col-span-6 sm:col-span-2">
                  <label for="sort_order" class="block text-sm font-medium text-gray-700">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    id="sort_order"
                    v-model.number="form.sort_order"
                    min="0"
                    class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="0"
                  />
                </div>

                <!-- Checkboxes -->
                <div class="col-span-6 sm:col-span-4">
                  <div class="space-y-3">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="is_featured"
                          v-model="form.is_featured"
                          type="checkbox"
                          class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="is_featured" class="font-medium text-gray-700">Featured Project</label>
                        <p class="text-gray-500">Display this project prominently</p>
                      </div>
                    </div>

                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="is_active"
                          v-model="form.is_active"
                          type="checkbox"
                          class="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="is_active" class="font-medium text-gray-700">Active</label>
                        <p class="text-gray-500">This project will be visible to visitors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Technologies -->
        <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Technologies</h3>
              <p class="mt-1 text-sm text-gray-500">Technologies used in this project.</p>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <div class="space-y-3">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(tech, index) in form.technologies"
                    :key="index"
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {{ tech }}
                    <button
                      type="button"
                      @click="removeTechnology(index)"
                      class="ml-2 inline-flex items-center p-0.5 text-blue-400 hover:text-blue-600"
                    >
                      <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </span>
                </div>
                <div class="flex">
                  <input
                    type="text"
                    v-model="newTechnology"
                    @keydown.enter.prevent="addTechnology"
                    class="flex-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-l-md"
                    placeholder="Enter technology name"
                  />
                  <button
                    type="button"
                    @click="addTechnology"
                    class="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 shadow-sm text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Image -->
        <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Main Image</h3>
              <p class="mt-1 text-sm text-gray-500">Primary image for the project {{ !isEdit ? '(Required)' : '' }}.</p>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <!-- Current Image -->
              <div v-if="currentMainImageUrl && !form.image" class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Current Image</label>
                <div class="relative">
                  <img
                    :src="currentMainImageUrl"
                    :alt="form.title"
                    class="h-48 w-full object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    @click="removeCurrentMainImage"
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
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="main_image" class="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                      <span>Upload main image</span>
                      <input
                        id="main_image"
                        ref="mainImageInput"
                        type="file"
                        accept="image/*"
                        @change="handleMainImageUpload"
                        class="sr-only"
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                </div>
              </div>

              <!-- Preview New Main Image -->
              <div v-if="mainImagePreview" class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">New Image Preview</label>
                <div class="relative">
                  <img :src="mainImagePreview" :alt="form.title" class="h-48 w-full object-cover rounded-lg border" />
                  <button
                    type="button"
                    @click="removeNewMainImage"
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

        <!-- Gallery Images -->
        <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Gallery Images</h3>
              <p class="mt-1 text-sm text-gray-500">Additional images for the project gallery.</p>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <!-- Current Gallery -->
              <div v-if="currentGalleryImages.length > 0" class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Current Gallery</label>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div v-for="(image, index) in currentGalleryImages" :key="index" class="relative">
                    <img :src="`http://localhost:8000/storage/${image}`" :alt="`Gallery ${index + 1}`" class="h-24 w-full object-cover rounded-lg border" />
                    <button
                      type="button"
                      @click="removeCurrentGalleryImage(index)"
                      class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- File Upload -->
              <div class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="gallery_images" class="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                      <span>Upload gallery images</span>
                      <input
                        id="gallery_images"
                        ref="galleryInput"
                        type="file"
                        multiple
                        accept="image/*"
                        @change="handleGalleryUpload"
                        class="sr-only"
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 2MB each, multiple files allowed</p>
                </div>
              </div>

              <!-- Preview New Gallery Images -->
              <div v-if="galleryPreviews.length > 0" class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">New Gallery Images</label>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div v-for="(preview, index) in galleryPreviews" :key="index" class="relative">
                    <img :src="preview" :alt="`New Gallery ${index + 1}`" class="h-24 w-full object-cover rounded-lg border" />
                    <button
                      type="button"
                      @click="removeNewGalleryImage(index)"
                      class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
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
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="adminStore.loading"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            <svg v-if="adminStore.loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ adminStore.loading ? 'Saving...' : (isEdit ? 'Update Project' : 'Create Project') }}
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
const projectId = computed(() => route.params.id)

const form = reactive({
  title: '',
  description: '',
  short_description: '',
  image: null,
  gallery: [],
  client: '',
  project_date: '',
  category: '',
  url: '',
  technologies: [],
  is_featured: false,
  is_active: true,
  sort_order: 0
})

const errors = ref(null)
const newTechnology = ref('')
const mainImagePreview = ref(null)
const galleryPreviews = ref([])
const currentMainImageUrl = ref(null)
const currentGalleryImages = ref([])

// Image handling
const handleMainImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (file.size > 2048 * 1024) {
    alert('Image size must be less than 2MB')
    return
  }

  if (!file.type.startsWith('image/')) {
    alert('Please select a valid image file')
    return
  }

  form.image = file

  const reader = new FileReader()
  reader.onload = (e) => {
    mainImagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const handleGalleryUpload = (event) => {
  const files = Array.from(event.target.files)
  if (!files.length) return

  files.forEach(file => {
    if (file.size > 2048 * 1024) {
      alert(`${file.name} is too large. Maximum size is 2MB`)
      return
    }

    if (!file.type.startsWith('image/')) {
      alert(`${file.name} is not a valid image file`)
      return
    }

    form.gallery.push(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      galleryPreviews.value.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

const removeNewMainImage = () => {
  form.image = null
  mainImagePreview.value = null
  if (adminStore.mainImageInput) {
    adminStore.mainImageInput.value = ''
  }
}

const removeNewGalleryImage = (index) => {
  form.gallery.splice(index, 1)
  galleryPreviews.value.splice(index, 1)
}

const removeCurrentMainImage = () => {
  currentMainImageUrl.value = null
  form.remove_main_image = true
}

const removeCurrentGalleryImage = (index) => {
  currentGalleryImages.value.splice(index, 1)
  form.remove_gallery_images = form.remove_gallery_images || []
  form.remove_gallery_images.push(index)
}

// Technology handling
const addTechnology = () => {
  if (newTechnology.value.trim() && !form.technologies.includes(newTechnology.value.trim())) {
    form.technologies.push(newTechnology.value.trim())
    newTechnology.value = ''
  }
}

const removeTechnology = (index) => {
  form.technologies.splice(index, 1)
}

const submitForm = async () => {
  try {
    errors.value = null
    
    const formData = { ...form }
    
    if (isEdit.value) {
      await adminStore.updateProject(projectId.value, formData)
    } else {
      await adminStore.createProject(formData)
    }
    
    router.push('/admin/projects')
  } catch (error) {
    if (error.response && error.response.status === 422) {
      errors.value = error.response.data.errors
    } else {
      errors.value = { general: 'An error occurred while saving the project' }
    }
  }
}

const loadProject = async () => {
  if (!isEdit.value) return

  try {
    const project = await adminStore.fetchProject(projectId.value)
    if (project) {
      Object.keys(form).forEach(key => {
        if (project[key] !== undefined) {
          form[key] = project[key]
        }
      })
      
      // Handle arrays
      form.technologies = project.technologies || []
      form.gallery = [] // Reset gallery for new uploads
      
      // Set current images
      if (project.image) {
        currentMainImageUrl.value = `http://localhost:8000/storage/${project.image}`
      }
      if (project.gallery && Array.isArray(project.gallery)) {
        currentGalleryImages.value = [...project.gallery]
      }
      
      // Format date
      if (project.project_date) {
        form.project_date = new Date(project.project_date).toISOString().split('T')[0]
      }
    }
  } catch (error) {
    console.error('Error loading project:', error)
    router.push('/admin/projects')
  }
}

onMounted(() => {
  if (isEdit.value) {
    loadProject()
  }
})
</script>

<style scoped>
.admin-project-form {
  min-height: 100vh;
  background-color: #f9fafb;
}
</style>