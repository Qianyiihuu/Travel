import { defineStore } from "pinia";
import { useUserStore } from "./userStore";

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
      this.saveCart();
    },
    clearCart() {
      this.cartItems = [];
      this.saveCart();
    },
    saveCart() {
      const userStore = useUserStore();
      if (userStore.isLoggedIn) {
        const key = `cart-${userStore.username}`;
        localStorage.setItem(key, JSON.stringify(this.cartItems));
      }
    },
    loadCart() {
      const userStore = useUserStore();
      if (userStore.isLoggedIn) {
        const key = `cart-${userStore.username}`;
        const saved = localStorage.getItem(key);
        if (saved) {
          try {
            this.cartItems = JSON.parse(saved);
          } catch (e) {
            console.error("购物车解析失败", e);
          }
        } else {
          this.cartItems = [];
        }
      } else {
        this.cartItems = [];
      }
    },
  },
});
