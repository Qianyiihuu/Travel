<template>
  <v-card class="pa-6 process-info">
    <v-row justify="center" align="center">
      <v-col cols="4" class="text-center">
        <div class="step-circle">1</div>
        <div class="step-label">Choose booking</div>
      </v-col>
      <v-col cols="4" class="text-center">
        <div class="step-circle">2</div>
        <div class="step-label">Enter Info</div>
      </v-col>
      <v-col cols="4" class="text-center">
        <div class="step-circle2">3</div>
        <div class="step-label">Pay</div>
      </v-col>
    </v-row>
  </v-card>

  <div class="detailProduct">
    <v-row>
      <v-col cols="8">
        <v-card class="payInfo">
          <div class="product-item">
            <div ref="targetSection" class="block-item"></div>
            <h3>输入信息</h3>
          </div>
          <div>
            <!-- <v-card>
              <div v-for="item in checkoutItems" :key="item.id">
                {{ item.title }} - {{ item.quantity }} x {{ item.price }}
              </div>
              <v-btn>立即支付</v-btn>
            </v-card> -->
            <v-card
              v-for="item in checkoutItems"
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
                <v-icon class="countBtn" @click="countMinus(item)"
                  >mdi-minus</v-icon
                >
                数量：{{ item.quantity }}
                <v-icon class="countBtn" @click="countPlus(item)"
                  >mdi-plus</v-icon
                >
              </v-card-subtitle>
              <v-card-text class="text-caption text-right">
                单价：¥{{ item.price }}，小计：¥{{ item.price * item.quantity }}
              </v-card-text>
            </v-card>

            <v-card
              v-for="item in checkoutItems"
              :key="item.id"
              class="cart-card"
              elevation="2"
            >
              <v-card-title class="basic-title">基本信息</v-card-title>
              <v-card-subtitle class="basic-information"
                >姓名
                <input type="text" />
              </v-card-subtitle>
              <v-card-subtitle class="basic-information"
                >证件类型
                <input type="text" />
              </v-card-subtitle>
              <v-card-subtitle class="basic-information"
                >证件号码
                <input type="text" />
              </v-card-subtitle>
              <v-card-subtitle class="basic-information"
                >联系电话
                <input type="text" />
              </v-card-subtitle>
              <v-card-subtitle class="basic-information"
                >电子邮箱
                <input type="text" />
              </v-card-subtitle>
            </v-card>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="otherInfo"></v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
import { useCarStore } from "../store/cart";
import { onMounted, ref } from "vue";
import productData from "../mock/productdetail.json";

// ✅ 从路由 props 接收参数
const props = defineProps<{
  from: string;
  productId: string | null;
  quantity: number;
  sourcePage: string | null;
}>();

const cartStore = useCarStore();
const checkoutItems = ref<any[]>([]);

console.log("来源页面是：", props.sourcePage);

onMounted(() => {
  if (props.from === "cart") {
    checkoutItems.value = cartStore.cartItems;
  } else if (props.from === "direct" && props.productId) {
    const product = productData.data.find(
      (p) => p.id === Number(props.productId)
    );
    if (product) {
      checkoutItems.value = [{ ...product, quantity: props.quantity }];
    } else {
      console.error("商品未找到");
    }
  }
});
function countPlus(item: any) {
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
function countMinus(item: any) {
  if (item.quantity > 1) {
    item.quantity--;
  }
}
</script>

<style scoped>
.basic-title {
  font-size: 18px;
  font-weight: 800;
}
.basic-information {
  font-size: 14px;
  font-weight: 600;
  padding-top: 5px;
}
.process-info {
  padding: 12px;
}
.step-circle {
  width: 25px;
  height: 25px;
  margin: 0 auto 8px;
  border-radius: 50%;
  background-color: #8ad4f4; /* 蓝色圆圈 */
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}
.step-circle2 {
  width: 25px;
  height: 25px;
  margin: 0 auto 8px;
  border-radius: 50%;
  background-color: #cee1e9; /* 蓝色圆圈 */
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

.step-label {
  font-size: 16px;
  font-weight: 500;
}
.detailProduct {
  margin-top: 10px;
}
.payInfo {
  height: auto;
  margin-left: 20px;
  width: 95%;
  margin-top: 20px;
  border-radius: 16px;
}
.otherInfo {
  height: 100px;
  margin-right: 20px;
  margin-top: 20px;
  border-radius: 16px;
}

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
