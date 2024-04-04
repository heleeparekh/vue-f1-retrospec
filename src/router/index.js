// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue'; // The @ is an alias to /src
import DriverList from '@/components/DriverList.vue';

// Define routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Drivers',
    name: 'Drivers',
    component: DriverList
  },
  // Define more routes as needed
];

// Create router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Use browser history
  routes
});

export default router;
