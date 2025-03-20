<template>
    <v-card class="pa-5">
      <v-card-title class="text-center">User Login</v-card-title>
      <v-card-text>
        <v-text-field v-model="username" label="Username" outlined dense></v-text-field>
        <v-btn block color="primary" @click="handleLogin">Login</v-btn>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits } from "vue";
  
  const username = ref("");
  const emit = defineEmits(["close"]); // 定义事件
  
  const handleLogin = () => {
    if (username.value.trim()) {
      alert(`Welcome, ${username.value}!`);
      emit("close"); // 关闭弹窗
    } else {
      alert("Please enter a username.");
    }
  };
  </script>
  