<template>
    <v-card class="pa-5">
      <v-card-title class="text-center">User Login</v-card-title>
      <v-card-text>
        <v-text-field v-model="username" label="Username" outlined dense></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" outlined></v-text-field>
        <v-btn block color="primary" @click="handleLogin">Login</v-btn>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { ref ,defineEmits } from "vue";
  import { useUserStore } from "../store/userStore";
  import { useRouter } from "vue-router";
  const username = ref("");
  const password = ref('');
  const userStore=useUserStore();
  const router=useRouter();
  const emit = defineEmits(['close']) // 定义 `close` 事件
  
  const handleLogin = () => {
    if (username.value&&password.value) {
      userStore.login(username.value)
      router.push('/')
      emit('close')
    } else {
      alert("Please enter a username.");
    }
  };
  </script>
  