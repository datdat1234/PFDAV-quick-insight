import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/ProjectView.vue'
import AdminView from '../views/AdminView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { site } from '../data/site.config.js'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/projects/:slug', name: 'project', component: ProjectView },
  { path: '/admin', name: 'admin', component: AdminView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      // Wait past the route fade transition (200ms, mode="out-in" in App.vue)
      // so the target element exists in the new page before we scroll to it.
      return new Promise((resolve) => {
        setTimeout(() => resolve({ el: to.hash, behavior: 'smooth' }), 300)
      })
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.name === 'project') {
    const project = site.projects.find((p) => p.slug === to.params.slug)
    document.title = project ? `${project.title} – ${site.group}` : `Not found – ${site.group}`
  } else if (to.name === 'home') {
    document.title = `${site.course} – ${site.group}`
  } else if (to.name === 'admin') {
    document.title = `Edit content – ${site.group}`
  } else {
    document.title = `Not found – ${site.group}`
  }
})
