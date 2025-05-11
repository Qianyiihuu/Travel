<template>
  <v-app>
    <v-app-bar color="background" :elevation="2">
      <v-app-bar-title><h2 class="logo">Chef Sheep</h2></v-app-bar-title>

      <!-- 以下从最后开始排 -->
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn text to="/home">Home</v-btn>
      <v-btn text to="/destinaitons">Destinations</v-btn>
      <v-btn text to="/about">About</v-btn>
      <!-- <v-btn v-if="userStore.username">{{ userStore.username }}</v-btn> -->
      <v-menu v-if="userStore.username" offset-y>
        <template #activator="{ props }">
          <v-btn v-bind="props">
            {{ userStore.username }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title> Logout </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-else text @click="dialog = true">Login</v-btn>
      <!-- <v-btn text to="/Home">Login</v-appbtn text :to="/Home" -->
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-spacer></v-spacer>

    <v-footer color="background">
      <v-container class="text-center white--text">
        &copy; {{ new Date().getFullYear() }} 旅游探索 | 让旅行更精彩
      </v-container>
    </v-footer>

    <v-dialog v-model="dialog" width="500">
      <Login @close="dialog = false"></Login>
    </v-dialog>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Login from "../views/Login.vue";
import { useUserStore } from "../store/userStore";
import router from "../router";

const userStore = useUserStore();
const dialog = ref(false);

const logout = () => {
  userStore.logout();
  router.push("/");
};
</script>

<style>
.logo {
  color: #ff4040;
  text-align: left;
  margin-left: 10%;
}
</style>
