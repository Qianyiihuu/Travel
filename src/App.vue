<template>
  <v-app>
    <v-app-bar color="primary" app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>KLOOK</v-toolbar-title>
    <v-spacer></v-spacer>

      <v-text-field
        v-model="searchQuery"  
        :loading="loading"     
        density="compact"
        prepend-inner-icon="mdi-magnify"  
        label="Search destinations"         
        hide-details      
        single-line  
        variant="solo" 
        class="search-bar"
        @click:append-inner="onClick"  >
      ></v-text-field>



    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/destinations">Destinations</v-btn>
    <v-btn text to="/explore">Explore KLOOK</v-btn>
    <v-btn text to="/about">About</v-btn>

    <v-btn v-if="!userStore.username" text @click="dialog = true">Login</v-btn>
      <v-menu v-else>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" text>{{ userStore.username }}</v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">Logout</v-list-item>
        </v-list>
      </v-menu>
  </v-app-bar>

  <!-- 侧边导航栏 -->
  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item title="Home" to="/"></v-list-item>
      <v-list-item title="Destinations" to="/destinations"></v-list-item>
      <v-list-item title="About" to="/about"></v-list-item>

 <!-- 占位符，Push Login/Logout 到底部 -->
 <v-spacer></v-spacer>

<!-- 未登录时显示 Login -->
<v-list-item v-if="!userStore.username" text @click="dialog = true">
  <v-icon left>mdi-login</v-icon> Login
</v-list-item>

<!-- 已登录时显示 Logout -->
<v-list-item v-else text @click="logout">
  <v-icon left>mdi-logout</v-icon> Logout
</v-list-item>
</v-list>

  </v-navigation-drawer>

   <!-- 页面主体 -->
   <v-main >
    <router-view></router-view>
  </v-main>

  <!-- 登录弹窗 -->
  <v-dialog v-model="dialog" max-width="400">
      <Login @close="dialog = false" />
    </v-dialog>

  <!-- 页脚 -->
  <v-footer color="primary" app>
    <v-container class="text-center white--text">
      &copy; {{ new Date().getFullYear() }} 旅游探索 | 让旅行更精彩
    </v-container>
  </v-footer>
  </v-app>
</template>


<script setup lang="ts">
import {ref} from "vue"
import Login from "./components/Login.vue"; 
import { useUserStore } from "./store/userStore";
const drawer = ref(false)
const searchQuery = ref('')   // 搜索框的输入内容
const loading = ref(false)    // 加载状态
const dialog = ref(false); // 控制登录弹窗显示
const userStore=useUserStore();


// 处理点击搜索图标时的逻辑
function onClick () {
  loading.value = true   // 启动加载状态
  setTimeout(() => {
    loading.value = false  // 停止加载状态
    alert(`Searching for: ${searchQuery.value}`)  // 显示搜索的内容
  }, 2000)  // 模拟加载时间
}

function logout() {
  userStore.logout();
}



</script>

<style scoped>
.search-bar {
  max-width: 300px; 

}
.v-input__append-inner .v-icon {
  display: none;
}

.v-application {
  width: 100vw;
  overflow-x: hidden; /* 禁止水平滚动 */
}


</style>