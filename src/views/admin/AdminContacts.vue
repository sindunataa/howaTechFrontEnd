<template>
  <div class="admin-contacts">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Contact Messages</h1>
            <p class="mt-1 text-sm text-gray-500">View and manage contact messages from visitors</p>
          </div>
          <div class="flex items-center space-x-3">
            <div class="text-sm text-gray-500">
              <span class="font-medium">{{ unreadCount }}</span> unread messages
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="adminStore.loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
        <p class="mt-2 text-sm text-gray-500">Loading messages...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="adminStore.error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
        <div class="flex">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error</h3>
            <p class="mt-1 text-sm text-red-700">{{ adminStore.error }}</p>
          </div>
        </div>
      </div>

      <!-- Contacts Table -->
      <div v-else class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              All Messages ({{ adminStore.pagination.contacts.total || 0 }})
            </h3>
          </div>

          <!-- Empty State -->
          <div v-if="adminStore.contacts.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No messages</h3>
            <p class="mt-1 text-sm text-gray-500">No contact messages have been received yet.</p>
          </div>

          <!-- Messages List -->
          <div v-else class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject & Message
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr 
                  v-for="contact in adminStore.contacts" 
                  :key="contact.id" 
                  :class="[
                    'hover:bg-gray-50',
                    !contact.is_read ? 'bg-blue-50' : ''
                  ]"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-8 w-8">
                        <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ contact.name }}</div>
                        <div class="text-sm text-gray-500">{{ contact.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900 font-medium">{{ contact.subject }}</div>
                    <div class="text-sm text-gray-500 mt-1">
                      {{ contact.message.length > 100 ? contact.message.substring(0, 100) + '...' : contact.message }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{{ formatDate(contact.created_at) }}</div>
                    <div class="text-xs text-gray-400">{{ formatTime(contact.created_at) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex flex-col space-y-1">
                      <span 
                        :class="[
                          contact.is_read 
                            ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'
                            : 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'
                        ]"
                      >
                        <div 
                          :class="[
                            contact.is_read ? 'bg-green-400' : 'bg-yellow-400',
                            'flex-shrink-0 w-1.5 h-1.5 rounded-full mr-1.5'
                          ]"
                        ></div>
                        {{ contact.is_read ? 'Read' : 'Unread' }}
                      </span>
                      <div v-if="contact.is_read && contact.read_at" class="text-xs text-gray-400">
                        Read {{ formatDate(contact.read_at) }}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex justify-end space-x-2">
                      <router-link
                        :to="`/admin/contacts/${contact.id}`"
                        class="text-yellow-600 hover:text-yellow-900"
                      >
                        View
                      </router-link>
                      <button
                        v-if="!contact.is_read"
                        @click="markAsRead(contact.id)"
                        class="text-green-600 hover:text-green-900"
                      >
                        Mark Read
                      </button>
                      <button
                        @click="confirmDelete(contact)"
                        class="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div v-if="adminStore.pagination.contacts.last_page > 1" class="mt-6 flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                @click="loadPage(adminStore.pagination.contacts.current_page - 1)"
                :disabled="adminStore.pagination.contacts.current_page === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                @click="loadPage(adminStore.pagination.contacts.current_page + 1)"
                :disabled="adminStore.pagination.contacts.current_page === adminStore.pagination.contacts.last_page"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing <span class="font-medium">{{ ((adminStore.pagination.contacts.current_page - 1) * adminStore.pagination.contacts.per_page) + 1 }}</span>
                  to <span class="font-medium">{{ Math.min(adminStore.pagination.contacts.current_page * adminStore.pagination.contacts.per_page, adminStore.pagination.contacts.total) }}</span>
                  of <span class="font-medium">{{ adminStore.pagination.contacts.total }}</span> results
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    @click="loadPage(adminStore.pagination.contacts.current_page - 1)"
                    :disabled="adminStore.pagination.contacts.current_page === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  
                  <button
                    v-for="page in getPageNumbers()"
                    :key="page"
                    @click="loadPage(page)"
                    :class="[
                      page === adminStore.pagination.contacts.current_page
                        ? 'z-10 bg-yellow-50 border-yellow-500 text-yellow-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                    ]"
                  >
                    {{ page }}
                  </button>
                  
                  <button
                    @click="loadPage(adminStore.pagination.contacts.current_page + 1)"
                    :disabled="adminStore.pagination.contacts.current_page === adminStore.pagination.contacts.last_page"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mt-2">Delete Message</h3>
          <p class="text-sm text-gray-500 mt-2">
            Are you sure you want to delete this message from {{ contactToDelete?.name }}? This action cannot be undone.
          </p>
          <div class="flex justify-center space-x-3 mt-4">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 bg-white text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Cancel
            </button>
            <button
              @click="deleteContact"
              :disabled="adminStore.loading"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              <span v-if="adminStore.loading">Deleting...</span>
              <span v-else>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()

const showDeleteModal = ref(false)
const contactToDelete = ref(null)

const unreadCount = computed(() => {
  return adminStore.contacts?.filter(contact => !contact.is_read).length || 0
})

const confirmDelete = (contact) => {
  contactToDelete.value = contact
  showDeleteModal.value = true
}

const deleteContact = async () => {
  if (!contactToDelete.value) return
  
  try {
    await adminStore.deleteContact(contactToDelete.value.id)
    showDeleteModal.value = false
    contactToDelete.value = null
  } catch (error) {
    console.error('Error deleting contact:', error)
  }
}

const markAsRead = async (contactId) => {
  try {
    await adminStore.markContactAsRead(contactId)
  } catch (error) {
    console.error('Error marking contact as read:', error)
  }
}

const loadPage = async (page) => {
  if (page < 1 || page > adminStore.pagination.contacts.last_page) return
  await adminStore.fetchContacts(page)
}

const getPageNumbers = () => {
  const current = adminStore.pagination.contacts.current_page
  const last = adminStore.pagination.contacts.last_page
  const pages = []
  
  const start = Math.max(1, current - 2)
  const end = Math.min(last, current + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatTime = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  adminStore.fetchContacts()
})
</script>

<style scoped>
.admin-contacts {
  min-height: 100vh;
  background-color: #f9fafb;
}
</style>