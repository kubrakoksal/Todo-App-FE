import SignUp from './components/SignUp.vue'
import LoginPage from './components/Login.vue'
import TodoListPage from './components/TodoListPage.vue'


import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: "LoginPage",
        component: LoginPage,
        path: "/"
    },
    {
        name: "SignUp",
        component: SignUp,
        path: "/signUp"
    },
    {
        name: "LoginPage",
        component: LoginPage,
        path: "/login"
    },
    {
        name: "TodoListPage",
        component: TodoListPage,
        path: "/todos"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;