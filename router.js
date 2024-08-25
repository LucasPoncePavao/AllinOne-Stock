// Importa a função createRouter do pacote Vue-Router
import { createRouter, createMemoryHistory } from 'vue-router'

// Importando componente
import Dashboard from '../views/TelaDashboard.java'
import Estoque from '../views/TelaEstoque.java'
import Login from '../views/TelaLogin.java'

// Cria a intância da rota
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/:notFound(.*)', redirect: '/dashboard' },
    { path: '/', redirect: '/dashboard' },

    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      props: true,
    },
    { path: '/login', component: Login },
    { path: '/estoque', name: 'Estoque', component: Estoque, props: true },
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0, behavior: 'smooth' }
  },
})

export default router
