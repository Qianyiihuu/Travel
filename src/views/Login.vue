<template>
  <v-card class="pa-5 login-card">
    <v-card-title class="login-text"
      >Log in or Sign up
      <v-btn class="cha-btn" icon @click="$emit('close')"
        ><v-icon>mdi-close</v-icon></v-btn
      >
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="username"
        label="Username"
        outlined
        dense
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        outlined
      ></v-text-field>
      <v-btn block color="secondary" @click="handleLogin">Log in</v-btn>
      <v-btn block color="surface" @click="regisDialog = true" class="sign-btn"
        >Sign up</v-btn
      >
    </v-card-text>
  </v-card>

  <v-dialog v-model="regisDialog" width="500">
    <RegisterForm @close="regisDialog = false" />
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../store/userStore";
import { useRouter } from "vue-router";
import RegisterForm from "./Register.vue";

const username = ref("");
const password = ref("");
const userStore = useUserStore();
const router = useRouter();

const emit = defineEmits(["close"]); // 定义 `close` 事件
const regisDialog = ref(false);

const handleLogin = () => {
  if (username.value && password.value) {
    userStore.login(username.value);
    router.push("/");
    emit("close");
  } else {
    alert("Please enter a username.");
  }
};
</script>

<style scoped>
.login-card {
  width: 400px;
  height: 500px; /* 你可以改为 60vh 等响应式单位 */
}

.login-text {
  margin: 20px 18px;
}
.sign-btn {
  margin: 10px 0;
}
.cha-btn {
  position: absolute;
  right: 10px;
  width: 24px;
  height: 24px;
  min-width: 24px; /* 防止 Vuetify 设置的最小宽度覆盖 */
}

.cha-btn .v-icon {
  font-size: 24px;
}
</style>
