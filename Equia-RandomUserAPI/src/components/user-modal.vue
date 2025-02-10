<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { User } from '../types/user';

  const { show, user } = defineProps<{
    show: boolean;
    user: User | null;
  }>();

  const emits = defineEmits(['close']);

  function emitClose() {
    emits('close');
  }
</script>

<template>
  <div v-if="show" class="modal-overlay" @click.self="emitClose">
    <div class="modal-content">
      <button class="close-btn" @click="emitClose">×</button>
      <h3>User Details</h3>

      <div v-if="!user">
        <p>No user selected.</p>
      </div>

      <div v-else>
        <img :src="user.picture.large" alt="User Picture" class="user-image" />
        <p><strong>Name:</strong> {{ user.name.first }} {{ user.name.last }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Phone:</strong> {{ user.phone }}</p>
        <p><strong>Gender:</strong> {{ user.gender }}</p>
        <p>
          <strong>Location:</strong> {{ user.location.city }},
          {{ user.location.country }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-in-out forwards;
  }

  .modal-content {
    position: relative;
    background: #fff;
    padding: 2rem;
    width: 90%;
    max-width: 400px;
    border-radius: 12px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.4s ease forwards;
  }

  .user-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 1rem;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1.2rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    color: #aaa;
    transition: color 0.2s ease;
  }

  .close-btn:hover {
    color: #555;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    0% {
      transform: translateY(50px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
