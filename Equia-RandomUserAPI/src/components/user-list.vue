<script setup lang="ts">
  import UserDetailModal from '../components/user-modal.vue';
  import { useRandomUsers } from '../composables/user-random-api';
  import { Gender } from '@/enums/gender-enum';

  const {
    currentPage,
    genderFilter,
    showModal,
    selectedUser,

    paginatedUsers,
    maximumPage,

    nextPage,
    prevPage,
    resetUsers,
    openModal,
    closeModal,
  } = useRandomUsers();
</script>

<template>
  <div class="page-wrapper">
    <div class="container">
      <h2 class="title">User List</h2>
      <div class="refresh-btn">
        <button @click="resetUsers">Refresh Users</button>
      </div>

      <div class="control-bar">
        <div class="filter-buttons">
          <button
            @click="genderFilter = Gender.ALL"
            :class="{ active: genderFilter === Gender.ALL }"
          >
            All
          </button>
          <button
            @click="genderFilter = Gender.MALE"
            :class="{ active: genderFilter === Gender.MALE }"
          >
            Male
          </button>
          <button
            @click="genderFilter = Gender.FEMALE"
            :class="{ active: genderFilter === Gender.FEMALE }"
          >
            Female
          </button>
        </div>

        <!-- Pagination Controls  -->
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">
            Previous
          </button>
          <button @click="nextPage" :disabled="currentPage >= maximumPage">
            Next
          </button>
          <span>Page {{ currentPage }} of {{ maximumPage }}</span>
        </div>
      </div>

      <!-- User List -->
      <ul class="user-list">
        <li v-for="user in paginatedUsers" :key="user.email" class="user-card">
          <img
            :src="user.picture.thumbnail"
            alt="User Picture"
            class="user-img"
          />
          <div class="user-info">
            <p class="user-name">
              {{ user.name.first }} {{ user.name.last }}
              <span class="gender">({{ user.gender }})</span>
            </p>
            <button @click="openModal(user)" class="view-btn">View</button>
          </div>
        </li>
      </ul>

      <!-- Modal -->
      <UserDetailModal
        :show="showModal"
        :user="selectedUser"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<style scoped>
  :root,
  body,
  html {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Inter', sans-serif;
  }

  .page-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    width: 90vw;
    max-width: 1920px;
    min-height: 80vh;
    background-color: #fff;
    color: #000;
    border-radius: 12px;
    padding: 2rem 1.5rem;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }

  .title {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  button {
    cursor: pointer;
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 6px;
    background-color: #5a67d8;
    color: #fff;
    transition: background-color 0.2s ease-in-out;
    margin-right: 0.5rem;
  }

  button:hover {
    background-color: #4c51bf;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .control-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .filter-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .filter-buttons .active {
    background-color: #333 !important;
  }

  .pagination {
    display: flex;
    align-items: center;
  }

  .pagination span {
    margin-left: 0.5rem;
  }

  .refresh-btn {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .user-list {
    list-style: none;
    padding: 0;
    margin: 0;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .user-card {
    background-color: #f6f6f6;
    border-radius: 6px;
    padding: 0.75rem 1rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    text-align: center;
  }

  .user-img {
    border-radius: 50%;
    margin-bottom: 0.5rem;
  }

  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-name {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    color: #222;
  }

  .gender {
    font-size: 0.9rem;
    color: #666;
  }

  .view-btn {
    background-color: #38b2ac;
  }

  .view-btn:hover {
    background-color: #319795;
  }
</style>
