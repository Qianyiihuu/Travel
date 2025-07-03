<template>
  <div v-if="destination" class="destination-card">
    <h2 class="destination-title">景点详情 > {{ destination.name }}</h2>
    <div class="destination-tag-position">
      <div
        v-for="(tag, index) in destination.tag"
        :key="index"
        class="destination-tag"
      >
        {{ tag }}
      </div>
    </div>
    <div class="destination-tag-position">
      <div class="score">4.6/5</div>
      <div class="comments">2.7k条评价 · 30k+人参与过</div>
      <div class="maps">
        <v-icon small class="mr-1">mdi-map-marker</v-icon>怀柔区
      </div>
    </div>
    <div class="destination-tag-position">
      <img
        class="destination-image"
        :src="getImageUrl(destination.img)"
        alt=""
      />
    </div>
    <div class="row-between">
      <p class="destination-content-position">{{ destination.description }}</p>
      <div class="product">
        <div class="product-title">景点门票：200元起</div>
        <button class="productBtn">选择产品</button>
      </div>
    </div>

    <div class="product-item">
      <div class="block-item"></div>
      <h3>套餐选项</h3>
    </div>
    <div class="chooseProduct">
      <div
        v-for="(project, index) in filteredProducts"
        :key="project.name"
        @click="selectProduct(index, project)"
        :class="['product-item', { active: expandedIndex === index }]"
      >
        <div class="item-formal">{{ project.content }}</div>
      </div>

      <div v-if="selectedProduct" class="product-detail">
        <p>价格：￥{{ selectedProduct.price }}</p>
        <label class="quantity-item">
          数量：
          <input type="number" min="1" v-model.number="quantity" />
        </label>
        <h3>总价：{{ totalPrice }}</h3>
        <button class="purchase" @click="addToCart">加入购物车</button>
        <button class="purchase">购买</button>
      </div>
    </div>

    <div class="product-item">
      <div class="block-item"></div>
      <h3>你还喜欢...</h3>
    </div>
    <otherDest />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import destinationsData from "../mock/destinationdetail.json";
import productData from "../mock/productdetail.json";
import otherDest from "../components/otherDest.vue";
import { useCarStore } from "../store/cart";

// 获取当前路由对象
const route = useRoute();
const useCart = useCarStore();
const destination = ref();
const desId = Number(route.params.id);
const expandedIndex = ref<number | null>(null);
const selectedProduct = ref<any | null>(null);
const quantity = ref<number>(1);
// 获取路由参数中的 id
const id = Number(route.params.id);

const filteredProducts = ref();
onMounted(() => {
  destination.value = destinationsData.data.find((d: any) => d.id === id);
  filteredProducts.value = productData.data.filter(
    (p: any) => p.scenicId === desId
  );
});

const selectProduct = (index: number, product: any) => {
  expandedIndex.value = index;
  selectedProduct.value = product;
};

const totalPrice = computed(() => {
  if (selectedProduct.value.quantity === 0) {
    return "产品已售罄";
  } else {
    return (selectedProduct.value?.price || 0) * quantity.value;
  }
});

const getImageUrl = (imgName: string) => {
  return new URL(`../assets/${imgName}`, import.meta.url).href;
};

function addToCart() {
  try {
    const product = selectedProduct.value;

    if (!product) {
      alert("未选择商品");
      return;
    }

    if (product.quantity === 0) {
      alert("商品数量为 0，无法添加到购物车");
      return;
    }

    useCart.addToCart({
      id: product.id,
      title: product.content, // 注意字段是否是 content，还是 title？
      price: product.price,
    });

    console.log("添加成功");
  } catch (error) {
    console.error("添加失败", error);
  }
}
</script>

<style>
.destination-card {
  text-align: left;
  margin-left: 32px;
}
.destination-title {
  margin: 24px 0px 10px 20px;
}

.destination-image {
  border-radius: 16px;
  margin-top: 16px;
  width: 98%;
}
.destination-tag-position {
  margin-left: 15px;
  margin-bottom: 10px;
}
.destination-tag {
  display: inline-block;
  padding: 4px 10px;
  background-color: #ffffff;
  color: #000;
  font-size: 14px;
  border-radius: 6px;
  margin-left: 5px;
}
.score {
  display: inline-block;
  padding: 4px 10px;
  background-color: rgb(153, 200, 227);
  color: #000;
  font-size: 14px;
  border-radius: 6px;
  margin-left: 5px;
}
.comments {
  display: inline-block;
  color: #434343;
  margin-left: 8px;
  font-size: 14px;
}
.maps {
  display: inline-block;
  color: #434343;
  margin-left: 8px;
  font-size: 14px;
}
.row-between {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.destination-content-position {
  margin: 10px 20px;
  display: inline-block;
  background-color: rgb(153, 200, 227, 0.3);
  padding: 20px 10px;
  width: 70%;
  border-radius: 8px;
}

.product {
  margin: 10px 20px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 4px 10px;
  width: 250px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #000;
  position: sticky;
  top: 64px;
  z-index: 10;
}

.product-title {
  width: auto;
  padding: 8px 10px;
  font-size: 18px;
  font-weight: 800;
}

.productBtn {
  font-size: 14px;
  font-weight: 800;
  background-color: rgb(153, 200, 227, 0.3);
}
.test {
  height: 1000px;
}

.product-item {
  display: flex;
  align-items: center; /* 垂直居中（可选） */
  gap: 10px; /* 两个元素之间的间距 */
  margin-left: 20px;
}
.block-item {
  width: 10px;
  height: 25px;
  border-radius: 20px;
  background-color: rgb(153, 200, 227);
}
.chooseProduct {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  list-style: none;
  width: 70%;
  height: auto;
  margin-left: 20px;
  background-color: #cacaca60;
  border-radius: 8px;
  padding: 20px 10px;
}

.item-formal {
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  width: auto;
}
.product-detail {
  margin-left: 20px;
  width: 100%;
}

.quantity-item {
  border-radius: 8px;
}

.purchase {
  margin-left: auto;
  margin-right: 10px;
  height: 50px;
  width: auto;
  min-width: 100px;
  padding: 10px 16px;
  background-color: rgb(153, 200, 227);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
