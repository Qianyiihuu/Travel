<template>
  <v-card class="pa-5 login-card">
    <v-card-title class="login-text">
      Register
      <v-btn class="cha-btn" icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-form v-model="isFormValid">
        <v-text-field
          v-model="username"
          label="Username"
          outlined
          dense
          :rules="[(v) => !!v || 'Username is required']"
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="Email"
          outlined
          dense
          :rules="[
            (v) => !!v || 'Email is required',
            (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ]"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          outlined
          dense
          :rules="[(v) => !!v || 'Password is required']"
        ></v-text-field>

        <v-btn
          block
          color="primary"
          :disabled="!isFormValid"
          @click="submitForm"
        >
          Submit
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["close"]);

const username = ref("");
const email = ref("");
const password = ref("");
const isFormValid = ref(false);

const submitForm = () => {
  if (isFormValid.value) {
    console.log("Registering:", {
      username: username.value,
      email: email.value,
      password: password.value,
    });
    // 此处可以发起 API 请求
    alert("Registration successful!");
    emit("close");
  }
};
</script>

<style scoped>
.login-card {
  width: 400px;
}

.login-text {
  margin: 20px 18px;
  position: relative;
}

.cha-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 24px;
  height: 24px;
  min-width: 24px;
}

.cha-btn .v-icon {
  font-size: 24px;
}
</style>
