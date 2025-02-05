import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../types/user-data';

export const useUserStore = defineStore('userStore', () => {
  const localUsers = ref<User[]>([]);

  // Load from localStorage
  function loadUsersFromStorage() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      localUsers.value = JSON.parse(storedUsers) as User[];
    }
  }

  // Save to localStorage
  function saveUsersToStorage(users: User[]) {
    localUsers.value = users;
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Clear localStorage
  function clearUsersFromStorage() {
    localStorage.removeItem('users');
    localUsers.value = [];
  }

  return {
    localUsers,
    loadUsersFromStorage,
    saveUsersToStorage,
    clearUsersFromStorage,
  };
});
