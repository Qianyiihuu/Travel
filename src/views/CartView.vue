<template>
  <h2 class="title">购物车</h2>

  <v-card
    v-for="item in useCart.cartItems"
    :key="item.id"
    class="cart-card"
    elevation="2"
  >
    <v-card-title class="card-title-row">
      <v-checkbox
        v-model="item.selected"
        class="mr-2"
        hide-details
        density="compact"
        color="primary"
      />
      <span class="cart-title">{{ item.title }}</span></v-card-title
    >
    <v-card-subtitle>
      <v-icon class="countBtn" @click="countMinus(item)">mdi-minus</v-icon>
      数量：{{ item.quantity }}
      <v-icon class="countBtn" @click="countPlus(item)">mdi-plus</v-icon>
    </v-card-subtitle>
    <v-card-text class="text-caption text-right">
      单价：¥{{ item.price }}，小计：¥{{ item.price * item.quantity }}
    </v-card-text>
  </v-card>

  <v-card class="CartBar">
    <div class="CartPrice">购物车总价：{{ totalPrice }}</div>
    <div class="BtnDiv">
      <v-btn class="cartBtn" @click="handleGoToPaymentFromCart">前往结算</v-btn>
    </div>
  </v-card>
</template>

<script setup>
import { useUserStore } from "../store/userStore";
import { useCarStore } from "../store/cart";
import { computed, onMounted } from "vue";
import productData from "../mock/productdetail.json";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const userStore = useUserStore();
const useCart = useCarStore();

useCart.cartItems.forEach((item) => {
  if (item.selected === undefined) {
    item.selected = true; // 默认选中
  }
});

const totalPrice = computed(() =>
  useCart.cartItems
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
);

function updateCart(index) {
  if (cartItems[index].quantity < 1) {
    cartItems[index].quantity = 1;
  }
}

function removeCart(index) {
  cartItems.splice(index, 1);
}

function countPlus(item) {
  const matched = productData.data.find((p) => p.id === item.id);

  if (!matched) {
    console.warn("未找到对应商品库存数据");
    return;
  }

  const maxStock = Number(matched.quantity); // JSON中是字符串也转成数字

  if (item.quantity < maxStock) {
    item.quantity++;
  } else {
    alert("库存不足");
  }
}

function countMinus(item) {
  if (item.quantity > 1) {
    item.quantity--;
  }
}

function handleGoToPaymentFromCart() {
  router.push({
    path: "/payment",
    query: {
      from: "cart", // ✅ 标识来源是购物车
      sourcePage: route.fullPath, // ✅ 记录来源路径，便于返回
    },
  });
}
</script>

<style scoped>
.title {
  text-align: left;
  margin-left: 40px;
}
.countBtn {
  background-color: rgb(214, 214, 214);
  border-radius: 2px;
  margin: 2px;
}
.cart-title {
  font-size: 18px;
  font-weight: 800;
  padding: 4px;
}
.card-title-row {
  display: flex;
  align-items: center;
}
.cart-card {
  text-align: left;
  border-radius: 16px;
  width: 80%;
  margin: 20px;
  height: auto;
  padding: 10px;
}

.CartBar {
  display: flex;
  width: 80%;
  margin: 20px;
  border-radius: 10px;
  padding: 20px;
}
</style>
