<!-- src/views/Contact.vue -->
<template>
  <div class="min-h-screen pt-20">
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6" data-aos="fade-up">
          Get In Touch
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          Ready to start your next project? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div data-aos="fade-right">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  id="name"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  v-model="form.subject"
                  type="text"
                  id="subject"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  v-model="form.message"
                  id="message"
                  rows="6"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                :disabled="contactStore.loading"
                class="w-full bg-primary-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="contactStore.loading">
                  <i class="fas fa-spinner fa-spin mr-2"></i>
                  Sending...
                </span>
                <span v-else>
                  Send Message
                  <i class="fas fa-paper-plane ml-2"></i>
                </span>
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div data-aos="fade-left">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
            
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-map-marker-alt text-primary-500"></i>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900 mb-1">Address</h3>
                  <p class="text-gray-600">{{ companyAddress }}</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-phone text-primary-500"></i>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900 mb-1">Phone</h3>
                  <a :href="`tel:${companyPhone}`" class="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                    {{ companyPhone }}
                  </a>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-envelope text-primary-500"></i>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900 mb-1">Email</h3>
                  <a :href="`mailto:${companyEmail}`" class="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                    {{ companyEmail }}
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Social Links -->
            <div class="mt-12">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Follow Us</h3>
              <div class="flex space-x-4">
                <a
                  v-for="(url, platform) in socialLinks"
                  :key="platform"
                  :href="url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-colors duration-200"
                >
                  <i :class="getSocialIcon(platform)"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from 'vue'
import { useCompanyStore } from '@/stores/company'
import { useContactStore } from '@/stores/contact'
import { toast } from 'vue3-toastify'

const companyStore = useCompanyStore()
const contactStore = useContactStore()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const companyAddress = computed(() => companyStore.companyAddress)
const companyPhone = computed(() => companyStore.companyPhone)
const companyEmail = computed(() => companyStore.companyEmail)
const socialLinks = computed(() => companyStore.socialLinks)

const submitForm = async () => {
  try {
    await contactStore.sendMessage(form)
    toast.success('Message sent successfully! We\'ll get back to you soon.')
    
    // Reset form
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (error) {
    toast.error(contactStore.error || 'Failed to send message. Please try again.')
  }
}

const getSocialIcon = (platform) => {
  const icons = {
    facebook: 'fab fa-facebook',
    twitter: 'fab fa-twitter',
    instagram: 'fab fa-instagram',
    linkedin: 'fab fa-linkedin',
    youtube: 'fab fa-youtube',
  }
  return icons[platform] || 'fas fa-link'
}

onMounted(async () => {
  await companyStore.fetchCompanyInfo()
})
</script>