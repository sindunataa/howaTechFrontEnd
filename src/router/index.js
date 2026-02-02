// src/router/index.js - Router lengkap dengan admin routes
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Services from '@/views/Services.vue'
import Projects from '@/views/Projects.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'
import Team from '@/views/Team.vue'
import Contact from '@/views/Contact.vue'

// Admin Components
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminServices from '@/views/admin/AdminServices.vue'
import AdminServiceForm from '@/views/admin/AdminServiceForm.vue'
import AdminProjects from '@/views/admin/AdminProjects.vue'
import AdminProjectForm from '@/views/admin/AdminProjectForm.vue'
import AdminContacts from '@/views/admin/AdminContacts.vue'
import AdminContactDetail from '@/views/admin/AdminContactDetail.vue'

const routes = [
  // Public Routes
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About Us'
    }
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
    meta: {
      title: 'Our Services'
    }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: {
      title: 'Our Projects'
    }
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: ProjectDetail,
    meta: {
      title: 'Project Detail'
    }
  },
  {
    path: '/team',
    name: 'Team',
    component: Team,
    meta: {
      title: 'Our Team'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contact Us'
    }
  },
  
  // Admin Routes
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: {
      title: 'Admin Dashboard',
      requiresAuth: true,
      isAdmin: true
    }
  },
  
  // Services Management
  {
    path: '/admin/services',
    name: 'AdminServices',
    component: AdminServices,
    meta: {
      title: 'Manage Services',
      requiresAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/admin/services/create',
    name: 'AdminServiceCreate',
    component: AdminServiceForm,
    meta: {
      title: 'Create Service',
      requiresAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/admin/services/:id/edit',
    name: 'AdminServiceEdit',
    component: AdminServiceForm,
    meta: {
      title: 'Edit Service',
      requiresAuth: true,
      isAdmin: true
    }
  },
  
  // Projects Management
  {
    path: '/admin/projects',
    name: 'AdminProjects',
    component: AdminProjects,
    meta: {
      title: 'Manage Projects',
      requiresAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/admin/projects/create',
    name: 'AdminProjectCreate',
    component: AdminProjectForm,
    meta: {
      title: 'Create Project',
      requiresAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/admin/projects/:id/edit',
    name: 'AdminProjectEdit',
    component: AdminProjectForm,
    meta: {
      title: 'Edit Project',
      requiresAuth: true,
      isAdmin: true
    }
  },
  
  // Contacts Management
  {
    path: '/admin/contacts',
    name: 'AdminContacts',
    component: AdminContacts,
    meta: {
      title: 'Contact Messages',
      requiresAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/admin/contacts/:id',
    name: 'AdminContactDetail',
    component: AdminContactDetail,
    meta: {
      title: 'Contact Message Detail',
      requiresAuth: true,
      isAdmin: true
    }
  },

  // 404 Route
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  // Update page title
  const baseTitle = 'Company Profile'
  document.title = to.meta.title ? `${to.meta.title} - ${baseTitle}` : baseTitle
  
  // Check if route requires authentication (for future implementation)
  if (to.meta.requiresAuth) {
    // Here you would typically check authentication status
    // For now, we'll allow access to admin routes
    // In production, implement proper authentication check
    console.log('Admin route accessed:', to.path)
  }
  
  // Check if route is admin route
  if (to.meta.isAdmin) {
    // Here you would typically check if user has admin privileges
    // For now, we'll allow access
    // In production, implement proper authorization check
    console.log('Admin route accessed:', to.path)
  }
  
  next()
})

// Error handling for navigation
router.onError((error) => {
  console.error('Navigation error:', error)
})

export default router