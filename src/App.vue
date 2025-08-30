<template>
  <standard />

  <button class="float-chat-btn" @click="showChat = true">💬</button>
  <AichatWindow v-if="showChat" @close="showChat = false" />
</template>

<script setup lang="ts">
import standard from "./components/standard.vue";
import { ref } from "vue";
import AichatWindow from "./views/AichatWindow.vue";
const showChat = ref(false);
</script>

<style>
.float-chat-btn {
  position: fixed;
  right: 30px;
  bottom: 80px;
  z-index: 9999;
  background: #e9f6f0;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  font-size: 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
</style>
