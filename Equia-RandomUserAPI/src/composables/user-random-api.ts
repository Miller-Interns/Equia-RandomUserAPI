import type { User } from '@/types/user';
import { Gender } from '@/enums/gender-enum';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '../stores/store';

export function useRandomUsers() {
  const userStore = useUserStore();
  const usersPerPage = 10;
  const currentPage = ref(1);
  const genderFilter = ref<Gender>(Gender.ALL);
  const selectedUser = ref<User | null>(null);
  const showModal = ref(false);

  //fetch users
  async function fetchUsers(page: number, results: number = 500) {
    if (userStore.localUsers.length > 0) return;

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        results: results.toString(),
      });

      const response = await fetch(`https://randomuser.me/api/?${params}`);
      const data = await response.json();

      userStore.saveUsersToStorage(data.results);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  // Filtering
  const filteredUsers = computed(() => {
    if (genderFilter.value === Gender.ALL) {
      return userStore.localUsers;
    }
    return userStore.localUsers.filter(
      (user) => user.gender === genderFilter.value
    );
  });

  // Pagination
  const paginatedUsers = computed(() => {
    const startIndex = (currentPage.value - 1) * usersPerPage;
    return filteredUsers.value.slice(startIndex, startIndex + usersPerPage);
  });

  const maximumPage = computed(() => {
    return Math.ceil(filteredUsers.value.length / usersPerPage);
  });

  // Next/Previous
  function nextPage() {
    if (currentPage.value < maximumPage.value) {
      currentPage.value++;
    }
  }
  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  }

  // Refetch
  function resetUsers() {
    userStore.clearUsersFromStorage();
    currentPage.value = 1;
    fetchUsers(currentPage.value);
  }

  // Modal
  function openModal(user: User) {
    selectedUser.value = user;
    showModal.value = true;
  }
  function closeModal() {
    selectedUser.value = null;
    showModal.value = false;
  }

  // Clear local storage on page unload
  function handleBeforeUnload() {
    userStore.clearUsersFromStorage();
  }

  onMounted(() => {
    userStore.loadUsersFromStorage();
    fetchUsers(currentPage.value);
    window.addEventListener('beforeunload', handleBeforeUnload);
  });

  onUnmounted(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  });

  return {
    currentPage,
    genderFilter,
    selectedUser,
    showModal,

    filteredUsers,
    paginatedUsers,
    maximumPage,

    fetchUsers,
    nextPage,
    prevPage,
    resetUsers,
    openModal,
    closeModal,
  };
}
