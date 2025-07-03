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
      <v-btn text to="/destinations">Destinations</v-btn>
      <v-btn text to="/about">About</v-btn>

      <div class="cart-wrapper">
        <v-menu
          v-model="dropdownVisible"
          offset-y
          bottom
          right
          :close-on-content-click="false"
        >
          <template #activator="{ props }">
            <v-btn icon v-bind="props">
              <v-badge :content="totalQuantity" color="red" overlap>
                <v-icon>mdi-cart</v-icon>
              </v-badge>
            </v-btn>
          </template>

          <v-list style="width: 350px; max-height: 300px; overflow-y: auto">
            <v-list-item v-if="cartStore.cartItems.length === 0">
              <v-list-item-title>购物车为空</v-list-item-title>
            </v-list-item>

            <v-list-item v-for="item in cartStore.cartItems" :key="item.id">
              <v-list-item-content>
                <v-list-item-title
                  >{{ item.title }} × {{ item.quantity }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

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
import { computed, ref, watch } from "vue";
import Login from "../views/Login.vue";
import { useUserStore } from "../store/userStore";
import router from "../router";
import { onMounted } from "vue";
import { useCarStore } from "../store/cart";

const userStore = useUserStore();
const dialog = ref(false);
const cartStore = useCarStore();

userStore.loadFromStorage();
const logout = () => {
  userStore.logout();
  router.push("/");
};

const dropdownVisible = ref(false);
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const totalQuantity = computed(() =>
  cartStore.cartItems.reduce((sum, item) => sum + item.quantity, 0)
);
onMounted(() => {
  cartStore.loadCart();
});

watch(
  () => cartStore.cartItems,
  (newItems) => {
    localStorage.setItem("cart", JSON.stringify(newItems));
  },
  {
    deep: true,
  }
);
</script>

<style>
.cart-wrapper {
  position: relative;
  display: inline-block;
  overflow: visible;
}

.dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  width: 250px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 10px;
  animation: dropdownFadeIn 0.2s ease-in-out;
}

.dropdown-item {
  padding: 6px 10px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #eee;
}

.dropdown-item:last-child {
  border-bottom: none;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.logo {
  color: #ff4040;
  text-align: left;
  margin-left: 10%;
}
</style>
