import { defineStore } from "pinia";

export const useCarStore = defineStore("cart", {
  state: () => ({
    cartItems: [] as {
      id: number;
      title: string;
      price: number;
      quantity: number;
    }[],
  }),
  actions: {
    addToCart(product: { id: number; title: string; price: number }) {
      const existing = this.cartItems.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
    },
    clearCart() {
      this.cartItems = [];
    },
    loadCart() {
      const saved = localStorage.getItem("cart");
      if (saved) {
        try {
          this.cartItems = JSON.parse(saved);
        } catch (e) {
          console.error("购物车数据解析失败:", e);
        }
      }
    },
  },
});
